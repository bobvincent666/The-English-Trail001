# 99天英语探险 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive local HTML course tracker containing 99 dated English-listening lessons, checklist-gated five-point check-ins, persistent local progress, embedded YouTube videos, and British Council outbound links.

**Architecture:** A dependency-free ES module application served over localhost. Static course content lives in one data module; pure validation and progress rules live in one testable core module; the browser module renders the approved travel-journal interface and persists progress through two localStorage functions that can later be replaced by backend calls.

**Tech Stack:** HTML5, CSS, browser JavaScript ES modules, `localStorage`, YouTube iframe embeds, Node.js built-in test runner.

## Global Constraints

- Course range is exactly 2026-09-30 through 2027-01-22.
- Include Monday through Saturday and exclude every Sunday, yielding exactly 99 lessons.
- Public holidays still contain lessons.
- A lesson has 3–5 checklist items; all must be checked before its five-point check-in is enabled.
- Future lessons may be completed early and past lessons may be completed later.
- Score is derived as completed lesson count multiplied by five; maximum score is 495.
- British Council pages open in a new tab and are never authenticated, proxied, copied, or framed.
- YouTube videos use lazy iframe embeds plus an external fallback link.
- The local preview is served over HTTP on localhost, not opened with `file://`.
- Progress is stored locally for the first version; no account, backend, reward redemption, or multi-device sync is included.
- UI uses the approved B1 warm travel-journal direction: warm ivory, terracotta, forest green, and muted gold.
- Use the existing `frontend-design` skill when implementing the interface.
- Do not initialize Git unless the user separately asks; this directory is not currently a Git repository.

---

## File Map

- `index.html` — semantic application shell and empty render targets.
- `styles.css` — approved responsive travel-journal visual system.
- `courses.mjs` — the complete immutable 99-course catalog.
- `core.mjs` — pure course validation, progress transitions, score, and streak calculations.
- `app.mjs` — DOM rendering, filtering, localStorage boundary, dialogs, and lazy YouTube embeds.
- `tests/course-data.test.mjs` — date, count, schema, URL, and curriculum-distribution checks.
- `tests/core.test.mjs` — progress, scoring, early completion, cancellation, persistence, and streak checks.
- `README.md` — one-command local preview and test instructions.

---

### Task 1: Build and validate the 99-day course catalog

**Files:**
- Create: `courses.mjs`
- Create: `tests/course-data.test.mjs`

**Interfaces:**
- Produces: `COURSES: ReadonlyArray<Course>`
- Produces: `Course = { id, date, dayNumber, phase, weekday, level, kind, title, source, durationMinutes, url, videoId?, tasks }`
- Consumed later by: `validateCourses`, all rendering functions, score/streak calculations.

- [ ] **Step 1: Write the failing course-data test**

```js
// tests/course-data.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import { COURSES } from "../courses.mjs";

test("catalog contains the exact 99 scheduled dates", () => {
  assert.equal(COURSES.length, 99);
  assert.equal(COURSES[0].date, "2026-09-30");
  assert.equal(COURSES.at(-1).date, "2027-01-22");
  assert.equal(new Set(COURSES.map(course => course.date)).size, 99);
  assert.ok(COURSES.every(course => new Date(`${course.date}T00:00:00+08:00`).getDay() !== 0));
});

test("every course has complete display and task data", () => {
  for (const [index, course] of COURSES.entries()) {
    assert.equal(course.dayNumber, index + 1);
    assert.match(course.id, /^day-\d{3}$/);
    assert.ok(course.title.length > 0);
    assert.ok(course.source.length > 0);
    assert.ok(Number.isInteger(course.durationMinutes));
    assert.ok(course.durationMinutes >= 25 && course.durationMinutes <= 35);
    assert.ok(course.tasks.length >= 3 && course.tasks.length <= 5);
    assert.ok(course.tasks.every(task => typeof task === "string" && task.length > 0));
    if (course.kind === "youtube") {
      assert.match(course.videoId, /^[A-Za-z0-9_-]{11}$/);
      assert.match(course.url, /^https:\/\/(www\.)?youtube\.com\//);
    }
    if (course.kind === "british-council") {
      assert.match(course.url, /^https:\/\/learnenglish(kids)?\.britishcouncil\.org\//);
    }
  }
});

test("catalog implements the approved spiral curriculum", () => {
  const titles = COURSES.map(course => course.title);
  for (let episode = 1; episode <= 15; episode += 1) {
    assert.ok(titles.some(title => title.startsWith(`Starting Out ${String(episode).padStart(2, "0")}`)));
  }
  assert.ok(COURSES.some(course => course.level === "A2"));
  assert.ok(COURSES.filter(course => course.kind === "youtube").length >= 16);
  assert.ok(COURSES.filter(course => course.kind === "review").length >= 15);
});
```

