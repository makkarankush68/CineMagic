import React from "react";
import { IMG_CDN } from "../utils/constants";

const MovieCard = ({ movie }) => {
  const { title, poster_path } = movie;
  console.log(title, movie.id);
  return (
    <div className="w-48 p-2">
      <img alt="poster" src={IMG_CDN + poster_path} />
    </div>
  );
};

export default MovieCard;
