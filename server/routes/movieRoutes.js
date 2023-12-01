const express = require('express');
const router = express.Router();
const { movieQuery } = require('../api/tmdb');

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

module.exports = router;
