import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ title, year, poster, imdbID }) => {
  return (
    <div>
      <img src={poster !== "N/A" ? poster : "placeholder.jpg"} alt={title} />
      <h3>{title}</h3>
      <p>{year}</p>
      <Link to={`/movie/${imdbID}`}>More Details</Link>
    </div>
  );
};

export default MovieCard;
