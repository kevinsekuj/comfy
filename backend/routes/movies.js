const express = require("express");
const router = express.Router();
const movies = require("../controllers/movieController");

router.route("/movie/:id").get(movies.getSingleMovie);

router.route("/page/:page:id").get(movies.getMovies);

module.exports = router;
