import React from "react";
import { IMG_CDN } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { title, poster_path } = movie;
  const navigate = useNavigate();
  if (!movie) return;
  return (
    <div
      onClick={() => navigate("/movie?id=" + movie.id)}
      className="sm:w-48 w-36 p-2 "
    >
      <img
        className="sm:min-h-[264px] min-h-[192px]"
        alt={title}
        src={IMG_CDN + poster_path}
      />
    </div>
  );
};

export default MovieCard;
