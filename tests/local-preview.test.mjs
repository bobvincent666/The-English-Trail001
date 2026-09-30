import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";

test("Python local preview serves JavaScript modules with a browser-safe MIME type", () => {
  const mime = execFileSync("python", ["-c", "from serve import Handler; print(Handler.extensions_map.get('.mjs'))"], { encoding: "utf8" }).trim();
  assert.ok(["text/javascript", "application/javascript"].includes(mime), `app.mjs was ${mime}`);
});

test("Python local preview binds only to loopback", () => {
  const command = "import runpy; from unittest.mock import patch; mock = patch('http.server.test'); server = mock.start(); runpy.run_path('serve.py', run_name='__main__'); mock.stop(); print(server.call_args.kwargs.get('bind'))";
  const bind = execFileSync("python", ["-c", command], { encoding: "utf8" }).trim();
  assert.equal(bind, "127.0.0.1");
});
