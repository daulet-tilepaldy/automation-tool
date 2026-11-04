const test = require("node:test");
const assert = require("node:assert");
const { parseUserId } = require("../src/cli");

test("parseUserId returns null when --user is not provided", () => {
  assert.strictEqual(parseUserId([]), null);
});

test("parseUserId returns the numeric id after --user", () => {
  assert.strictEqual(parseUserId(["--user", "3"]), 3);
});

test("parseUserId returns NaN when the value is missing or not an integer", () => {
  assert.ok(Number.isNaN(parseUserId(["--user"])));
  assert.ok(Number.isNaN(parseUserId(["--user", "abc"])));
  assert.ok(Number.isNaN(parseUserId(["--user", "3.5"])));
});
