import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import SkewedInfiniteScroll from "./SkewedInfiniteScrll";

const SearchRes = ({ sBar, sClick }) => {
  const data = useSelector((store) => store.search?.searchRes);
  const { movieNames, movieResults } = data;
  if (!movieNames)
    return <SkewedInfiniteScroll sClick={sClick} sBar={sBar} />;

  return (
    <div
      className="bg-black bg-opacity-60 m-2 my-0 p-4 text-white flex flex-wrap "
      style={{ backdropFilter: "blur(4px)" }}
    >
      {movieNames.map((name, i) =>
        movieResults[i][0] ? (
          <MovieList key={name} title={name} movies={movieResults[i]} />
        ) : (
          <React.Fragment key={i} />
        )
      )}
    </div>
  );
};

export default SearchRes;
