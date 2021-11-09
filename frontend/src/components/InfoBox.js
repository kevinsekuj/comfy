import React from "react";
import "../styles/components/InfoBox.css";

const InfoBox = ({ category, value }) => (
  <div className="infobox">
    <h5>{category}</h5>
    <p>{value}</p>
  </div>
);

export default InfoBox;
