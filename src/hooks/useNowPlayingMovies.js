import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addNowPlayingMovies } from "../utils/moviesSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );

  useEffect(() => {
    if (!nowPlayingMovies) getNowplayingMovies();
  }, []);

  const getNowplayingMovies = async () => {
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        API_OPTIONS
      );
      const data = await res.json().catch((err) => console.log("err"));
      dispatch(addNowPlayingMovies(data?.results));
    } catch (err) {
      console.log(err.message);
    }
  };
};

export default useNowPlayingMovies;
