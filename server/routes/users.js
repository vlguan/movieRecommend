// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const userRoutes = express.Router();
// This will help us connect to the database
const dbo = require('../db/conn');
const encryptServ = require('../api/encryptionService');
// This helps convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
// Create a user
userRoutes.route('/user/register').post(function (req, response) {
  let db_connect = dbo.getDb();
  let password = encryptServ.hashPassword(req.body.password)
  let userObj = {
    username: req.body.username,
    password,
    email: req.body.email
  };
  db_connect.collection("users").insertOne(userObj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
 });

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;