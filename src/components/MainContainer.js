import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import VidContainer from "./VidContainer";
import Loading from "./Loading";
import MainTitle from "./MainTitle";
import { addMainTrailerId, addMainTrailerInfo } from "../utils/moviesSlice";

const MainContainer = () => {
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const id = useSelector((store) => store.movies.mainTrailerId);
  useEffect(() => {
    if (movies) {
      const MainMovie = movies[Math.floor(Math.random() * 18)];
      dispatch(addMainTrailerId(MainMovie.id));
      dispatch(
        addMainTrailerInfo({
          mId: MainMovie.id,
          title: MainMovie.title,
          overview: MainMovie.overview,
        })
      );
    }
    return () => {
      dispatch(addMainTrailerId(null));
      dispatch(
        addMainTrailerInfo({
          mId: null,
          title: null,
          overview: null,
        })
      );
    };
  }, []);
  if (!id) return <Loading />;
  return (
    <div className="relative">
      <div className=" bg-black overflow-hidden min-h-[500px] max-h-screen">
        <VidContainer />
      </div>
      <MainTitle />
    </div>
  );
};

export default MainContainer;
