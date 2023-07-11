const { MongoClient } = require("mongodb");

class MongoDB {
    constructor() {
      this.dbClient = null;
      this.db = null;
    }

    static async connectDatabase() {
      this.dbClient = await MongoClient.connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      this.db = this.dbClient.db();
    }
}

module.exports = MongoDB;