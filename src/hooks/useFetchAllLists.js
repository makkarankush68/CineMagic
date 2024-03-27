import { useDispatch } from "react-redux";
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
  useEffect(() => {
    getPopularMovies();
    getTopRatedMovies();
    getTopRatedMovies();
    getUpcomingMovies();
    getTrendingMovies();
    getTrendingShows();
  }, []);
  const getPopularMovies = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      API_OPTIONS
    ).catch((err) => console.log(err.message));
    const data = await res.json().catch((err) => console.log("err"));
    dispatch(addPopularMovies(data?.results));
  };
  const getTopRatedMovies = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      API_OPTIONS
    ).catch((err) => console.log(err.message));
    const data = await res.json().catch((err) => console.log("err"));
    dispatch(addTopRatedMovies(data?.results));
  };
  const getUpcomingMovies = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      API_OPTIONS
    ).catch((err) => console.log(err.message));
    const data = await res.json().catch((err) => console.log("err"));
    dispatch(addUpcomingMovies(data?.results));
  };
  const getTrendingMovies = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/trending/movie/week?language=en-US",
      API_OPTIONS
    ).catch((err) => console.log(err.message));
    const data = await res.json().catch((err) => console.log("err"));
    dispatch(addTrendingMovies(data?.results));
  };
  const getTrendingShows = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
      API_OPTIONS
    ).catch((err) => console.log(err.message));
    const data = await res.json().catch((err) => console.log("err"));
    dispatch(addTrendingShows(data?.results));
  };
};

export default useFetchAllLists;
