import React from "react";
import "../styles/components/Trailer.css";

const Trailer = ({ videoID }) => (
  <div>
    <div className="video-responsive">
      <iframe
        width="640"
        height="360"
        src={`https://www.youtube.com/embed/${videoID}`}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  </div>
);

export default Trailer;
