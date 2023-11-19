const express = require("express");
const fs = require('fs/promises');

const app = express();

const cors = require("cors");

require("dotenv").config({ path: "./config.env"});

const port = process.env.PORT || 5000;

app.unsubscribe(cors());

app.use(express.json());

app.use(require("./routes/record"));

const dbo =require("./db/conn");

const movieQuery = require("./api/tmdb");
app.listen(port, () => {
    // Perform a database connection when server starts
    dbo.connectToServer(function (err) {
      if (err) console.error(err);
    
    });
    console.log(`Server is running on port: ${port}`);
});