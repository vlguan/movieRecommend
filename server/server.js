const express = require("express");
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session);
const fs = require('fs/promises');
const bodyParser = require('body-parser');
require("dotenv").config();
const app = express();
var store = new MongoDBStore({
  uri: process.env.ATLAS_URI,
  databaseName: "register",
  collection: "sessions"
});

//catch errors
store.on('error', function(error){
  console.log("Error when creating Store: ",error);
});
const cors = require("cors");

const port = process.env.PORT || 8000;
let corsOptions = {
  origin:'http://localhost:3000',
  credentials:true
}
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json());

app.use(
  session({
    secret: 'This is a secret',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000*60*60*24 // equals 1 day
    }
  })
);

app.use('/api',require('./routes/users'));
app.use('/api', require('./routes/movieRoutes'));
const dbo =require("./db/conn");

app.listen(port, async () => {
    // Perform a database connection when server starts
    let _db = await dbo.connectToServer(function (err) {
      if (err) console.error(err);
    });
    console.log(`Server is running on port: ${port}`);
});
module.exports = app;