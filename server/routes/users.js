// src/routes/userRoutes.js
// This file are
const express = require('express');
const router = express.Router();
// This will help us connect to the database
const dbo = require('../db/conn');

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
    const db_connect = await dbo.getDb();
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
router.route('/user/history').post(authenticateUser, async function (req, res){
  try {
    const db_connect = await dbo.getDb();
    const searchTerm = req.searchTerm;
    const userCol =db_connect.collection('users');
    const userId = req.user._id
    const updateRes = await userCol.updateOne(
      {_id: userId},
      { $push: {history:searchTerm}}
      );
      if (updateRes.modifiedCount === 1) {
        res.status(200).json({ message: 'Search term added to history successfully' });
      } else {
        res.status(500).json({ error: 'Failed to add search term to history' });
      }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Authenticates User on Login
router.route('/user/login').post(async function(req,res){
  try{
    const db_connect = await dbo.getDb();
    const { username, password } = req.body;
    const userCol = db_connect.collection('users');
    const user = await userCol.findOne({ username });
    if (user && await encryptServ.comparePassword(password, user.password)){
      res.sessioncookie.user = username;
      res.status(200).json({message: 'Login Success'});
    }else{
      res.status(401).json({message: 'Invalid Username or Password'});
    }
  }catch(error){
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error'});
  }
});
router.route('/user/logout').post(async function(req, res){
  req.session.destroy((err) => {
    if(err){
      console.log(err);
    } else{
      res.redirect('/user/login');
    }
  })
});
module.exports = router;