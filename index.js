if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}
const express = require("express");
const app = express();
const path = require("path");
const fetch = require("node-fetch");
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

// used sendFile since no templating engine to be parsed
app.get("/", (req, res) => {
	res.sendFile(__dirname, "index.html");
});

app.get("/weather/:latlon", async (req, res) => {
	const [lat, lon] = req.params.latlon.split(",");
	const response = await fetch(
		`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.WEATHER_KEY}`
	);
	const jsonData = await response.json();
	res.json(jsonData);
});

app.get("/movies/:pageid", async (req, res) => {
	let [page, id] = req.params.pageid.split(",");
	if (!page) {
		page = 0;
	}
	const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIE_KEY}&language=en-US
	&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${id}`);

	const jsonData = await response.json();
	res.json(jsonData);
});

app.get("/movie/:id", async (req, res) => {
	const { id } = req.params;
	const response = await fetch(
		`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.MOVIE_KEY}&language=en-US`
	);
	const jsonData = await response.json();
	res.json(jsonData);
});

app.get("*", (req, res) => {
	res.redirect("/");
});
