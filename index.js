const request = require('request');
// import config from './config.js';
const config = require('./config');

request(config.OPEN_WEATHER_API_ENDPOINT, function (error, response, body) {
  if (error) {
    console.error('error:', error);
    console.log('statusCode:', response && response.statusCode);
  } else {
    let weather = JSON.parse(body);
    if (weather.hasOwnProperty('cod')) {
      console.log(`Could not fetch the weather; error code: ${weather.cod}`);
    } else {
      let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
      console.log(message);
    }
  }
});