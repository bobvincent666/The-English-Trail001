import test from "node:test";
import assert from "node:assert/strict";
import { COURSES } from "../courses.mjs";

const weekday = date => new Date(`${date}T12:00:00Z`).getUTCDay();

test("catalog contains the exact 99 scheduled dates in every timezone", () => {
  const expected = [];
  for (let date = new Date("2026-09-30T12:00:00Z"); date <= new Date("2027-01-22T12:00:00Z"); date.setUTCDate(date.getUTCDate() + 1)) {
    if (date.getUTCDay() !== 0) expected.push(date.toISOString().slice(0, 10));
  }
  assert.deepEqual(COURSES.map(course => course.date), expected);
  assert.equal(COURSES.length, 99);
  assert.equal(new Set(COURSES.map(course => course.id)).size, 99);
});

test("every course has complete immutable display and task data", () => {
  assert.ok(Object.isFrozen(COURSES));
  for (const [index, course] of COURSES.entries()) {
    assert.equal(course.dayNumber, index + 1);
    assert.equal(course.id, `day-${String(index + 1).padStart(3, "0")}`);
    assert.equal(course.weekday, ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][weekday(course.date)]);
    assert.equal(course.phase, index < 24 ? "起点与适应" : index < 54 ? "A1核心训练" : index < 78 ? "A1完成与A2桥接" : "A2主线");
    for (const field of ["title", "source", "level", "kind"]) assert.ok(typeof course[field] === "string" && course[field].trim());
    assert.ok(Number.isInteger(course.durationMinutes) && course.durationMinutes >= 25 && course.durationMinutes <= 35);
    assert.ok(course.tasks.length >= 3 && course.tasks.length <= 5);
    assert.ok(course.tasks.every(task => typeof task === "string" && task.trim()));
    assert.ok(Object.isFrozen(course) && Object.isFrozen(course.tasks));
    const url = new URL(course.url);
    assert.equal(url.protocol, "https:");
    if (course.kind === "youtube") {
      assert.match(course.videoId, /^[A-Za-z0-9_-]{11}$/);
      assert.equal(course.url, `https://www.youtube.com/watch?v=${course.videoId}`);
    } else {
      assert.ok(["learnenglish.britishcouncil.org", "learnenglishkids.britishcouncil.org"].includes(url.hostname));
    }
  }
});

test("catalog implements the exact approved spiral curriculum", () => {
  const slots = day => COURSES.filter(course => weekday(course.date) === day);
  assert.deepEqual([1, 2, 3, 4, 5, 6].map(day => slots(day).length), [16, 16, 17, 17, 17, 16]);
  assert.equal(COURSES[0].kind, "diagnostic");
  assert.ok(slots(1).every(course => course.url.startsWith("https://learnenglishkids.britishcouncil.org/")));
  for (let episode = 1; episode <= 15; episode += 1) {
    const tuesday = slots(2)[episode - 1];
    const wednesday = slots(3)[episode];
    assert.ok(tuesday.title.startsWith(`Starting Out ${String(episode).padStart(2, "0")}`));
    assert.equal(wednesday.url, tuesday.url);
    assert.ok(wednesday.title.includes("精听"));
  }
  assert.equal(slots(2).at(-1).kind, "review");
  assert.equal(slots(3).at(-1).level, "A2");
  assert.deepEqual(slots(4).map(course => course.level), [...Array(12).fill("A1"), ...Array(5).fill("A2")]);
  assert.equal(new Set(slots(4).slice(0, 12).map(course => course.url)).size, 12);
  assert.ok(slots(5).every(course => course.kind === "youtube"));
  assert.ok(slots(6).every(course => course.kind === "review"));
});
