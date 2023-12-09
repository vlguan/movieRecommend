const { MongoClient, ServerApiVersion } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
  }});
var _db;

module.exports = {
  connectToServer: async function (callback) {
    try {
      // console.log(await client.connect());
      _db = await client.db("register");
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      return _db;
    }catch(e){
      console.log(e);
    }
    // client.connect(function (err, db) {
    //   if(db){
    //     if (err) {
    //       console.error("Error connecting to MongoDB:", err);
    //       return callback(err);
    //     }
    //     _db = db.db('user');
    //     console.log("Successfully connected to MongoDB.");
    //     return callback(err);
    //   }
    // });
  },

  getDb: async function () {
    try {
      console.log('returning user database');
      return _db;
    } catch (error) {
      console.error("Error getting database:", error);
      throw error;
    }
  },
};
