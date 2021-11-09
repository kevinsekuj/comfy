const fetch = require("node-fetch");

const shuffle = arr => {
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

module.exports.getMovies = async (genre, page) => {
  const movies = [];
  const pg = page || 1;

  for (const id of genre) {
    const response = await fetch(
      `http://localhost:${process.env.PORT}/movies/page/${pg}${id}`
    );
    const movie = await response.json();
    movies.push(movie);
  }

  const moviesArray = [];

  for (const el in movies) {
    for (let i = 0; i < 20; i++) {
      const film = movies[el].results[i];
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

  const moviesSet = new Set(moviesArray.map(JSON.stringify));
  const loadedMovies = shuffle(Array.from(moviesSet).map(JSON.parse));

  return loadedMovies;
};