- [ ] **Step 2: Run the test and verify the missing module failure**

Run: `node --test tests/course-data.test.mjs`

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `courses.mjs`.

- [ ] **Step 3: Create the course schema and the complete catalog**

Use this exact object shape for every entry:

```js
// courses.mjs
export const COURSES = Object.freeze([
  {
    id: "day-001",
    date: "2026-09-30",
    dayNumber: 1,
    phase: "起点与适应",
    weekday: "周三",
    level: "诊断",
    kind: "diagnostic",
    title: "启程：我的听力起点",
    source: "课程内测",
    durationMinutes: 25,
    url: "https://learnenglishkids.britishcouncil.org/listen-watch/listening-practice",
    tasks: [
      "选择一篇Level 3听力，第一遍不看文字完成",
      "第二遍记录听到的五个关键词",
      "查看Transcript并标记三处没听懂的句子",
      "用中文说出主要内容并记录初始正确率"
    ]
  },
  {
    id: "day-002",
    date: "2026-10-01",
    dayNumber: 2,
    phase: "起点与适应",
    weekday: "周四",
    level: "A1",
    kind: "british-council",
    title: "A1体验：Meeting other students",
    source: "British Council LearnEnglish",
    durationMinutes: 30,
    url: "https://learnenglish.britishcouncil.org/free-resources/listening/a1/meeting-other-students",
    tasks: [
      "完成Preparation学科分类",
      "第一遍听出人物姓名和来源地",
      "第二遍完成Task 1和Task 2",
      "模仿录音完成30秒自我介绍"
    ]
  }
]);
```

Populate the remaining 97 literal entries according to this exact distribution:

| Slot | Count | Required content |
|---|---:|---|
| Mondays | 16 | LearnEnglish Kids Level 3 listening, short stories, or Video Zone |
| Tuesdays | 16 | Starting Out episodes 01–15 in order, then one whole-series review |
| Wednesdays | 17 | Day 1 diagnostic, then the preceding Tuesday episode's precision listening/retelling, with the final Wednesday used for A2 precision listening |
| Thursdays | 17 | Twelve distinct A1 Listening lessons followed by five age-appropriate A2 Listening lessons |
| Fridays | 17 | Embeddable English-learning animation or topic videos from official/established YouTube channels |
| Saturdays | 16 | Weekly review and short assessment using that week's material |

Use official British Council lesson URLs, not search-result URLs. For each YouTube entry, store both its 11-character `videoId` and canonical `https://www.youtube.com/watch?v=...` URL. Verify that the selected video currently exposes an Embed option; if it does not, choose another video before recording it.

Use these phase boundaries exactly:

```js
const PHASE_BY_DAY = Object.freeze([
  { from: 1, to: 24, name: "起点与适应" },
  { from: 25, to: 54, name: "A1核心训练" },
  { from: 55, to: 78, name: "A1完成与A2桥接" },
  { from: 79, to: 99, name: "A2主线" }
]);
```

- [ ] **Step 4: Run the catalog test**

Run: `node --test tests/course-data.test.mjs`

Expected: 3 tests PASS.

- [ ] **Step 5: Run a one-line catalog audit**

Run:

```powershell
node -e "import('./courses.mjs').then(({COURSES})=>console.log({count:COURSES.length,first:COURSES[0].date,last:COURSES.at(-1).date,maxScore:COURSES.length*5}))"
```

Expected: `{ count: 99, first: '2026-09-30', last: '2027-01-22', maxScore: 495 }`.

---

### Task 2: Implement pure progress and validation rules

**Files:**
- Create: `core.mjs`
- Create: `tests/core.test.mjs`

