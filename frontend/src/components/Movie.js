import React from "react";
import "../styles/components/Movie.css";

const Movie = ({ data }) => {
  const url = `https://image.tmdb.org/t/p/original/${data.poster}`;
  return (
    <li>
      <img src={url} alt={`${data.title}`}></img>
    </li>
  );
};
export default Movie;
