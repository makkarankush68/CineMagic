import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies) return <></>;
  //   console.log(title, movies);
  return (
    <div >
      <h1 className="text-2xl font-semibold py-6">{title}</h1>
      <div className="flex overflow-x-scroll p-2 ">
        <div className="flex">
          {movies.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
