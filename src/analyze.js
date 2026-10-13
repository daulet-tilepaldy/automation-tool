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

module.exports = {
  analyzeTodos,
  analyzeByUser
};