**Interfaces:**
- Consumes: `COURSES` and course IDs.
- Produces: `emptyProgress()`, `validateCourses(courses)`, `setTaskChecked(progress, course, taskIndex, checked)`, `canCheckIn(progress, course)`, `checkIn(progress, course, timestamp)`, `cancelCheckIn(progress, course)`, `score(progress)`, `completedCount(progress)`, `streak(courses, progress, today)`.
- `Progress = { version: 1, taskChecks: Record<string, boolean[]>, checkIns: Record<string, string> }`.

- [ ] **Step 1: Write failing behavior tests**

```js
// tests/core.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import {
  emptyProgress,
  setTaskChecked,
  canCheckIn,
  checkIn,
  cancelCheckIn,
  score,
  streak,
  validateCourses
} from "../core.mjs";
import { COURSES } from "../courses.mjs";

const course = {
  id: "day-001",
  date: "2026-09-30",
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

test("check-in awards five points once and cancellation removes them", () => {
  let progress = emptyProgress();
  course.tasks.forEach((_, index) => {
    progress = setTaskChecked(progress, course, index, true);
  });
  progress = checkIn(progress, course, "2026-09-29T12:00:00.000Z");
  assert.equal(score(progress), 5);
  progress = checkIn(progress, course, "2026-09-29T12:01:00.000Z");
  assert.equal(score(progress), 5);
  progress = cancelCheckIn(progress, course);
  assert.equal(score(progress), 0);
  assert.deepEqual(progress.taskChecks[course.id], [true, true, true]);
});

test("future lessons can be checked in", () => {
  let progress = emptyProgress();
  course.tasks.forEach((_, index) => {
    progress = setTaskChecked(progress, course, index, true);
  });
  progress = checkIn(progress, course, "2026-09-01T00:00:00.000Z");
  assert.equal(score(progress), 5);
});

test("streak skips Sundays", () => {
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
});

test("the production catalog validates", () => {
  assert.deepEqual(validateCourses(COURSES), []);
});
```

- [ ] **Step 2: Run tests and verify the missing module failure**

Run: `node --test tests/core.test.mjs`

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `core.mjs`.

- [ ] **Step 3: Implement immutable progress transitions**

```js
// core.mjs
export function emptyProgress() {
  return { version: 1, taskChecks: {}, checkIns: {} };
}

export function setTaskChecked(progress, course, taskIndex, checked) {
  if (taskIndex < 0 || taskIndex >= course.tasks.length) {
    throw new RangeError("Task index is outside the course task list");
  }
  const current = progress.taskChecks[course.id] ?? course.tasks.map(() => false);
  const next = [...current];
  next[taskIndex] = Boolean(checked);
  return {
    ...progress,
    taskChecks: { ...progress.taskChecks, [course.id]: next }
  };
}

export function canCheckIn(progress, course) {
  const checks = progress.taskChecks[course.id] ?? [];
  return checks.length === course.tasks.length && checks.every(Boolean);
}

export function checkIn(progress, course, timestamp = new Date().toISOString()) {
  if (!canCheckIn(progress, course)) throw new Error("Complete every task before check-in");
  if (progress.checkIns[course.id]) return progress;
  return {
    ...progress,
    checkIns: { ...progress.checkIns, [course.id]: timestamp }
  };
}

export function cancelCheckIn(progress, course) {
  const checkIns = { ...progress.checkIns };
  delete checkIns[course.id];
  return { ...progress, checkIns };
}

export function completedCount(progress) {
  return Object.keys(progress.checkIns).length;
}

export function score(progress) {
  return completedCount(progress) * 5;
}

export function streak(courses, progress, today) {
  const eligible = courses.filter(course => course.date <= today);
  let total = 0;
  for (let index = eligible.length - 1; index >= 0; index -= 1) {
    if (!progress.checkIns[eligible[index].id]) break;
    total += 1;
  }
  return total;
}

export function validateCourses(courses) {
  const errors = [];
  if (courses.length !== 99) errors.push("Course count must be 99");
  const dates = new Set();
  courses.forEach((course, index) => {
    if (course.dayNumber !== index + 1) errors.push(`${course.id}: invalid dayNumber`);
    if (dates.has(course.date)) errors.push(`${course.id}: duplicate date`);
    dates.add(course.date);
    const day = new Date(`${course.date}T00:00:00+08:00`).getDay();
    if (day === 0) errors.push(`${course.id}: Sunday is not allowed`);
    if (course.date < "2026-09-30" || course.date > "2027-01-22") errors.push(`${course.id}: date out of range`);
    if (!course.title || !course.source || !course.url) errors.push(`${course.id}: missing display data`);
    if (!Array.isArray(course.tasks) || course.tasks.length < 3 || course.tasks.length > 5) errors.push(`${course.id}: invalid tasks`);
  });
  return errors;
}
```

