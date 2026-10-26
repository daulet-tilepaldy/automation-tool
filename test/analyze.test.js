const test = require("node:test");
const assert = require("node:assert");
const { analyzeTodos, analyzeByUser } = require("../src/analyze");

const todos = [
  { userId: 1, id: 1, title: "a", completed: true },
  { userId: 1, id: 2, title: "b", completed: false },
  { userId: 2, id: 3, title: "c", completed: false }
];

test("analyzeTodos counts total, completed and not completed", () => {
  assert.deepStrictEqual(analyzeTodos(todos), {
    total: 3,
    completed: 1,
    notCompleted: 2
  });
});

test("analyzeByUser groups todos by userId", () => {
  assert.deepStrictEqual(analyzeByUser(todos), [
    { userId: 1, total: 2, completed: 1, notCompleted: 1 },
    { userId: 2, total: 1, completed: 0, notCompleted: 1 }
  ]);
});

test("analyzeTodos returns zeros for an empty array", () => {
  assert.deepStrictEqual(analyzeTodos([]), {
    total: 0,
    completed: 0,
    notCompleted: 0
  });
});

test("analyzeByUser returns an empty array for empty input", () => {
  assert.deepStrictEqual(analyzeByUser([]), []);
});