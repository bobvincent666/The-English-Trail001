import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";

test("Python local preview serves JavaScript modules with a browser-safe MIME type", () => {
  const mime = execFileSync("python", ["-c", "from serve import Handler; print(Handler.extensions_map.get('.mjs'))"], { encoding: "utf8" }).trim();
  assert.ok(["text/javascript", "application/javascript"].includes(mime), `app.mjs was ${mime}`);
});
