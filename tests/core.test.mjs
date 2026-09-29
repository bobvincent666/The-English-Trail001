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
