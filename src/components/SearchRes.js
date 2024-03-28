import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SearchRes = () => {
  const data = useSelector((store) => store.search?.searchRes);
  const { movieNames, movieResults } = data;
  if (!movieNames) return;

  return (
    <div className="bg-black bg-opacity-60 p-4 text-white flex flex-wrap ">
      {movieNames.map((name, i) =>
        movieResults[i][0] ? (
          <MovieList key={name} title={name} movies={movieResults[i]} />
        ) : (
          <></>
        )
      )}
    </div>
  );
};

export default SearchRes;
