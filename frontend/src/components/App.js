import React, { useState, useEffect } from "react";

import Video from "./Video";
import MovieList from "./MovieList";
import Overview from "./Overview";
import ButtonGroup from "./ButtonGroup";
import "../styles/components/App.css";

import { getCoordinates } from "../utils";
import axios from "axios";
const url = process.env.REACT_APP_SERVER_URL;

const App = () => {
  const [movieList, setMovieList] = useState([]);
  const [location, setLocation] = useState({
    lat: 0,
    lon: 0,
    time: 0,
  });

  const [page, setPage] = useState({
    start: 0,
    end: 9,
    page: 1,
    selected: 0,
  });

  useEffect(() => {
    const getCoords = async () => {
      const res = await getCoordinates();
      setLocation({
        lat: res.lat,
        lon: res.lon,
        time: new Date().getHours(),
      });
    };

    getCoords();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.post(`${url}/weather`, {
        lat: location.lat,
        lon: location.lon,
        time: location.time,
        page: page.page,
      });

      setMovieList(res.data);
    };

    fetchData();
  }, [location, page.page]);

  const currentMovie = movieList[page.selected];

  const handleClickNext = () => {
    if (page.end + 9 > movieList.length) {
      setPage({
        start: 0,
        end: 9,
        page: page.page + 1,
        selected: 0,
      });
    } else {
      setPage({
        ...page,
        start: page.start + 9,
        end: page.end + 9,
        selected: page.start + 9,
      });
    }
  };

  const handleClickBack = () => {
    if (page.page === 1 && page.start === 0) return;

    if (page.start - 9 < 0) {
      setPage({
        start: movieList.length - 9,
        end: movieList.length,
        page: page.page - 1,
        selected: movieList.length - 9,
      });
    } else {
      setPage({
        ...page,
        start: page.start - 9,
        end: page.end - 9,
        selected: page.start - 9,
      });
    }
  };

  const handleClickReset = () => {
    if (page.page === 1 && page.start === 0) return;
    setPage({
      start: 0,
      end: 0,
      page: 1,
      selected: 0,
    });
  };

  if (movieList.length) {
    return (
      <div className="main">
        <div className="upper-container">
          <Video movie={currentMovie} />
          <MovieList movies={movieList.slice(page.start, page.end)} />
        </div>
        <div className="lower-container">
          <div className="overview">
            <Overview movie={currentMovie} />
          </div>
          <ButtonGroup
            funcs={{ handleClickNext, handleClickBack, handleClickReset }}
          />
        </div>
      </div>
    );
  }
  return <></>;
};

export default App;
