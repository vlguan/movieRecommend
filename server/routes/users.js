// src/routes/userRoutes.js
// This file are
const express = require('express');
const router = express.Router();
const User = require('../models/usersModel');
const userRoutes = express.Router();
// This will help us connect to the database
const dbo = require('../db/conn');
const encryptServ = require('../api/encryptionService');
// This helps convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
// Create a user
userRoutes.route('/user/register').post(async function (req, response) {
  try{
    //encrypts password
  let password = encryptServ.hashPassword(req.body.password)
  let myquery = {username: ObjectId(req.body.username)}
  // checks if username already exists
  let result = User.findOne(myquery);
  if (result == null || result == undefined){
    let userObj = {
      username: req.body.username,
      password,
      email: req.body.email
    };
    const response = await User.saveUser(userObj);
    res.status(200).json(response)
    }else{
      throw new Error('Username exists')
    }
  }catch(error){
    res.status(500).json({ error: error.message });
    }
  });
  
// Push recent search to history
userRoutes.route('/user/history').post(function (req, res){
  try {
    User.addSearchToHistory(username, req.body.searchTerm)
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;