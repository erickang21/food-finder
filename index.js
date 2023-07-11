// -- Global Imports --
const express = require("express");
const winston = require("winston");
const logHelper = require("./src/helpers/logger");
// Config variables (access with process.env)
require('dotenv').config()

const logger = new logHelper(this.dev ? "trace" : "info");

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
// Database
const db = new mongodb().db;

// -- APP ROUTES --
app.use(express.static(__dirname + '/src/frontend/'));

// home page
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/src/frontend/index.html");
});

// for me only: upload page
app.get("/upload", (req, res) => {
  res.sendFile(process.cwd() + "/src/frontend/upload.html");
});

// post
app.post("/upload", (req, res) => {
  const data = {
    name: req.query.name,
    createdAt: req.query.createdAt,
    meal: req.query.meal,
    type: req.query.type,
    city: req.query.city,
    tags: req.query.tags.split(","),
    rating: {
      overall: req.query.overallRating,
      overallDescription: req.query.overallRatingDescription,
      
    },
    location: req.query.location
  }
})

app.listen(3000, (err) => {
  if (err) {
    logger.error(`Error occurred while starting: ${err}`);
  } else {
    logger.info("Server started on port 3000!");
  }
});