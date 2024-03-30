import React from "react";
import { useSelector } from "react-redux";
import VidContainer from "./VidContainer";
import Loading from "./Loading";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies) return <Loading />;

  const MainMovie = movies[Math.floor(Math.random() * 20)];
  const { title, overview, id } = MainMovie;

  return (
    <div className="relative ">
      {/* Main Bg video container */}
      <div className=" bg-black overflow-hidden max-h-screen">
        <VidContainer id={id} />
      </div>
      <div className="w-screen aspect-video absolute top-0 text-white bg-gradient-to-tr from-black pl-12 min-h-[500px] max-h-screen ">
        <div className="absolute lg:bottom-48 bottom-40">
          <h1 className="sm:text-4xl pb-2 text-lg font-semibold">{title}</h1>
          <p className="sm:text-lg text-sm lg:w-1/3 md:w-1/2 w-5/6 ">
            {overview.split(" ").splice(0, 19).join(" ")}...
          </p>
          <div className="flex w-fit py-2">
            <button className="p-2 px-6 m-1 bg-white bg-opacity-50 font-bold md:text-xl sm:text-md text-sm  rounded-md text-black z-40 hover:bg-red-600 hover:bg-opacity-70  hover:text-white duration-150">
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
