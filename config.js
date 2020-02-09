const argv = require('yargs').argv;
require('dotenv').config();

const DEFAULT_CITY = 'Offenburg'

let city = argv.c || DEFAULT_CITY;

module.exports = {
    WEATHER_API_ENDPOINT: `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=${city}&units=m`,
    DEFAULT_CITY
};