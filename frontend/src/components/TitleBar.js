import React from "react";
import InfoBox from "./InfoBox";
import "../styles/components/TitleBar.css";

const TitleBar = ({ movieData }) => {
  const { title, date, rating, lang } = movieData;
  return (
    <div className="titlebar">
      <InfoBox category={"TITLE"} value={title} />
      <InfoBox category={"YEAR"} value={date.slice(0, 4)} />
      <InfoBox category={"RATING"} value={`${rating}`} />
      <InfoBox category={"LANGUAGE"} value={lang.toUpperCase()} />
    </div>
  );
};

export default TitleBar;
