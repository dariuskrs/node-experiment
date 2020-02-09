const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const config = require('./config');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render('index');
})

app.post('/', function (req, res) {
    let city = req.body.city;
    let apiUrl = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=${city}&units=m`;
    request(apiUrl, function (err, response, body) {
        if(err){
          res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
          let weatherData = JSON.parse(body);
          if(weatherData.success == false){
            res.render('index', {weather: null, error: 'Error, please try again'});
          } else {
            let weatherText = `Place: ${weatherData.location.name}; Conditions: ${weatherData.current.weather_descriptions.join(', ')}; temperature: ${weatherData.current.temperature} C`;
            res.render('index', {weather: weatherText, error: null});
          }
        }
      });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})