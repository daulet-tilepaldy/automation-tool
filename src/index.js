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

function analyzeByUser(todos) {
  const users = {};

  for (const todo of todos) {
    if (!users[todo.userId]) {
      users[todo.userId] = {
        userId: todo.userId,
        total: 0,
        completed: 0,
        notCompleted: 0
      };
    }

    users[todo.userId].total++;

    if (todo.completed) {
      users[todo.userId].completed++;
    } else {
      users[todo.userId].notCompleted++;
    }
  }

  return Object.values(users);
}

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
  }
}

main();