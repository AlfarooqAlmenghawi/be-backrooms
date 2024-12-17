const db = require("../../database/connection.js");

async function fetchAllLevels() {
  const response = await db.query(`SELECT * FROM levels;`);
  return response.rows;
}

module.exports = { fetchAllLevels };
