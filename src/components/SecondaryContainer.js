import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    movies.nowPlayingMovies && (
      <div className="p-8 lg:-mt-64 sm:-mt-56 -mt-48 text-white md:translate-y-6 translate-y-8  bg-gradient-to-t from-black">
        <MovieList title="Now Playing" movies={movies.nowPlayingMovies} />
        <MovieList title="Popular Movies" movies={movies.popularMovies} />
        <MovieList title="Trending Shows" movies={movies.trendingShows} />
        <MovieList title="Top Rated Movies" movies={movies.topRatedMovies} />
        <MovieList title="Trending Movies" movies={movies.trendingMovies} />
        <MovieList title="Upcoming Movies" movies={movies.upcomingMovies} />
      </div>
    )
  );
};

export default SecondaryContainer;
