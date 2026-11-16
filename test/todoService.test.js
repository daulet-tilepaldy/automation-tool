const test = require("node:test");
const assert = require("node:assert");
const axios = require("axios");
const { getTodos } = require("../src/services/todoService");

test("getTodos returns the data from the API response", async (t) => {
  const fakeTodos = [{ userId: 1, id: 1, title: "a", completed: false }];
  const getMock = t.mock.method(axios, "get", async () => ({ data: fakeTodos }));

  const result = await getTodos();

  assert.deepStrictEqual(result, fakeTodos);
  assert.strictEqual(getMock.mock.callCount(), 1);
});

test("getTodos rejects when the request fails", async (t) => {
  t.mock.method(axios, "get", async () => {
    throw new Error("Network Error");
  });

  await assert.rejects(getTodos(), { message: "Network Error" });
});
