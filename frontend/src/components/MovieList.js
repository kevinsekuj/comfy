import React from "react";
import Movie from "./Movie";
import "../styles/components/MovieList.css";

const MovieList = ({ movies }) => (
  <div className="right-container">
    <ul className="movie-container">
      {movies.map((movie, i) => (
        <Movie key={i} data={movie} />
      ))}
    </ul>
  </div>
);

export default MovieList;
