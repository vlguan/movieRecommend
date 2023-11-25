// src/routes/userRoutes.js
// This file are
const express = require('express');
const router = express.Router();
// const User = require('../models/usersModel');
// This will help us connect to the database
const dbo = require('../db/conn');
const encryptServ = require('../api/encryptionService');
// This helps convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
// Create a user
// const db_connect = dbo.getDb();
router.route('/user/register').post(async function (req, res) {
  try{
    const db_connect = await dbo.getDb();
    console.log(db_connect);
    //encrypts password
    console.log('in register');
    let password = await encryptServ.hashPassword(req.body.password);
    let myquery = { username: req.body.username };
    console.log(req);
    // checks if username already exists
    // let result =  await db_connect.collection("register").findOne(myquery);
    // if (result == null || result == undefined){
      let userObj = {
        username: req.body.username,
        password,
        email: req.body.email
      };
      console.log(userObj);
      const myColl = await db_connect.collection("users");
      const response = await myColl.insertOne(userObj);
      res.status(200).json(response)
      // }else{
      //   throw new Error('Username exists')
      // }
  }catch(error){
    console.log(error);
    res.status(500).json({ error: error.message || 'Internal Server Error'});
    }
});
  
// Push recent search to history
// userRoutes.route('/user/history').post(function (req, res){
//   try {
//     User.addSearchToHistory(username, req.body.searchTerm)
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

module.exports = router;