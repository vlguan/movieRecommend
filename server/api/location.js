require('dotenv').config( { path: ".env"});
const { getJson } = require("serpapi");
async function locationGrab(ip){
    const url = `${process.env.IPAPI_BASEURL}${ip}/city/`;
    const headers = {
        accept: 'application/json'
    };
    const location = fetch(url, {options: 'GET', headers});
    return location;
}
async function showtimesLocation(movie,location){
    getJson({
        q: movie,
        location: location,
        hl: 'en',
        gl: 'us',
        api_key: process.env.SHOWTIME_API_KEY
    }, (json) =>{
        return json["showtimes"];
    });
}
module.exports = { locationGrab, showtimesLocation };