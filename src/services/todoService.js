const axios = require("axios");

async function getTodos() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );

  return response.data;
}

module.exports = {
  getTodos
};