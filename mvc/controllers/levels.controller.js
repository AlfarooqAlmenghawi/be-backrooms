const { fetchAllLevels } = require("../models/levels.model.js");

async function getAllLevels(request, response) {
  const levels = await fetchAllLevels();
  response.status(200).send(levels);
}

module.exports = { getAllLevels };