- [ ] **Step 4: Run both test files**

Run: `node --test tests/*.test.mjs`

Expected: all tests PASS.

---

### Task 3: Create the semantic application shell and approved visual system

**Files:**
- Create: `index.html`
- Create: `styles.css`

**Interfaces:**
- Produces DOM targets: `#score`, `#streak`, `#semester-progress`, `#today-card`, `#journey`, `#week-route`, `#all-courses`, `#reset-progress`, `#status-message`.
- Consumed by: `app.mjs` render and event functions.

- [ ] **Step 1: Read the frontend design skill before editing UI files**

Read completely: `C:/Users/baoba/.codex/skills/frontend-skill/SKILL.md`.

Apply its typography, spacing, hierarchy, responsive, accessibility, and anti-generic guidance while preserving the approved B1 palette and layout.

- [ ] **Step 2: Create the semantic HTML shell**

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="2026秋季99天英语听力学习与打卡计划">
  <title>The English Trail · 99天英语探险</title>
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  <a class="skip-link" href="#today-card">跳到今日课程</a>
  <header class="site-header">
    <div>
      <p class="eyebrow">2026 AUTUMN</p>
      <h1>The English Trail</h1>
      <p>99天英语探险</p>
    </div>
    <div class="header-stats" aria-label="学习统计">
      <span>★ <strong id="score">0</strong> / 495</span>
      <span>连续 <strong id="streak">0</strong> 天</span>
    </div>
  </header>

  <main>
    <p id="status-message" class="status-message" role="status" aria-live="polite"></p>
    <section class="dashboard-grid">
      <div>
        <section id="today-card" aria-labelledby="today-heading"></section>
        <section id="all-courses" aria-labelledby="courses-heading">
          <div class="section-heading">
            <div><p class="eyebrow">FULL JOURNEY</p><h2 id="courses-heading">全部课程</h2></div>
            <button type="button" id="jump-today">回到今天</button>
          </div>
          <div id="course-list"></div>
        </section>
      </div>
      <aside>
        <section id="semester-progress" aria-label="学期进度"></section>
        <nav id="journey" aria-label="四阶段旅程"></nav>
        <section id="week-route" aria-label="本周路线"></section>
      </aside>
    </section>
  </main>

  <footer>
    <button type="button" id="reset-progress" class="danger-link">重置全部进度</button>
  </footer>

  <dialog id="confirm-dialog">
    <form method="dialog">
      <h2 id="dialog-title">确认操作</h2>
      <p id="dialog-copy"></p>
      <div class="dialog-actions">
        <button value="cancel">取消</button>
        <button value="confirm" class="danger-button">确认</button>
      </div>
    </form>
  </dialog>

  <script type="module" src="./app.mjs"></script>
