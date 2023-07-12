const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB);

function getMongoDB() {
  return client.db("foodfinder");
}

module.exports = getMongoDB;