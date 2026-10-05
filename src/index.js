const fs = require("fs");
const { getTodos } = require("./services/todoService");

function analyzeTodos(todos) {
  const completed = todos.filter(todo => todo.completed);

  return {
    total: todos.length,
    completed: completed.length,
    notCompleted: todos.length - completed.length
  };
}

async function main() {
  try {
    const todos = await getTodos();

    const result = analyzeTodos(todos);
    fs.writeFileSync(
      "reports/todo-report.json",
      JSON.stringify(result, null, 2)
  );
    console.log("Всего задач:", result.total);
    console.log("Выполнено:", result.completed);
    console.log("Не выполнено:", result.notCompleted);
  } catch (error) {
    console.error("Ошибка:", error.message);
  }
}

main();