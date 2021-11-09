const { weatherPatterns } = require("./constants");

module.exports.mapTemperatures = (temp, weatherData, time) => {
  const weather = weatherData.toLowerCase();

  if (weatherPatterns.includes(weather)) {
    if (time >= 18 || time <= 6) {
      if (temp >= 65) {
        return night("warm", weather);
      }
      return night("cold", weather);
    }

    if (temp >= 65) {
      return day("warm", weather);
    }
    return day("cold", weather);
  } else {
    if (time >= 18 || time <= 6) {
      if (temp >= 65) {
        return night("warm", "clear");
      }
      return night("cold", "clear");
    }
    if (temp >= 65) {
      return day("warm", "clear");
    }
    return day("cold", "clear");
  }
};

const night = (temp, weather) => {
  if (temp === "warm") {
    if (
      weather === "rain" ||
      weather === "drizzle" ||
      weather === "thunderstorm" ||
      weather === "clouds"
    ) {
      return [27, 18, 80, 14];
    }
    return [53, 28, 27, 18];
  }

  if (temp === "cold") {
    if (
      weather === "rain" ||
      weather === "drizzle" ||
      weather === "thunderstorm" ||
      weather === "clouds"
    ) {
      return [27, 878, 80, 9648];
    } else if (weather === "snow") {
      return [27, 878, 80, 9648];
    } else {
      return [27, 53, 80, 9648];
    }
  }
};

const day = (temp, weather) => {
  if (temp === "warm") {
    if (
      weather === "rain" ||
      weather === "drizzle" ||
      weather === "thunderstorm" ||
      weather === "clouds"
    ) {
      return [878, 37, 18, 16];
    }
    return [35, 16, 28, 12];
  }

  if (temp === "cold") {
    if (
      weather === "rain" ||
      weather === "drizzle" ||
      weather === "thunderstorm" ||
      weather === "clouds"
    ) {
      return [878, 10752, 36, 18];
    } else if (weather === "snow") {
      return [36, 10751, 18, 16];
    } else {
      return [36, 10752, 878, 99];
    }
  }
};
