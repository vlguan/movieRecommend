const express = require("express");
const session = require("express-session");
const fs = require('fs/promises');
const bodyParser = require('body-parser');
const app = express();

const cors = require("cors");

require("dotenv").config();

const port = process.env.PORT || 8000;

app.use(cors());
app.use(
  session({
    cookieName:'sessioncookie',
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);
app.unsubscribe(bodyParser.urlencoded({ extended: true}));
app.use(express.json());
app.use('/api',require('./routes/users'));
app.use('/api', require('./routes/movieRoutes'));

const dbo =require("./db/conn");

const movieQuery = require("./api/tmdb");
app.listen(port, async () => {
    // Perform a database connection when server starts
    await dbo.connectToServer(function (err) {
      if (err) console.error(err);
    
    });
    console.log(`Server is running on port: ${port}`);
});
module.exports = app;