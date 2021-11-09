import React from "react";
import "../styles/components/Overview.css";
import { genres } from "../utils";

const Overview = ({ movie }) => {
  const genre = movie.genre.map(element => genres[element]);

  return (
    <div>
      <h3>{genre.join(", ")}</h3>
      <p>{movie.overview}</p>
    </div>
  );
};
export default Overview;
