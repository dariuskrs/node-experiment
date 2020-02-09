const request = require('request');
const config = require('./config');

request(config.WEATHER_API_ENDPOINT, function (error, response, body) {
  if (error) {
    console.error('error:', error);
    console.log('statusCode:', response && response.statusCode);
  } else {
    let weatherData = JSON.parse(body);
    if (weatherData.hasOwnProperty('success') && weatherData.success === false) {
      console.log(`Could not fetch the weather; error code: ${weatherData.error.code}`);
    } else {
      let message = `Place: ${weatherData.location.name}; Conditions: ${weatherData.current.weather_descriptions.join(', ')}; temperature: ${weatherData.current.temperature} C`;
      console.log(message);
    }
  }
});