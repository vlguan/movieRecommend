// import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { options } from '../routes/record';
require('dotenv').config();

const apiKey = process.env.API_KEY;
const BASEURL = process.env.BASEURL;

export async function movieQuery(query) {
  try {
    const encodedQuery = query.replace(/ /g, '%20');
    // query should be preencoded before url
    const url = `${BASEURL}/search/movie?query=${encodedQuery}`;
    const headers = {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    };

    const response = await axios.get(url, { headers });

    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}