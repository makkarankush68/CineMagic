import { useEffect } from "react";
import { API_OPTIONS, fetchWithProxy } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addMainTrailerKey } from "../utils/moviesSlice";

const useTrailerVideo = () => {
  const dispatch = useDispatch();
  const id = useSelector((store) => store.movies.mainTrailerId);
  useEffect(() => {
    if (id) fetchVideo(id);
    return () => {
      dispatch(addMainTrailerKey(null));
    };
  }, [id]);
  const fetchVideo = async (id) => {
    let res = null;
    try {
      res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
        API_OPTIONS
      );
    } catch(err) {
      res = await fetchWithProxy(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
        API_OPTIONS
      );
    }
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
