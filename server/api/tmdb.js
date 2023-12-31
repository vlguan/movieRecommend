require('dotenv').config( { path: ".env"})
const apiKey = process.env.API_KEY;
const BASEURL = process.env.BASEURL;

async function movieQuery(query) {
  try {
    const encodedQuery = encodeURIComponent(query);
    // query should be preencoded before appending to the URL
    const url = `${BASEURL}search/movie?query=${encodedQuery}`;
    const headers = {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    };

    const response = await fetch(url, { options: 'GET', headers });
    const data = await response.json();
    // console.log(response);
    if (response.ok == false){
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return data;
  } catch (error) {
    console.log("error", error);
    throw new Error( `${error.message}`);
  }
}
async function movieDetail(query){
  try{
    const url = `${BASEURL}movie/${query}`;
    const headers = {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    }
    const response = await fetch(url, { options: 'GET', headers });
    const data = await response.json()
    let myobj = {
      movie_id: query,
      title: data.original_title,
      genres: data.genres,
      homepage: data.homepage,
      releaseDate: data.release_date,
      summary: data.overview,
    };
    return myobj;
  }catch(error){
    console.log('error', error);
    throw new Error(`${error.message}`);
  }
}
module.exports = { movieQuery, movieDetail };