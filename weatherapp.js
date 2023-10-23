const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML and CSS)
app.use(express.static(__dirname + '/public'));

// Main page
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// Handle GET request for weather data
app.get('/weather', async function (req, res) {
  const city = req.query.city;

  try {
    const weatherData = await getWeatherData(city);
    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching weather data.' });
  }
});

async function getWeatherData(city) {
  const options = {
    method: 'GET',
    url: 'https://openweather43.p.rapidapi.com/weather',
    params: {
      q: city,
      appid: [
        'da0f9c8d90bde7e619c3ec47766a42f4',
        '72a6297990msh1b03ddabb511440p1625bajsn58ae356a60dd'
      ],
      units: 'standard'
    },
    headers: {
      'X-RapidAPI-Key': '17f16e32a3msheee47a8d6d26051p10b856jsnd',
      'X-RapidAPI-Host': 'openweather43.p.rapidapi.com',
    },
  };

  const response = await axios.request(options);
  return response.data;
}

const port = process.env.PORT || 8002;
app.listen(port, function () {
  console.log('Server running on port 8002');
});