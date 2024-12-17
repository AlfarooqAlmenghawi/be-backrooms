const express = require("express");
const app = express();
const cors = require("cors");

// Functions from MVC Requiring

const { getAllLevels } = require("./mvc/controllers/levels.controller.js");

// API Requests Handling

app.use(cors());

app.use(express.json());

app.get("/api/levels", getAllLevels);

module.exports = app;
