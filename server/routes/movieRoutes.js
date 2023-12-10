const express = require('express');
const router = express.Router();
const { movieQuery } = require('../api/tmdb');
const { locationGrab, showtimesLocation } = require('../api/location');
function ip_helper(req){
  const ipAddress = req.socket.remoteAddress;
  console.log(ipAddress)
  return ipAddress;
}
router.get('/movies', async (req, res) => {
  try {
    // console.log(req);
    const query = await req.query.query;
    // console.log(query)
    const result = await movieQuery(query);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
route.get('/showtimes', async (req, res) => {
  try{
    var location;
    const ipBool = await req.query.ipBool;
    if (ipBool){
      location = locationGrab(ip_helper(req))
    }else{
      location = req.query.location;
    }
    const result = await showtimesLocation(req.query.movies, location);
    res.status(200).json(result);
  }catch(error){
    res.status(500).json({error: 'Internal Service Error:', error});
  }
});
module.exports = router;
 