import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import {
  addNowPlayingMovies,
  addPopularMovies,
  addTopRatedMovies,
  addTrendingMovies,
  // addTrendingShows,
  addUpcomingMovies,
} from "../utils/moviesSlice";

const useFetchAllLists = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );
  const popularMovies = useSelector((store) => store.movies.popularMovies);
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);
  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);
  const trendingMovies = useSelector((store) => store.movies.trendingMovies);
  // const trendingShows = useSelector((store) => store.movies.trendingShows);

  useEffect(() => {
    if (!nowPlayingMovies) getNowplayingMovies();
    if (!popularMovies) getPopularMovies();
    if (!topRatedMovies) getTopRatedMovies();
    if (!upcomingMovies) getUpcomingMovies();
    if (!trendingMovies) getTrendingMovies();
    // if (!trendingShows) getTrendingShows();
  }, []);
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const getNowplayingMovies = async () => {
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        API_OPTIONS
      );
      const data = await res.json();
      dispatch(addNowPlayingMovies(shuffleArray(data?.results)));
    } catch (err) {
      console.log(err.message);
    }
  };
  const getPopularMovies = async () => {
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        API_OPTIONS
      );
      const data = await res.json();
      dispatch(addPopularMovies(shuffleArray(data?.results)));
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
      dispatch(addTopRatedMovies(shuffleArray(data?.results)));
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
      dispatch(addUpcomingMovies(shuffleArray(data?.results)));
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
      dispatch(addTrendingMovies(shuffleArray(data?.results)));
    } catch (err) {
      console.log(err.message);
    }
  };
  // const getTrendingShows = async () => {
  //   try {
  //     const res = await fetch(
  //       "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
  //       API_OPTIONS
  //     );
  //     const data = await res.json();
  //     dispatch(addTrendingShows(data?.results));
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };
};

export default useFetchAllLists;
