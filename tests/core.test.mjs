import test from "node:test";
import assert from "node:assert/strict";
import {
  emptyProgress,
  setTaskChecked,
  canCheckIn,
  checkIn,
  cancelCheckIn,
  score,
  completedCount,
  streak,
  validateCourses
} from "../core.mjs";
import { COURSES } from "../courses.mjs";
import { loadProgress, saveProgress, currentCourse, sourceAction, youtubeEmbed, renderToday, renderCourseList } from "../app.mjs";

const course = {
  id: "day-001",
  date: "2026-09-30",
  dayNumber: 1,
  title: "Lesson",
  source: "Course",
  url: "https://example.com/lesson",
  tasks: ["one", "two", "three"]
};

test("all tasks are required before check-in", () => {
  let progress = emptyProgress();
  progress = setTaskChecked(progress, course, 0, true);
  progress = setTaskChecked(progress, course, 1, true);
  assert.equal(canCheckIn(progress, course), false);
  progress = setTaskChecked(progress, course, 2, true);
  assert.equal(canCheckIn(progress, course), true);
});

test("task checks are immutable and task indexes must be valid", () => {
  const progress = emptyProgress();
  const next = setTaskChecked(progress, course, 1, true);
  assert.deepEqual(progress, emptyProgress());
  assert.deepEqual(next.taskChecks[course.id], [false, true, false]);
  assert.throws(() => setTaskChecked(next, course, -1, true), RangeError);
  assert.throws(() => setTaskChecked(next, course, 3, true), RangeError);
});

test("check-in awards five points once and cancellation removes them", () => {
  let progress = emptyProgress();
  course.tasks.forEach((_, index) => {
    progress = setTaskChecked(progress, course, index, true);
  });
  progress = checkIn(progress, course, "2026-09-29T12:00:00.000Z");
  assert.equal(score(progress), 5);
  assert.equal(completedCount(progress), 1);
  const repeated = checkIn(progress, course, "2026-09-29T12:01:00.000Z");
  assert.equal(repeated, progress);
  progress = cancelCheckIn(progress, course);
  assert.equal(score(progress), 0);
  assert.deepEqual(progress.taskChecks[course.id], [true, true, true]);
});

test("check-in requires all tasks", () => {
  assert.throws(() => checkIn(emptyProgress(), course, "now"), /Complete every task/);
});

test("future lessons can be checked in", () => {
  let progress = emptyProgress();
  course.tasks.forEach((_, index) => {
    progress = setTaskChecked(progress, course, index, true);
  });
  progress = checkIn(progress, course, "2026-09-01T00:00:00.000Z");
  assert.equal(score(progress), 5);
});

test("streak skips Sundays and stops at a missed scheduled day", () => {
  const courses = [
    { id: "fri", date: "2026-10-02" },
    { id: "sat", date: "2026-10-03" },
    { id: "mon", date: "2026-10-05" }
  ];
  const progress = {
    version: 1,
    taskChecks: {},
    checkIns: { fri: "x", sat: "x", mon: "x" }
  };
  assert.equal(streak(courses, progress, "2026-10-05"), 3);
  assert.equal(streak(courses, { ...progress, checkIns: { fri: "x", mon: "x" } }, "2026-10-05"), 1);
  assert.equal(streak(courses, progress, "2026-10-04"), 2);
});

test("the production catalog validates", () => {
  assert.deepEqual(validateCourses(COURSES), []);
});

test("course validation reports count, order, dates, required fields and tasks", () => {
  const invalid = [
    { ...course, dayNumber: 2, date: "2026-10-04", title: "", tasks: ["one"] },
    { ...course, id: "day-002", dayNumber: 1, date: "2026-10-04", source: "", url: "" }
  ];
  assert.deepEqual(validateCourses(invalid), [
    "Course count must be 99",
    "day-001: invalid dayNumber",
    "day-001: Sunday is not allowed",
    "day-001: missing display data",
    "day-001: invalid tasks",
    "day-002: invalid dayNumber",
    "day-002: duplicate date",
    "day-002: Sunday is not allowed",
    "day-002: missing display data"
  ]);
});

test("progress round-trips through the storage boundary", () => {
  const values = new Map();
  const storage = {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value)
  };
  const progress = { version: 1, taskChecks: { "day-001": [true] }, checkIns: {} };
  saveProgress(storage, progress);
  assert.deepEqual(loadProgress(storage), progress);
});

test("invalid saved JSON falls back to empty progress", () => {
  const storage = { getItem: () => "not-json" };
  assert.deepEqual(loadProgress(storage), emptyProgress());
});

test("malformed saved progress cannot break rendering", () => {
  const storage = { getItem: () => JSON.stringify({ version: 1, taskChecks: "bad", checkIns: [] }) };
  assert.deepEqual(loadProgress(storage), emptyProgress());
  const nested = { getItem: () => JSON.stringify({ version: 1, taskChecks: { "day-001": "true" }, checkIns: {} }) };
  assert.deepEqual(loadProgress(nested), emptyProgress());
});

