const express = require('express');
const weatherData = require('./data/weather.json');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
    res.send('Server is up and running!');
  });

// Forecast class definition
class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

// Route for /weather
app.get('/weather', (req, res) => {
  const { lat, lon, searchQuery } = req.query;

  const cityData = weatherData.find(city => city.lat === lat && city.lon === lon && city.city_name.toLowerCase() === searchQuery.toLowerCase());

  if (!cityData) {
    res.status(404).send('City not found');
    return;
  }

  const forecasts = cityData.data.map(d => new Forecast(d.valid_date, `Low of ${d.low_temp}, high of ${d.high_temp} with ${d.weather.description}`));
  res.json(forecasts);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
