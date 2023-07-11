// -- Global Imports --
const express = require("express");
const winston = require("winston");
const logger = require("./src/helpers/logger");

// -- Local Imports --
const mongodb = require("./src/backend/db/mongodb.js");
try {
  mongodb.connectDatabase();
  logger.info("Connected to MongoDB.");
} catch (e) {
  logger.error(`Failed to connect to MongoDB.\n\n${e}`)
}

// -- Global variables --
// Express app
const app = express();
// Config variables (access with process.env)
require('dotenv').config()
// Database
const db = new mongodb().db;

// -- APP ROUTES --
// home page
app.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/src/frontend/index.html");
});

app.listen(3000, (err) => {
  if (err) {
    logger.error(`Error occurred while starting: ${err}`);
  } else {
    logger.info("Server started on port 3000!");
  }
});