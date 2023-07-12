// -- Global Imports --
const express = require("express");
const winston = require("winston");
const logHelper = require("./src/helpers/logger");
// Config variables (access with process.env)
require('dotenv').config()

const logger = new logHelper(this.dev ? "trace" : "info");

// -- Local Imports --
const getMongoDB = require("./src/backend/db/mongodb.js");

let database;
try {
  database = getMongoDB();
  logger.info("Connected to MongoDB.");
} catch (e) {
  logger.error(`Failed to connect to MongoDB.\n\n${e}`)
}

// -- Global variables --
// Express app
const app = express();

// -- APP ROUTES --
app.use(express.static(__dirname + '/src/frontend/'));
app.use(express.json());

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
  const collection = database.collection("reviews");
  /*
  if (req.headers.Authorization != process.env.ACCESS_KEY) {
    return res.status(403).json({
      error: "Authorization key invalid."
    });
  }
  */
  const data = {
    name: req.body.name,
    address: req.body.address,
    mapsLink: req.body.mapsLink,
    city: req.body.city,
    meal: req.body.meal,
    type: req.body.type,
    price: req.body.price,
    tags: req.body.tags.split(","),
    description: req.body.description,
    overallRating: req.body.overallRating,
    overallDescription: req.body.overallRatingDescription,
    food: req.body.foodRating,
    foodDescription: req.body.foodRatingDescription,
    affordability: req.body.affordabilityRating,
    affordabilityDescription: req.body.affordabilityRatingDescription,
    service: req.body.serviceRating,
    serviceDescription: req.body.serviceRatingDescription,
    atmosphere: req.body.atmosphereRating,
    atmosphereDescription: req.body.atmosphereRatingDescription,
    createdAt: req.body.createdAt,
  }
  let returnedId;
  try {
    collection.insertOne(data)
      .then((res) => returnedId = res.insertedId);
  } catch (e) {
    return res.status(400).json({
      error: "Error saving to database.",
      stack: e
    });
  }
  return res.status(200).json({
    message: "Success",
    _id: returnedId
  });
})

app.listen(3000, (err) => {
  if (err) {
    logger.error(`Error occurred while starting: ${err}`);
  } else {
    logger.info("Server started on port 3000!");
  }
});