</body>
</html>
```

- [ ] **Step 3: Implement the travel-journal CSS system**

Start `styles.css` with these exact tokens and build all components from them:

```css
:root {
  --paper: #f7f0e3;
  --surface: #fffdf8;
  --ink: #49351f;
  --muted: #806c50;
  --line: #e1d5c4;
  --forest: #6f8262;
  --forest-dark: #4f6548;
  --terracotta: #b65f43;
  --gold: #f2c86d;
  --danger: #9c3f32;
  --radius-lg: 1.125rem;
  --radius-md: .75rem;
  --shadow: 0 .55rem 1.5rem rgb(73 53 31 / .09);
  --content-width: 76rem;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  color: var(--ink);
  background:
    radial-gradient(circle at top left, rgb(242 200 109 / .18), transparent 28rem),
    var(--paper);
  font-family: Inter, "Noto Sans SC", "Microsoft YaHei", sans-serif;
  line-height: 1.55;
}
h1, h2, h3 { font-family: Georgia, "Noto Serif SC", serif; line-height: 1.15; }
button, input { font: inherit; }
button { min-height: 2.75rem; }
.site-header, main, footer { width: min(calc(100% - 2rem), var(--content-width)); margin-inline: auto; }
.dashboard-grid { display: grid; grid-template-columns: minmax(0, 1.65fr) minmax(17rem, .7fr); gap: 1rem; align-items: start; }
@media (max-width: 840px) {
  .dashboard-grid { grid-template-columns: 1fr; }
  aside { order: -1; }
  .header-stats { width: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; transition: none !important; }
}
```

Add visible focus styles, minimum 44px touch targets, task-checkbox labels, progress bars, week cells, course cards, source badges, responsive iframe containers, dialog styles, empty/error states, and print-safe hiding of buttons. Do not add animation beyond a short color/transform hover transition.

- [ ] **Step 4: Run the static shell check**

Run:

```powershell
node -e "const fs=require('fs');const h=fs.readFileSync('index.html','utf8');for(const id of ['score','streak','today-card','journey','week-route','course-list','reset-progress','status-message'])if(!h.includes('id=\"'+id+'\"'))throw Error(id);console.log('shell ok')"
```

Expected: `shell ok`.

---

### Task 4: Render courses and implement local persistence

**Files:**
- Create: `app.mjs`
- Modify: `styles.css`
- Modify: `tests/core.test.mjs`

**Interfaces:**
- Consumes: `COURSES` and every function exported by `core.mjs`.
- Produces: `loadProgress(storage)`, `saveProgress(storage, progress)`, browser UI and event handling.

- [ ] **Step 1: Add persistence tests**

Append to `tests/core.test.mjs`:

```js
import { loadProgress, saveProgress } from "../app.mjs";

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
```

- [ ] **Step 2: Run the test and verify the missing export failure**

Run: `node --test tests/core.test.mjs`

Expected: FAIL because `app.mjs` does not exist.

- [ ] **Step 3: Implement the two-function storage boundary**

```js
// app.mjs
import { COURSES } from "./courses.mjs";
import {
  emptyProgress,
  validateCourses,
  setTaskChecked,
  canCheckIn,
  checkIn,
  cancelCheckIn,
  completedCount,
  score,
  streak
} from "./core.mjs";

const STORAGE_KEY = "english-trail-progress-v1";

