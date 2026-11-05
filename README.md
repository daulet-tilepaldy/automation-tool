# automation-tool

![Tests](https://github.com/daulet-tilepaldy/automation-tool/actions/workflows/test.yml/badge.svg)

A small Node.js learning project: fetches todos from the public JSONPlaceholder API
and generates JSON reports.

## Usage

    npm install
    npm start

## Output

- `reports/todo-report.json`: summary statistics
- `reports/incomplete-todos.json`: list of incomplete todos
- `reports/user-report.json`: completed and incomplete counts per user

## Structure

- `src/index.js`: entry point, builds the reports
- `src/analyze.js`: pure functions that compute statistics (overall and per user)
- `src/services/todoService.js`: fetches todos via axios

## Notes

Learning project for practicing Git, GitHub and Node.js: pull requests, testing, refactoring.

## Example output

Running `npm start` prints a summary to the console (messages are in Russian):

    Пользователей в отчёте: 10
    Всего задач: 200
    Выполнено: 90
    Не выполнено: 110
    Первая невыполненная задача: { userId: 1, id: 1, title: 'delectus aut autem', completed: false }

`reports/user-report.json` contains one entry per user (first entry shown):

    [
      {
        "userId": 1,
        "total": 20,
        "completed": 11,
        "notCompleted": 9
      },
      ...
    ]

## Filter by user

    npm start -- --user 3

Prints and saves the report for one user only. An unknown or invalid id prints an error and exits with code 1.
