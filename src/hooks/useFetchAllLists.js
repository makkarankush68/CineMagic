import { useDispatch, useSelector } from "react-redux";
import { fetchFromTmdb } from "../utils/constants";
import { useEffect } from "react";
import {
  addNowPlayingMovies,
  addPopularMovies,
  addTopRatedMovies,
  addTrendingMovies,
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

  useEffect(() => {
    if (!nowPlayingMovies) getNowplayingMovies();
    if (!popularMovies) getPopularMovies();
    if (!topRatedMovies) getTopRatedMovies();
    if (!upcomingMovies) getUpcomingMovies();
    if (!trendingMovies) getTrendingMovies();
  }, []);
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const getNowplayingMovies = async () => {
    const res = await fetchFromTmdb(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"
    );
    if (res) {
      const data = await res.json();
      dispatch(addNowPlayingMovies(shuffleArray(data?.results)));
    }
  };
  const getPopularMovies = async () => {
    const res = await fetchFromTmdb(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
    );
    if (res) {
      const data = await res.json();
      dispatch(addPopularMovies(shuffleArray(data?.results)));
    }
  };
  const getTopRatedMovies = async () => {
    const res = await fetchFromTmdb(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
    );
    if (res) {
      const data = await res.json();
      dispatch(addTopRatedMovies(shuffleArray(data?.results)));
    }
  };
  const getUpcomingMovies = async () => {
    const res = await fetchFromTmdb(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1"
    );
    if (res) {
      const data = await res.json();
      dispatch(addUpcomingMovies(shuffleArray(data?.results)));
    }
  };
  const getTrendingMovies = async () => {
    const res = await fetchFromTmdb(
      "https://api.themoviedb.org/3/trending/movie/week?language=en-US"
    );
    if (res) {
      const data = await res.json();
      dispatch(addTrendingMovies(shuffleArray(data?.results)));
    }
  };
};

export default useFetchAllLists;
