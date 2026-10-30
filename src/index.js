const fs = require("fs").promises;
const { getTodos } = require("./services/todoService");
const { analyzeTodos, analyzeByUser } = require("./analyze");

async function main() {
  try {
    const todos = await getTodos();
    await fs.mkdir("reports", { recursive: true });

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
    const userReport = analyzeByUser(todos);
    await fs.writeFile(
      "reports/user-report.json",
      JSON.stringify(userReport, null, 2)
    );
    console.log("Пользователей в отчёте:", userReport.length);
    console.log("Всего задач:", result.total);
    console.log("Выполнено:", result.completed);
    console.log("Не выполнено:", result.notCompleted);
    console.log("Первая невыполненная задача:", incompleteTodos[0]);
  } catch (error) {
    console.error("Ошибка:", error.message);
    process.exitCode = 1;
  }
}

main();