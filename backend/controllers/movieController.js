const fetch = require("node-fetch");

module.exports.getSingleMovie = async (req, res) => {
  const { id } = req.params;
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.MOVIE_KEY}&language=en-US`
  );

  const movie = await response.json();
  const embedID = movie.results[0].key;
  res.json(embedID);
};

module.exports.getMovies = async (req, res) => {
  const { page, id } = req.params;
  const response =
    await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIE_KEY}&language=en-US
      &sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${id}`);

  const movies = await response.json();
  res.json(movies);
};