test("short saved checks stay incomplete when a later task is checked", () => {
  const course = COURSES[0];
  const saved = { version: 1, taskChecks: { [course.id]: [true] }, checkIns: {} };
  const storage = { getItem: () => JSON.stringify(saved) };
  const progress = setTaskChecked(loadProgress(storage), course, 3, true);
  assert.deepEqual(progress.taskChecks[course.id], [true, false, false, true]);
  assert.equal(canCheckIn(progress, course), false);
  assert.throws(() => checkIn(progress, course), /Complete every task/);
  assert.equal(score(progress), 0);
});

test("sparse task arrays cannot satisfy check-in", () => {
  const checks = [true, , , true];
  const progress = { version: 1, taskChecks: { "day-001": checks }, checkIns: {} };
  assert.equal(canCheckIn(progress, COURSES[0]), false);
});

test("course selection uses the next scheduled lesson on Sundays and clamps the range", () => {
  assert.equal(currentCourse("2026-09-01").dayNumber, 1);
  assert.equal(currentCourse("2026-10-04").dayNumber, 5);
  assert.equal(currentCourse("2027-02-01").dayNumber, 99);
});

test("resource actions keep external links and load the privacy-enhanced player on demand", () => {
  const video = COURSES.find(item => item.kind === "youtube");
  assert.match(sourceAction(video), /data-video-id=/);
  assert.match(sourceAction(video), /target="_blank" rel="noopener noreferrer"/);
  assert.doesNotMatch(sourceAction(video), /iframe/);
  assert.match(youtubeEmbed(video), /youtube-nocookie\.com\/embed\//);
  assert.match(sourceAction(COURSES[1]), /打开 British Council 课程/);
});

test("resource markup rejects unsafe URLs and escapes course titles", () => {
  assert.equal(sourceAction({ ...COURSES[1], url: "javascript:alert(1)" }), "");
  assert.match(youtubeEmbed({ ...COURSES[2], title: '<img src=x onerror="alert(1)">' }), /&lt;img/);
});

test("rerender updates existing course cards without replacing their DOM", () => {
  const field = () => ({ textContent: "", dataset: {}, className: "", value: 0, disabled: false });
  const card = {
    dataset: { courseId: COURSES[0].id },
    classList: { toggle() {} },
    querySelector: () => field(),
    querySelectorAll: () => []
  };
  const host = {
    firstElementChild: card,
    querySelector: () => card,
    set innerHTML(_) { throw new Error("existing course DOM was replaced"); }
  };
  const previous = globalThis.document;
  globalThis.document = { getElementById: id => id.startsWith("course-") ? card : host };
  try {
    renderToday(COURSES[0]);
    renderCourseList();
    assert.equal(host.firstElementChild, card);
  } finally {
    if (previous === undefined) delete globalThis.document;
    else globalThis.document = previous;
  }
});

test("one check-in click cannot also open cancellation", async () => {
  const listeners = new Map();
  let dialogOpens = 0;
  const button = {
    id: "",
    dataset: { action: "check-in", courseId: "" },
    classList: { contains: () => false },
    closest: selector => selector === "button" ? button : null,
    focus() {}
  };
  const field = () => ({ textContent: "", value: 0, classList: { toggle() {} } });
  const card = {
    dataset: { courseId: "" },
    classList: { toggle() {} },
    querySelector: selector => selector === "button[data-action]" ? button : selector === ".status-badge" ? null : field(),
    querySelectorAll: () => []
  };
  const today = {
    querySelector: () => card.dataset.courseId ? card : null,
    set innerHTML(markup) {
      card.dataset.courseId = markup.match(/data-course-id="(day-\d+)"/)[1];
      button.dataset.courseId = card.dataset.courseId;
    }
  };
  const list = { firstElementChild: null, set innerHTML(_) {} };
  const dialog = { returnValue: "", addEventListener() {}, showModal() { dialogOpens += 1; } };
  const saved = {
    version: 1,
    taskChecks: Object.fromEntries(COURSES.map(item => [item.id, item.tasks.map(() => true)])),
    checkIns: {}
  };
  const storage = { getItem: () => JSON.stringify(saved), setItem() {} };
  const oldDocument = globalThis.document;
  const oldWindow = globalThis.window;
  globalThis.document = {
    addEventListener: (name, handler) => listeners.set(name, handler),
    getElementById: id => id === "today-card" ? today : id === "course-list" ? list : id === "confirm-dialog" ? dialog : field()
  };
  globalThis.window = { localStorage: storage };
  try {
    await import("../app.mjs?single-check-in-click");
    listeners.get("click")({ target: button });
    assert.equal(button.dataset.action, "cancel");
    assert.equal(dialogOpens, 0);
  } finally {
    if (oldDocument === undefined) delete globalThis.document;
    else globalThis.document = oldDocument;
    if (oldWindow === undefined) delete globalThis.window;
    else globalThis.window = oldWindow;
  }
});
