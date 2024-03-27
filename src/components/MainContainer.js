import React from "react";
import { useSelector } from "react-redux";
import VidContainer from "./VidContainer";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies) return <></>;

  const MainMovie = movies[Math.floor(Math.random() * 20)];
  const { title, overview, id } = MainMovie;

  return (
    <div className="relative ">
      {/* Main Bg video container */}
      <div className=" bg-black overflow-hidden max-h-screen">
        <VidContainer id={id} />
      </div>
      <div className="w-screen aspect-video absolute top-[0%] text-white bg-gradient-to-tr from-black md:pt-[18%] sm:pt-[25%] xs:pt-[40%] pt-[52%] pl-12 min-h-[500px] max-h-screen ">
        <h1 className="sm:text-4xl text-lg font-bold w-3/4">{title}</h1>
        <p className="sm:text-lg text-sm lg:w-1/3 md:w-1/2 w-5/6 " >
          {overview.split(" ").splice(0, 20).join(" ")}...
        </p>
        <div className="flex w-fit py-2">
          <button className="p-2 px-6 m-1 bg-white font-bold md:text-xl sm:text-md text-sm rounded-md hover:shadow-md shadow-white text-black">
            Play
          </button>
          <button className="p-2 px-6 m-1 bg-white bg-opacity-40 font-bold md:text-xl sm:text-md text-sm  rounded-md hover:shadow-lg text-black">
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
