// src/routes/userRoutes.js
// This file are
const express = require('express');
const router = express.Router();
// This will help us connect to the database
const dbo = require('../db/conn');
const db_connect = dbo.getDb();
const encryptServ = require('../api/encryptionService');
//Express middleware to check authentication
const authenticateUser = async (req, res, next) => {
  const userId =req.session.userId;
  if(!userId){
    return res.status(401).json({ message: 'Unauthorized'});
  }
  const userCol = db_connect.collection('users');
  try {
    const user = await userCol.findOne({ _id: userId });
    if(!user){
      return res.status(401).json({ message: 'Unauthorized'});
    }
    req.user = user;
    next();
  }catch (error){
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
// Create a user
router.route('/user/register').post(async function (req, res) {
  try{
    //encrypts password
    console.log('in register');
    let password = await encryptServ.hashPassword(req.body.password);
    let myquery = { username: req.body.username };
    // checks if username already exists
    let result =  await db_connect.collection("users").findOne(myquery);
    console.log(result)
    if (result == null || result == undefined){
      let userObj = {
        username: req.body.username,
        password,
        email: req.body.email
      };
      const myColl = await db_connect.collection("users");
      const response = await myColl.insertOne(userObj);
      res.status(200).json(response)
    }else{
        throw new Error('Username exists')
    }
  }catch(error){
    console.log(error);
    res.status(500).json({ error: error.message || 'Internal Server Error'});
    }
});
// Push recent search to history
router.route('/user/history').post(async function (req, res){
  try {
    User.addSearchToHistory(username, req.body.searchTerm)
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;