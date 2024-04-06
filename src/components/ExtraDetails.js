import React from "react";
import CastComp from "./CastComp";

const movDetails = ({ movie, cast }) => {
  return (
    <div className="relative p-6 bg-black bg-opacity-35 ">
      {movie.tagline && (
        <h1 className="font-bold text-2xl">"{movie.tagline}"</h1>
      )}
      <div className="flex flex-wrap justify-evenly items-center p-3">
        <div className="flex flex-col">
          <span className="p-1 m-1 px-2 border border-slate-300 bg-black bg-opacity-45 rounded-full flex justify-center gap-4">
            <span className="font-semibold">{movie.status} : </span>
            <span className="font-bold">{movie.release_date} </span>
          </span>
          <span className="p-1 m-1 px-2 border border-slate-300 bg-black bg-opacity-45 rounded-full flex justify-center gap-4">
            <span className="font-semibold">Runtime : </span>
            <span className="font-bold"> {movie.runtime} MINS </span>
          </span>
          <span className="flex flex-wrap justify-around">
            {movie.genres.map((g) => (
              <span
                key={g.id}
                className="p-1 m-1 px-2 border border-slate-300 bg-black bg-opacity-45 rounded-full cursor-pointer hover:scale-110 duration-200"
              >
                {g.name}
              </span>
            ))}
          </span>
          <span className="p-1 m-1 px-2 border border-slate-300 bg-black bg-opacity-45 rounded-full flex justify-center gap-4">
            <span className="font-semibold">Rating : </span>
            <span className="font-bold">
              {movie.vote_average.toFixed(1)} stars
            </span>
          </span>
          <span className="flex flex-wrap justify-around">
            {movie.spoken_languages.map((sl) => (
              <span
                key={sl.name}
                className="p-1 m-1 px-2 border border-slate-300 bg-black bg-opacity-45 rounded-full cursor-default"
              >
                {sl.name}
              </span>
            ))}
          </span>
          <span className="flex flex-wrap justify-around">
            {movie.imdb_id && (
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://www.imdb.com/title/${movie.imdb_id}`}
              >
                <button className="px-2 p-1 font-semibold text-black bg-amber-400 rounded-md m-1  hover:scale-105 duration-150">
                  IMBD ↗️
                </button>
              </a>
            )}
            {movie.homepage && (
              <a target="_blank" rel="noreferrer" href={`${movie.homepage}`}>
                <button className="px-2 p-1 font-semibold text-white bg-gray-700 rounded-md m-1 hover:scale-105 duration-150">
                  Official Page ↗️
                </button>
              </a>
            )}
          </span>
        </div>
        <div>
          <CastComp cast={cast} />
        </div>
      </div>
    </div>
  );
};

export default movDetails;
