import React from "react";
import { useSelector } from "react-redux";
import VidContainer from "./VidContainer";
import Loading from "./Loading";
import MainTitle from "./MainTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies) return <Loading />;

  const MainMovie = movies[Math.floor(Math.random() * 20)];
  const { id } = MainMovie;

  return (
    <div className="relative ">
      <div className=" bg-black overflow-hidden max-h-screen">
        <VidContainer id={id} />
      </div>
      <MainTitle id={id} />
    </div>
  );
};

export default MainContainer;