export function loadProgress(storage) {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();
    const parsed = JSON.parse(raw);
    if (parsed?.version !== 1 || !parsed.taskChecks || !parsed.checkIns) return emptyProgress();
    return parsed;
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(storage, progress) {
  storage.setItem(STORAGE_KEY, JSON.stringify(progress));
}
```

Guard browser initialization so Node can import the module during tests:

```js
if (typeof document !== "undefined") {
  initializeApp();
}
```

- [ ] **Step 4: Implement rendering from state**

Implement these functions in `app.mjs` with no hidden global score state:

```js
function initializeApp() {}
function renderApp() {}
function renderToday(course) {}
function renderStats() {}
function renderJourney() {}
function renderWeekRoute(course) {}
function renderCourseList() {}
function courseCard(course, expanded = false) {}
function sourceAction(course) {}
function youtubeEmbed(course) {}
function persistAndRender(nextProgress, message) {}
function todayISO() {}
function currentCourse(date) {}
function openConfirmation({ title, copy, onConfirm }) {}
```

Required behavior:

- `currentCourse` returns today's course when present; before the start it returns day 1; on Sundays it returns the next Monday course; after the end it returns day 99.
- `renderToday` shows date, day number, phase, level, duration, source, tasks, progress bar, resource action, and check-in/cancel action.
- `renderCourseList` groups lessons by calendar week, marks past/today/future/completed, and allows any lesson to expand.
- Checking a task calls `setTaskChecked`, saves, and rerenders.
- Check-in is disabled until `canCheckIn` is true.
- Checking in shows `已获得5积分` through the live status region.
- Cancelling a check-in and resetting all progress use the native `<dialog>` confirmation.
- `score` and `completedCount` are recalculated from `progress.checkIns` on every render.
- If `saveProgress` throws, show `浏览器无法保存进度；本次操作仅在当前页面有效。` and keep the in-memory state.

- [ ] **Step 5: Implement lazy YouTube and British Council actions**

Use this output contract:

```js
function sourceAction(course) {
  if (course.kind === "youtube") {
    return `
      <button class="load-video" data-video-id="${course.videoId}">在页面内播放</button>
      <a href="${course.url}" target="_blank" rel="noopener noreferrer">在 YouTube 打开 ↗</a>`;
  }
  if (course.kind === "british-council" || course.kind === "diagnostic") {
    return `<a class="primary-action" href="${course.url}" target="_blank" rel="noopener noreferrer">打开 British Council 课程 ↗</a>`;
  }
  return "";
}

function youtubeEmbed(course) {
  return `<div class="video-frame"><iframe
    src="https://www.youtube-nocookie.com/embed/${course.videoId}?rel=0&cc_load_policy=1"
    title="${course.title}"
    loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen></iframe></div>`;
}
```

Only insert the player into the clicked course's video container; never render all YouTube iframes at startup.

- [ ] **Step 6: Run all automated tests**

Run: `node --test tests/*.test.mjs`

Expected: all tests PASS.

---

### Task 5: Add local run instructions and perform browser verification

**Files:**
- Create: `README.md`
- Modify: any of `index.html`, `styles.css`, `app.mjs`, or `courses.mjs` only when verification exposes a defect.

**Interfaces:**
- Produces: reproducible local preview instructions and verified responsive behavior.

- [ ] **Step 1: Write the minimal README**

```markdown
# The English Trail

## Run locally

From this directory:

```powershell
python -m http.server 8080
```

Open http://localhost:8080/ in a browser. Do not open `index.html` directly with `file://`, because YouTube embeds may reject requests without an HTTP referrer.

## Run checks

```powershell
node --test tests/*.test.mjs
```

Progress is stored in this browser's localStorage. Clearing site data removes it.
```

- [ ] **Step 2: Run the automated suite from a clean shell**

Run: `node --test tests/*.test.mjs`

Expected: all tests PASS with zero failures.

- [ ] **Step 3: Start the local server**

Run: `python -m http.server 8080`

Expected: server listens on `http://localhost:8080/` with no startup error.

- [ ] **Step 4: Verify the complete desktop journey**

At a desktop viewport near 1440×900, verify:

1. B1 travel-journal colors and hierarchy match the approved mockup.
2. Header shows `0 / 495`, journey phases, and the current/nearest course.
3. All 99 lessons are navigable and show accurate dates.
4. A future lesson can be opened and completed.
5. Check-in stays disabled until every task is checked.
6. First check-in adds five points; a second click cannot add more.
7. Refresh preserves tasks, completion, and score.
8. Cancelling completion asks for confirmation and subtracts five points.
9. British Council opens in a new tab.
10. A YouTube course loads one embedded player on demand and keeps its external fallback link.

- [ ] **Step 5: Verify mobile and keyboard behavior**

At a viewport near 390×844, verify:

1. Layout becomes one column with no horizontal scrolling.
2. Course tasks and buttons remain readable and at least 44px high.
3. Embedded video remains 16:9 and within the card width.
4. Keyboard Tab order follows header → today → course list → sidebar/footer actions.
5. Focus indicators are clearly visible.
6. The dialog traps interaction until cancelled or confirmed.
7. Reduced-motion preference removes decorative transitions.

- [ ] **Step 6: Verify reset and failure states**

1. Cancel reset and confirm that data remains.
2. Confirm reset and verify score, check-ins, and task ticks return to zero.
3. Temporarily block localStorage in browser devtools and verify the warning appears without breaking the session.
4. Temporarily replace one YouTube ID with an invalid ID and verify the external link remains available.
5. Restore the valid catalog and rerun `node --test tests/*.test.mjs`.

Expected: all checks pass and the automated suite remains green.

---

## Implementation Completion Gate

Do not claim completion until all of the following are true:

- `node --test tests/*.test.mjs` passes.
- Catalog audit reports 99 courses and 495 maximum points.
- Desktop and mobile browser checks pass.
- At least one British Council link and one YouTube embed are manually verified.
- No account credential, Cookie, access token, downloaded media, framework, or new package exists in the project.
