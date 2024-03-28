import React from "react";
import { IMG_CDN } from "../utils/constants";

const MovieCard = ({ movie }) => {
  const { title, poster_path } = movie;
  return (
    <div className="sm:w-48 w-36 p-2 ">
      <img className="sm:min-h-[264px] min-h-[192px]" alt={"poster of "+title} src={IMG_CDN + poster_path} />
    </div>
  );
};

export default MovieCard;
