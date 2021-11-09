const fetch = require("node-fetch");
const { mapTemperatures } = require("../utils/mapTemperatures");
const { getMovies } = require("../utils/helpers");

module.exports.getWeather = async (req, res) => {
  const { lat, lon, time, page } = req.body;
  if (!lat || !lon) return;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.WEATHER_KEY}`
  );

  const weatherData = await response.json();
  const { temp } = weatherData.main;
  const weather = weatherData.weather[0].main;

  const genreIDArray = mapTemperatures(temp, weather, time);
  const movies = await getMovies(genreIDArray, page);
  res.json(movies);
};
