const fs = require("fs").promises;
const { getTodos } = require("./services/todoService");

function analyzeTodos(todos) {
  const completed = todos.filter(todo => todo.completed);
  const notCompleted = todos.filter(todo => !todo.completed);

  return {
    total: todos.length,
    completed: completed.length,
    notCompleted: notCompleted.length
  };
}

async function main() {
  try {
    const todos = await getTodos();

    const incompleteTodos = todos.filter(todo => !todo.completed);

    const result = analyzeTodos(todos);
    await fs.writeFile(
      "reports/todo-report.json",
      JSON.stringify(result, null, 2)
  );
    await fs.writeFile(
      "reports/incomplete-todos.json",
      JSON.stringify(incompleteTodos, null, 2)
);
    console.log("Всего задач:", result.total);
    console.log("Выполнено:", result.completed);
    console.log("Не выполнено:", result.notCompleted);
    console.log("Первая невыполненная задача:", incompleteTodos[0]);
  } catch (error) {
    console.error("Ошибка:", error.message);
  }
}

main();