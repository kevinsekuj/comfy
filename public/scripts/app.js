import { checkTemp, genres } from "./app2.js";

const userTime = new Date();
export default userTime;

navigator.geolocation.getCurrentPosition(position => {
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	getWeather(lat, lon);
});

const getWeather = async (lat, lon) => {
	let response = await fetch(`/weather/${lat},${lon}`);
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
		let response = await fetch(`/movies/${page},${id}`);
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
			img.width = 150;

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
	let response = await fetch(`/movie/${id}`);

	if (!response.ok) {
		throw new Error("Error fetching film trailer.", `${response.status}`);
	} else {
		let res = await response.json();
		if (!res.results) {
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
	const title = document.getElementById("title");
	const date = document.getElementById("date");
	const rating = document.getElementById("rating");
	const lang = document.getElementById("lang");
	const genre = document.getElementById("genre");
	const overview = document.querySelector(".box .box > p");

	date.textContent = `${cur.date.slice(0, 4)}`;
	lang.textContent = cur.lang.toUpperCase();

	if (genre) {
		if (cur.genre[0] && cur.genre[1]) {
			genre.textContent = `${genres[cur.genre[0]]}, ${
				genres[cur.genre[1]]
			}`;
		} else {
			genre.textContent = `${genres[cur.genre[0]]}`;
		}
	}

	if (!cur.rating || cur.rating == 0) {
		rating.textContent = "N/A";
		rating.style.color = "white";
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

let select = document.querySelectorAll("img");
let preloaded = [];
let savedFilms = [];
let updateList = false;
let page = 1;
let start = 0;
let end = 9;
let prevPage = [];
let locked = false;

const unlock = () => {
	locked = false;
};

document.addEventListener("DOMContentLoaded", e => {
	setTimeout(() => {
		select = document.querySelectorAll("img");
	}, 3000);
});

setTimeout(() => {
	select.forEach(select =>
		select.addEventListener("click", function () {
			current(preloaded[start + parseInt(select.getAttribute("id"))]);
		})
	);
}, 1110);

const nextButton = document.getElementById("next");

nextButton.addEventListener("click", function () {
	if (!locked) {
		updateList = true;
		if (end + 9 >= preloaded.length) {
			prevPage = [];
			prevPage.push(start, end);
			page += 1;
			start = 0;
			end = 9;
			moviesList(savedFilms, page);
		} else {
			start += 9;
			end += 9;
			showFilms(preloaded.slice(start, end));
		}

		current(preloaded[start]);
		locked = true;
		document.getElementById("right-column").classList.add("loading");

		setTimeout(() => {
			unlock();
		}, 500);
		setTimeout(() => {
			document.getElementById("right-column").classList.remove("loading");
		}, 400);
	}
});

const previousButton = document.getElementById("prev");

previousButton.addEventListener("click", function () {
	if (!locked) {
		updateList = true;
		if (start === 0 && page > 1) {
			page -= 1;
			start = prevPage[0];
			end = prevPage[1];
			moviesList(savedFilms, page);
		} else if (start === 0) {
			console.log("You're already on the first page.");
		} else {
			start -= 9;
			end -= 9;
			showFilms(preloaded.slice(start, end));
		}

		current(preloaded[start]);
		locked = true;
		document.getElementById("right-column").classList.add("loading");

		setTimeout(() => {
			unlock();
		}, 500);

		setTimeout(() => {
			document.getElementById("right-column").classList.remove("loading");
		}, 400);
	}
});

const resetButton = document.getElementById("reset");

resetButton.addEventListener("click", function () {
	if (page === 1 && start === 0) {
		console.log("You've already reset the selection.");
	} else if (page == 1) {
		start = 0;
		end = 9;
		page = 1;
		updateList = true;
		showFilms(preloaded.slice(start, end));
	} else {
		start = 0;
		end = 9;
		page = 1;
		updateList = true;
		moviesList(savedFilms, page);
	}
	current(preloaded[0]);
});
