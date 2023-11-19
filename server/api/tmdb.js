const apiKey = process.env.API_KEY;
const BASEURL = process.env.BASEURL;

async function movieQuery(query) {
  try {
    const encodedQuery = encodeURIComponent(query);
    // query should be preencoded before appending to the URL
    const url = `${BASEURL}/search/movie?query=${encodedQuery}`;
    const headers = {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    };

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}


exports.movieQuery = movieQuery;