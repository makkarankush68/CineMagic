import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addMainTrailerInfo } from "../utils/moviesSlice";

const useTrailerDetails = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchDetails(id);
  }, [id]);
  const fetchDetails = async (id) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US?video=true`,
      API_OPTIONS
    );
    const data = await res.json();
    dispatch(
      addMainTrailerInfo({
        mId: data.id,
        title: data.title,
        overview: data.overview,
      })
    );
  };
};

export default useTrailerDetails;
