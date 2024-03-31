import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";
import Loading from "./Loading";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  if (!movies) return <Loading />;
  return movies.trendingMovies ? (
    <div className="p-3 sm:p-8  lg:-mt-64 sm:-mt-56 -mt-48 text-white md:translate-y-6 translate-y-8  bg-gradient-to-t from-black">
      <MovieList title="Now Playing" movies={movies.nowPlayingMovies} />
      <MovieList title="Trending Movies" movies={movies.trendingMovies} />
      <MovieList title="Top Rated Movies" movies={movies.topRatedMovies} />
      <MovieList title="Popular Movies" movies={movies.popularMovies} />
      <MovieList title="Upcoming Movies" movies={movies.upcomingMovies} />
    </div>
  ) : (
    <Loading />
  );
};

export default SecondaryContainer;
