# automation-tool

A small Node.js learning project: fetches todos from the public JSONPlaceholder API
and generates JSON reports.

## Usage

    npm install
    npm start

## Output

- `reports/todo-report.json`: summary statistics
- `reports/incomplete-todos.json`: list of incomplete todos

## Structure

- `src/index.js`: entry point, builds the reports
- `src/services/todoService.js`: fetches todos via axios

## Notes

Learning project for practicing Git/GitHub workflow (branches, pull requests) and Node.js basics.
