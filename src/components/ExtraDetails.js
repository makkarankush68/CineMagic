import React from "react";
import CastComp from "./CastComp";

const ExtraDetails = ({ movie, cast }) => {
  return (
    <div className="relative p-6 bg-black bg-opacity-35">
      {movie.tagline && (
        <h1 className="font-bold text-2xl">"{movie.tagline}"</h1>
      )}
      <div className="flex flex-wrap justify-evenly items-center p-3 lg:text-[16px]">
        <div className="flex flex-col">
          <DetailItem label={`${movie.status} :`} value={movie.release_date} />
          <DetailItem label="Runtime :" value={`${movie.runtime} MINS`} />
          <div className="flex flex-wrap justify-around">
            {movie.genres.map((g) => (
              <span
                key={g.id}
                className="p-1 m-1 px-2 border border-slate-300 bg-black bg-opacity-45 rounded-full cursor-pointer hover:scale-110 duration-200"
              >
                {g.name}
              </span>
            ))}
          </div>
          <DetailItem
            label="Rating :"
            value={`${movie.vote_average.toFixed(1)} stars`}
          />
          <div className="flex flex-wrap justify-around">
            {movie.spoken_languages.map((sl) => (
              <span
                key={sl.name}
                className="p-1 m-1 px-2 border border-slate-300 bg-black bg-opacity-45 rounded-full cursor-default"
              >
                {sl.name}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap justify-around">
            {movie.imdb_id && (
              <ExternalLinkButton
                href={`https://www.imdb.com/title/${movie.imdb_id}`}
                label="IMBD ↗️"
                className="bg-amber-400"
              />
            )}
            {movie.homepage && (
              <ExternalLinkButton
                href={movie.homepage}
                label="Official Page ↗️"
                className="bg-gray-700 text-white"
              />
            )}
          </div>
        </div>
        <CastComp cast={cast} />
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <span className="p-1 m-1 px-2 border border-slate-300 bg-black bg-opacity-45 rounded-full flex justify-center gap-4">
    <span className="font-semibold">{label}</span>
    <span className="font-bold">{value}</span>
  </span>
);

const ExternalLinkButton = ({ href, label, className }) => (
  <a href={href} target="_blank" rel="noreferrer">
    <button
      className={`px-2 p-1 font-semibold rounded-md m-1 hover:scale-105 duration-150 ${className}`}
    >
      {label}
    </button>
  </a>
);

export default ExtraDetails;
