import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import {
  addPopularMovies,
  addTopRatedMovies,
  addTrendingMovies,
  addTrendingShows,
  addUpcomingMovies,
} from "../utils/moviesSlice";

const useFetchAllLists = () => {
  const dispatch = useDispatch();
  
  const popularMovies = useSelector((store) => store.movies.popularMovies);
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);
  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);
  const trendingMovies = useSelector((store) => store.movies.trendingMovies);
  const trendingShows = useSelector((store) => store.movies.trendingShows);

  useEffect(() => {
    if (!popularMovies) getPopularMovies();
    if (!topRatedMovies) getTopRatedMovies();
    if (!upcomingMovies) getUpcomingMovies();
    if (!trendingMovies) getTrendingMovies();
    if (!trendingShows) getTrendingShows();
  }, []);

  const getPopularMovies = async () => {
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        API_OPTIONS
      );
      const data = await res.json();
      dispatch(addPopularMovies(data?.results));
    } catch (err) {
      console.log(err.message);
    }
  };
  const getTopRatedMovies = async () => {
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        API_OPTIONS
      );
      const data = await res.json();
      dispatch(addTopRatedMovies(data?.results));
    } catch (err) {
      console.log(err.message);
    }
  };
  const getUpcomingMovies = async () => {
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        API_OPTIONS
      );
      const data = await res.json();
      dispatch(addUpcomingMovies(data?.results));
    } catch (err) {
      console.log(err.message);
    }
  };
  const getTrendingMovies = async () => {
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/trending/movie/week?language=en-US",
        API_OPTIONS
      );
      const data = await res.json();
      dispatch(addTrendingMovies(data?.results));
    } catch (err) {
      console.log(err.message);
    }
  };
  const getTrendingShows = async () => {
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
        API_OPTIONS
      );
      const data = await res.json();
      dispatch(addTrendingShows(data?.results));
    } catch (err) {
      console.log(err.message);
    }
  };
};

export default useFetchAllLists;
