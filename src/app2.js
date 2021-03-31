import userTime from "./app.js";
export { checkTemp, genres };

const genres = {
	35: "Comedy",
	16: "Animation",
	10479: "Music",
	10749: "Romance",
	12: "Adventure",
	37: "Western",
	53: "Thriller",
	28: "Action",
	27: "Horror",
	18: "Drama",
	14: "Fantasy",
	36: "History",
	10752: "War",
	878: "SciFi",
	99: "Documentary",
	80: "Crime",
	9648: "Mystery",
	10751: "Family",
};

const checkTemp = (temp, weatherData) => {
	const weatherPatterns = [
		"clouds",
		"thunderstorm",
		"drizzle",
		"rain",
		"snow",
		"clear",
	];
	let weather = weatherData.toLowerCase();

	if (weatherPatterns.includes(weather)) {
		if (userTime.getHours() >= 18 || userTime.getHours() <= 6) {
			if (temp >= 65) {
				return night("warm", weather);
			} else {
				return night("cold", weather);
			}
		} else {
			if (temp >= 65) {
				return day("warm", weather);
			} else {
				return day("cold", weather);
			}
		}
	} else {
		if (userTime.getHours() >= 18 || userTime.getHours() <= 6) {
			if (temp >= 65) {
				night("warm", "clear");
			} else {
				return night("cold", "clear");
			}
		} else {
			if (temp >= 65) {
				return day("warm", "clear");
			} else {
				return day("cold", "clear");
			}
		}
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
		} else {
			return [53, 28, 27, 18];
		}
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
		} else {
			return [35, 16, 28, 12];
		}
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
