export function emptyProgress() {
  return { version: 1, taskChecks: {}, checkIns: {} };
}

export function setTaskChecked(progress, course, taskIndex, checked) {
  if (taskIndex < 0 || taskIndex >= course.tasks.length) {
    throw new RangeError("Task index is outside the course task list");
  }
  const current = progress.taskChecks[course.id] ?? [];
  const next = course.tasks.map((_, index) => current[index] === true);
  next[taskIndex] = Boolean(checked);
  return {
    ...progress,
    taskChecks: { ...progress.taskChecks, [course.id]: next }
  };
}

export function canCheckIn(progress, course) {
  const checks = progress.taskChecks[course.id] ?? [];
  return checks.length === course.tasks.length && course.tasks.every((_, index) => checks[index] === true);
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
    if (new Date(`${course.date}T12:00:00Z`).getUTCDay() === 0) errors.push(`${course.id}: Sunday is not allowed`);
    if (course.date < "2026-09-30" || course.date > "2027-01-22") errors.push(`${course.id}: date out of range`);
    if (!course.title || !course.source || !course.url) errors.push(`${course.id}: missing display data`);
    if (!Array.isArray(course.tasks) || course.tasks.length < 3 || course.tasks.length > 5) errors.push(`${course.id}: invalid tasks`);
  });
  return errors;
}
