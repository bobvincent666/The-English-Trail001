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
    if (
      parsed?.version !== 1 ||
      !parsed.taskChecks || Array.isArray(parsed.taskChecks) || typeof parsed.taskChecks !== "object" ||
      !parsed.checkIns || Array.isArray(parsed.checkIns) || typeof parsed.checkIns !== "object" ||
      !Object.entries(parsed.taskChecks).every(([id, checks]) =>
        byId.has(id) && Array.isArray(checks) && checks.every(value => typeof value === "boolean")) ||
      !Object.entries(parsed.checkIns).every(([id, timestamp]) =>
        byId.has(id) && typeof timestamp === "string")
    ) return emptyProgress();
    return parsed;
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(storage, progress) {
  storage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

let progress = emptyProgress();
let storage;
const loadedVideos = new Set();
const byId = new Map(COURSES.map(course => [course.id, course]));
const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
})[character]);

function todayISO() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Shanghai", year: "numeric", month: "2-digit", day: "2-digit"
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(part => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export function currentCourse(date) {
  return COURSES.find(course => course.date >= date) ?? COURSES.at(-1);
}

function weekStart(date) {
  const day = new Date(`${date}T12:00:00Z`);
  day.setUTCDate(day.getUTCDate() - (day.getUTCDay() + 6) % 7);
  return day.toISOString().slice(0, 10);
}

function setStatus(message, error = false) {
  const element = document.getElementById("status-message");
  element.textContent = message;
  element.classList.toggle("is-error", error);
}

function initializeApp() {
  const errors = validateCourses(COURSES);
  if (errors.length) {
    console.error("课程数据校验失败", errors);
    document.getElementById("today-card").innerHTML = '<p class="error-state">课程数据校验失败，请检查课程目录。</p>';
    return;
  }
  try {
    storage = window.localStorage;
    storage.getItem(STORAGE_KEY);
    progress = loadProgress(storage);
  } catch {
    setStatus("浏览器无法保存进度；本次操作仅在当前页面有效。", true);
  }
  document.addEventListener("change", event => {
    const input = event.target.closest("input[data-task-index]");
    if (!input) return;
    const course = byId.get(input.dataset.courseId);
    if (!course) return;
    const location = input.closest("#today-card") ? "#today-card" : "#course-list";
    const next = setTaskChecked(progress, course, Number(input.dataset.taskIndex), input.checked);
    persistAndRender(next, "");
    document.querySelector(`${location} input[data-course-id="${course.id}"][data-task-index="${input.dataset.taskIndex}"]`)?.focus();
  });
  document.addEventListener("click", event => {
    const link = event.target.closest('a[href^="#course-"]');
    if (link) {
      const details = document.getElementById(link.getAttribute("href").slice(1));
      if (details) details.open = true;
    }
    const button = event.target.closest("button");
    if (!button) return;
    if (button.id === "jump-today") {
      document.getElementById("today-card").scrollIntoView();
      document.getElementById("today-card").focus();
      return;
    }
    if (button.id === "reset-progress") {
      openConfirmation({
        title: "重置全部进度？",
        copy: "99天的任务勾选和打卡记录都会清空，积分也会归零。",
        onConfirm: () => persistAndRender(emptyProgress(), "全部进度已重置")
      });
      return;
    }
    const course = byId.get(button.dataset.courseId);
    if (button.classList.contains("load-video") && course?.kind === "youtube") {
      loadedVideos.add(`${course.id}:${button.closest("#today-card") ? "today" : "list"}`);
      button.closest(".resource-actions").nextElementSibling.innerHTML = youtubeEmbed(course);
      button.remove();
      return;
    }
    if (button.dataset.action === "check-in" && course && !progress.checkIns[course.id] && canCheckIn(progress, course)) {
      persistAndRender(checkIn(progress, course), "已获得5积分");
      button.focus();
    }
    if (button.dataset.action === "cancel" && course && progress.checkIns[course.id]) {
      openConfirmation({
        title: "取消这次打卡？",
        copy: `第${course.dayNumber}天将扣回5积分，已勾选的任务会保留。`,
        onConfirm: () => {
          persistAndRender(cancelCheckIn(progress, course), "已取消打卡，扣回5积分");
          button.focus();
        }
      });
    }
  });
  renderApp();
}

function renderApp() {
  const course = currentCourse(todayISO());
  renderToday(course);
  renderStats();
  renderJourney();
  renderWeekRoute(course);
  renderCourseList();
}

export function renderToday(course) {
  const host = document.getElementById("today-card");
  const card = host.querySelector(".course-card");
  if (card?.dataset.courseId === course.id) {
    syncCourseCard(card, course);
    return;
  }
  host.innerHTML =
    `<p class="eyebrow">TODAY'S TRAIL · 今日课程</p><h2 id="today-heading">第${course.dayNumber}天 · ${escapeHtml(course.title)}</h2>` +
    courseCard(course, true, true);
}

function renderStats() {
  const done = completedCount(progress);
  document.getElementById("score").textContent = score(progress);
  document.getElementById("streak").textContent = streak(COURSES, progress, todayISO());
  document.getElementById("semester-progress").innerHTML = `
    <p class="eyebrow">SEMESTER PROGRESS</p>
    <h2>学期进度</h2>
    <p class="progress-total">${done}<small> / 99 天</small></p>
    <progress value="${done}" max="99" aria-label="已完成课程"></progress>
    <p class="course-hint">每完成一课，获得5积分。已累计 ${score(progress)} / 495 分。</p>`;
}

function renderJourney() {
  const phases = [...new Set(COURSES.map(course => course.phase))];
  const current = currentCourse(todayISO());
  document.getElementById("journey").innerHTML = `<p class="eyebrow">FOUR CHAPTERS</p><h2>四阶段旅程</h2><ol class="journey-list">` +
    phases.map(phase => {
      const courses = COURSES.filter(course => course.phase === phase);
      const done = courses.filter(course => progress.checkIns[course.id]).length;
      const state = done === courses.length ? "is-complete" : phase === current.phase ? "is-current" : "";
      return `<li class="journey-step ${state}"><h3>${escapeHtml(phase)}</h3>
        <p>${courses[0].date} — ${courses.at(-1).date} · ${done} / ${courses.length} 天</p>
        <a href="#course-${courses[0].id}">查看课程 ↗</a></li>`;
    }).join("") + "</ol>";
}

function renderWeekRoute(course) {
  const week = weekStart(course.date);
  const courses = COURSES.filter(item => weekStart(item.date) === week);
  document.getElementById("week-route").innerHTML = `<p class="eyebrow">THIS WEEK</p><h2>本周路线</h2>
    <div class="week-grid">${courses.map(item => {
      const state = progress.checkIns[item.id] ? "is-complete" : item.id === course.id ? "is-current" : "";
      return `<a class="week-cell ${state}" href="#course-${item.id}" ${item.date === todayISO() ? 'aria-current="date"' : ""}>
        <span>${escapeHtml(item.weekday)}</span><small>${item.date.slice(5)}</small><small>第${item.dayNumber}天</small></a>`;
    }).join("")}</div><p class="course-hint">可提前学习，也可补做过去的课程。</p>`;
}

export function renderCourseList() {
  const host = document.getElementById("course-list");
  if (host.firstElementChild) {
    for (const course of COURSES) syncCourseCard(document.getElementById(`course-${course.id}`), course);
    return;
  }
  const weeks = new Map();
  for (const course of COURSES) {
    const start = weekStart(course.date);
    if (!weeks.has(start)) weeks.set(start, []);
    weeks.get(start).push(course);
  }
  host.innerHTML = [...weeks].map(([start, courses], index) => `
    <section class="course-week" aria-label="第${index + 1}周">
      <h3 class="week-heading"><span>第${index + 1}周 · ${start} — ${courses.at(-1).date}</span><span>${courses.length} 节课</span></h3>
      ${courses.map(course => courseCard(course)).join("")}
    </section>`).join("");
}

function syncCourseCard(card, course) {
  const checks = progress.taskChecks[course.id] ?? [];
  const checked = course.tasks.filter((_, index) => checks[index] === true).length;
  const done = Boolean(progress.checkIns[course.id]);
  card.classList.toggle("is-complete", done);
  card.classList.toggle("is-current", !done && course.date === todayISO());
  card.querySelector(".progress-label span:last-child").textContent = `${checked} / ${course.tasks.length}`;
  card.querySelector("progress").value = checked;
  for (const input of card.querySelectorAll("input[data-task-index]")) {
    input.checked = checks[Number(input.dataset.taskIndex)] === true;
  }
  const badge = card.querySelector(".status-badge");
  if (badge) badge.textContent = done ? "已完成" : course.date < todayISO() ? "过去" : course.date === todayISO() ? "今天" : "未来";
  const button = card.querySelector("button[data-action]");
  button.className = done ? "danger-link" : "check-in";
  button.dataset.action = done ? "cancel" : "check-in";
  button.disabled = !done && !canCheckIn(progress, course);
  button.textContent = done ? "取消打卡" : "完成打卡 · +5积分";
  card.querySelector(".course-actions .course-hint").textContent = done ? "已完成 · 获得5积分" : "完成全部任务后即可打卡";
}

function courseCard(course, expanded = false, today = false) {
  const checks = Array.isArray(progress.taskChecks[course.id]) ? progress.taskChecks[course.id] : [];
  const checked = course.tasks.filter((_, index) => checks[index] === true).length;
  const done = Boolean(progress.checkIns[course.id]);
  const date = todayISO();
  const state = done ? "is-complete" : course.date === date ? "is-current" : "";
  const temporal = course.date < date ? "过去" : course.date === date ? "今天" : "未来";
  const tag = today ? "article" : "details";
  const videoLoaded = loadedVideos.has(`${course.id}:${today ? "today" : "list"}`);
  const attributes = today ? "" : ` id="course-${course.id}" ${expanded ? "open" : ""}`;
  const summary = today ? "" : `<summary><span class="course-summary"><span class="day-number">DAY ${String(course.dayNumber).padStart(2, "0")}</span>
    <span class="course-title">${escapeHtml(course.title)}</span><span class="status-badge">${done ? "已完成" : temporal}</span></span></summary>`;
  return `<${tag}${attributes} class="course-card ${state}" data-course-id="${course.id}">
    ${summary}
    <div class="course-heading"><h3>${today ? "今日任务" : "课程详情"}</h3><span class="day-number">第${course.dayNumber}天</span></div>
    <div class="course-meta">
      <time datetime="${course.date}">${course.date} · ${escapeHtml(course.weekday)}</time>
      <span>${escapeHtml(course.phase)}</span>
      <span class="level-badge">${escapeHtml(course.level)}</span>
      <span>${course.durationMinutes}分钟</span>
      <span class="source-badge ${course.kind === "youtube" ? "youtube" : ""}">${escapeHtml(course.source)}</span>
    </div>
    <p class="progress-label"><span>任务进度</span><span>${checked} / ${course.tasks.length}</span></p>
    <progress value="${checked}" max="${course.tasks.length}" aria-label="第${course.dayNumber}天任务进度"></progress>
    <ul class="task-list">${course.tasks.map((task, index) => `<li><label>
      <input type="checkbox" data-course-id="${course.id}" data-task-index="${index}" ${checks[index] === true ? "checked" : ""}>
      <span>${escapeHtml(task)}</span></label></li>`).join("")}</ul>
    <div class="resource-actions">${sourceAction(course, videoLoaded)}</div>
    <div class="video-container">${videoLoaded ? youtubeEmbed(course) : ""}</div>
    <div class="course-actions">
      <button type="button" class="${done ? "danger-link" : "check-in"}" data-course-id="${course.id}" data-action="${done ? "cancel" : "check-in"}"
        ${!done && !canCheckIn(progress, course) ? "disabled" : ""}>${done ? "取消打卡" : "完成打卡 · +5积分"}</button>
      <span class="course-hint">${done ? "已完成 · 获得5积分" : "完成全部任务后即可打卡"}</span>
    </div>
  </${tag}>`;
}

export function sourceAction(course, videoLoaded = false) {
  let url;
  try {
    const parsed = new URL(course.url);
    if (parsed.protocol !== "https:") return "";
    url = escapeHtml(parsed.href);
  } catch {
    return "";
  }
  if (course.kind === "youtube") {
    return `${videoLoaded ? "" : `<button type="button" class="load-video" data-course-id="${escapeHtml(course.id)}" data-video-id="${escapeHtml(course.videoId)}">在页面内播放</button>`}
      <a href="${url}" target="_blank" rel="noopener noreferrer">在 YouTube 打开 ↗</a>`;
  }
  if (course.kind === "british-council" || course.kind === "diagnostic" || course.kind === "review") {
    return `<a class="primary-action" href="${url}" target="_blank" rel="noopener noreferrer">打开 British Council 课程 ↗</a>`;
  }
  return "";
}

export function youtubeEmbed(course) {
  return `<div class="video-frame"><iframe
    src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(course.videoId)}?rel=0&cc_load_policy=1"
    title="${escapeHtml(course.title)}"
    loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen></iframe></div>`;
}

function persistAndRender(nextProgress, message) {
  progress = nextProgress;
  try {
    saveProgress(storage, progress);
    setStatus(message);
  } catch {
    setStatus("浏览器无法保存进度；本次操作仅在当前页面有效。", true);
  }
  renderApp();
}

function openConfirmation({ title, copy, onConfirm }) {
  const dialog = document.getElementById("confirm-dialog");
  dialog.returnValue = "cancel";
  document.getElementById("dialog-title").textContent = title;
  document.getElementById("dialog-copy").textContent = copy;
  dialog.addEventListener("close", () => {
    if (dialog.returnValue === "confirm") onConfirm();
  }, { once: true });
  dialog.showModal();
}

if (typeof document !== "undefined") {
  initializeApp();
}
