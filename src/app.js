import { checkTemp, genres } from "./app2.js";
import { APIKeys } from "./keys.js";

const userTime = new Date();
export default userTime;

navigator.geolocation.getCurrentPosition(position => {
	let lat = position.coords.latitude;
	let long = position.coords.longitude;
	getWeather(lat, long);
});

const getWeather = async (lat, long) => {
	let response = await fetch(
		`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${APIKeys.weatherKey}`
	);
	if (!response.ok) {
		throw new Error(
			"Please reload and allow location services so that I may fetch your local weather.",
			`${response.status}`
		);
	} else {
		let res = await response.json();
		let temp = res.main.temp;
		let weather = res.weather[0].main;
		moviesList(checkTemp(temp, weather));
	}
};

const moviesList = async (genre, page) => {
	savedFilms = genre;
	let movies = [];

	for (let id of genre) {
		let response = await fetch(
			`https://api.themoviedb.org/3/discover/movie?api_key=${APIKeys.movieKey}&language=en-US
			&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${id}`
		);
		let movie = await response.json();
		movies.push(movie);
	}
	let moviesArray = [];

	for (let el in movies) {
		for (let i = 0; i < 20; i++) {
			let film = movies[el].results[i];
			moviesArray.push({
				title: film.title,
				overview: film.overview,
				rating: film.vote_average,
				date: film.release_date,
				lang: film.original_language,
				genre: film.genre_ids,
				popularity: film.popularity,
				poster: film.poster_path,
				backdrop: film.backdrop_path,
				id: film.id,
			});
		}
	}
	let set = new Set(moviesArray.map(JSON.stringify));
	preloaded = shuffle(Array.from(set).map(JSON.parse));

	showFilms(preloaded.slice(0, 9));
	current(preloaded[0]);
};

const shuffle = arr => {
	// fisher-yates algorithm to shuffle selection
	let m = arr.length,
		t,
		i;
	while (m) {
		i = Math.floor(Math.random() * m--);
		t = arr[m];
		arr[m] = arr[i];
		arr[i] = t;
	}
	return arr;
};

const showFilms = obj => {
	const moviesDiv = document.querySelector(".list-items");

	if (updateList) {
		for (let i = 0; i < obj.length; i++) {
			let img = document.querySelectorAll("img");
			if (img[i] !== undefined) {
				img[i].setAttribute(
					"src",
					`https://image.tmdb.org/t/p/original${obj[i].poster}`
				);
			}
		}
		updateList = false;
	} else {
		let i = 0;
		for (let el of obj) {
			let li = document.createElement("li");
			let img = document.createElement("img");

			img.setAttribute(
				"src",
				`https://image.tmdb.org/t/p/original${el.poster}`
			);
			img.height = 200;
			img.width = 146;

			img.setAttribute("id", i);
			li.appendChild(img);
			moviesDiv.appendChild(li);
			i++;
		}
	}
};

const current = async cur => {
	displayElements(cur);

	let key = await getTrailer(cur.id);

	document
		.getElementById("player")
		.setAttribute("src", `https://www.youtube.com/embed/${key}`);
};

const getTrailer = async id => {
	let response = await fetch(
		`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${APIKeys.movieKey}&language=en-US`
	);
	if (!response.ok) {
		throw new Error("Error fetching film trailer.", `${response.status}`);
	} else {
		let res = await response.json();

		if (res.results === "undefined") {
			throw new Error(
				"A trailer could not be found for this film.",
				`${response.status}`
			);
		} else {
			return res.results[0].key;
		}
	}
};

const displayElements = cur => {
	// const background = document.querySelector(".right-wrapper-background");
	// const poster = document.querySelector(".poster-large");
	const title = document.getElementById("title");
	const date = document.getElementById("date");
	const rating = document.getElementById("rating");
	const lang = document.getElementById("lang");
	const genre = document.getElementById("genre");
	const overview = document.querySelector(".section .box .block > p");

	// background.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${cur.backdrop})`;
	// poster.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${cur.poster})`;

	date.textContent = `${cur.date.slice(0, 4)}`;
	lang.textContent = cur.lang.toUpperCase();
	genre.textContent = `${genres[cur.genre[0]]}, ${genres[cur.genre[1]]}`;

	if (!cur.rating || cur.rating == 0) {
		rating.textContent = "N/A";
		rating.style.color = "black";
	} else {
		rating.textContent = `${cur.rating}/10`;

		if (cur.rating > 4 && cur.rating < 7) {
			rating.style.color = "yellow";
		} else if (cur.rating <= 4 && cur.rating !== 0) {
			rating.style.color = "red";
		} else if (cur.rating === 0) {
			rating.textContent = " ";
		} else {
			rating.style.color = "green";
		}
	}

	overview.textContent = cur.overview;
	if (cur.title.length >= 45) {
		title.textContent = cur.title.slice(0, 38) + "... ";
	} else {
		title.textContent = cur.title;
	}
};

//
var select = document.querySelectorAll("img");
var preloaded = [];
var savedFilms = [];
var updateList = false;
var page = 1;
var start = 0;
var end = 8;
var prevPage = [];

// DOM interactions and event handlers

// const splashScreen = document.querySelector(".splash");

// document.addEventListener("DOMContentLoaded", e => {
// 	setTimeout(() => {
// 		splashScreen.classList.add("display-none");
// 	}, 2000);
// });

document.addEventListener("DOMContentLoaded", e => {
	setTimeout(() => {
		select = document.querySelectorAll("img");
	}, 500);
});

setTimeout(() => {
	select.forEach(select =>
		select.addEventListener("click", function () {
			current(preloaded[start + parseInt(select.getAttribute("id"))]);
		})
	);
}, 510);

// const nextButton = document.getElementById("next");

// nextButton.addEventListener("click", function () {
// 	updateList = true;
// 	if (end + 9 >= preloaded.length) {
// 		prevPage = [];
// 		prevPage.push(start, end);
// 		page += 1;
// 		start = 0;
// 		end = 9;
// 		moviesList(savedFilms, page);
// 	} else {
// 		start += 9;
// 		end += 9;
// 		showFilms(preloaded.slice(start, end));
// 	}
// 	current(preloaded[start]);
// });

// const previousButton = document.getElementById("prev");

// previousButton.addEventListener("click", function () {
// 	updateList = true;
// 	if (start === 0 && page > 1) {
// 		page -= 1;
// 		start = prevPage[0];
// 		end = prevPage[1];
// 		moviesList(savedFilms, page);
// 	} else if (start === 0) {
// 		console.log("You're already on the first page.");
// 	} else {
// 		start -= 9;
// 		end -= 9;
// 		showFilms(preloaded.slice(start, end));
// 	}
// 	current(preloaded[start]);
// });

// const resetButton = document.getElementById("reset");

// resetButton.addEventListener("click", function () {
// 	if (page === 1 && start === 0) {
// 		console.log("You've already reset the selection.");
// 	} else if (page == 1) {
// 		start = 0;
// 		end = 9;
// 		page = 1;
// 		updateList = true;
// 		showFilms(preloaded.slice(start, end));
// 	} else {
// 		start = 0;
// 		end = 9;
// 		page = 1;
// 		updateList = true;
// 		moviesList(savedFilms, page);
// 	}
// 	current(preloaded[0]);
// });
