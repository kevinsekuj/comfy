import { React, useEffect, useState } from "react";
import TitleBar from "./TitleBar";
import Trailer from "./Trailer";
import "../styles/components/Video.css";
import axios from "axios";
const url = process.env.REACT_APP_SERVER_URL;

const Video = ({ movie }) => {
  const [id, setID] = useState("");

  useEffect(() => {
    const getTrailer = async () => {
      const response = await axios.get(`${url}/movies/movie/${movie.id}`);
      const { data } = response;
      setID(data);
    };
    getTrailer();
  }, []);

  return (
    <div className="left-container">
      <div className="video-container">
        <TitleBar movieData={movie} />
        <Trailer videoID={id} />
      </div>
    </div>
  );
};

export default Video;
