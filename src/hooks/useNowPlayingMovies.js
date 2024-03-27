import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addNowPlayingMovies } from "../utils/moviesSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getNowplayingMovies();
  }, []);
  const getNowplayingMovies = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      API_OPTIONS
    ).catch(err=>console.log(err.message));
    const data = await res.json().catch(err=>console.log("err"));
    dispatch(addNowPlayingMovies(data?.results));
  };
};

export default useNowPlayingMovies;
