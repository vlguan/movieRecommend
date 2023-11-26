const express = require("express");
const fs = require('fs/promises');

const app = express();

const cors = require("cors");

require("dotenv").config();

const port = process.env.PORT || 8000;

app.use(cors());

app.use(express.json());
app.use('/api',require('./routes/users'));

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