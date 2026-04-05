const { MongoClient } = require("mongodb");

let dbConnection;

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(process.env.MONGO_URI)
      .then((client) => {
        dbConnection = client.db("tasks");

        return cb();
      })
      .catch((err) => cb(err));
  },
  getDb: () => dbConnection,
};
