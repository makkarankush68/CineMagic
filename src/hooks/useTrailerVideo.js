import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addMainTrailerKey } from "../utils/moviesSlice";

const useTrailerVideo = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchVideo(id);
  }, [id]);
  const fetchVideo = async (id) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      API_OPTIONS
    );
    const data = await res.json();
    const results = data?.results;
    const filterVids = results.filter(
      (res) => res?.name === "Official Trailer"
    );
    const main = filterVids.length ? filterVids[0] : results[0];
    dispatch(addMainTrailerKey(main?.key));
  };
};

export default useTrailerVideo;
