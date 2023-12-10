// src/routes/userRoutes.js
// This file is too route user experience 
const express = require('express');
const router = express.Router();
// This will help us connect to the database
const dbo = require('../db/conn');

const encryptServ = require('../api/encryptionService');
//Express middleware to check authentication
const db_helper = async function(){
  const db_connect = await dbo.getDb();
  return db_connect.collection("user");
}
// Create a user
router.route('/user/register').post(async function (req, res) {
  try{
    //encrypts password
    console.log('in register');
    let password = await encryptServ.hashPassword(req.body.password);
    let myquery = { username: req.body.username };
    // checks if username already exists
    let result =  await db_helper().findOne(myquery);
    console.log(result)
    if (result == null || result == undefined){
      let userObj = {
        username: req.body.username,
        password,
        email: req.body.email
      };
      const response = await db_helper().insertOne(userObj);
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
    const searchTerm = req.body.searchTerm;
    const updateRes = await db_helper().updateOne(
      {username: req.session.username},
      { $push: {history:{
        term: searchTerm,
        date: new Date()
      }}}
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
// Delete User History, all time or from date
router.route('/user/history').delete(async function(req, res){
  try{
    var result;
    const username = req.session.username;
    if(req.body.all == true){
      result = db_helper().updateOne({username}, {$unset: {history: ''}});
    }else{
      var [startDate, endDate] = req.body.dates;
      result = db_helper().updateOne({username}, {$unset:{
        history:{
          date: {$gte: startDate, $lte: endDate}}}})
    }
    if (result.modifiedCount > 0){
      res.status(200).json({ message: 'History Successfully Cleared'});
    }else{
      res.status(500).json({ error: 'Failed to clear history or no history to clear'});
    }
  }catch(error){
    res.status(500).json({error: error.message})
  }
})
// Get User Profile, including history
router.route('/user').get(async function (req,res){
  try{
    const username = req.session.username;
    const res = await db_helper().findOne({ username })
    res.status(200).json(res)
  }catch(error){
    res.status(500).json({ error: error.message });
  }
});
// Authenticates User on Login
router.route('/user/login').post(async function(req,res){
  try{
    const { username, password } = req.body;
    const user = await db_helper().findOne({ username });
    if (user && await encryptServ.comparePassword(password, user.password)){
      // // res.sessioncookie.user = username;
      var session = req.session;
      session.userid=user._id;
      session.username=user.username;
      console.log(session);
      res.status(200).json({message: 'Login Success'});
    }else{
      res.status(401).json({message: 'Invalid Username or Password'});
    }
  }catch(error){
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error'});
  }
});
router.route('/user/logout').post(function(req, res){
  req.session.destroy((err) => {
    if(err){
      console.log(err);
    } else{
      res.redirect('/user/login');
    }
  })
});
module.exports = router;