import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import { useSelector } from "react-redux";
import useFetchAllLists from "../hooks/useFetchAllLists";
import Loading from "./Loading";

const Browse = () => {
  // get movies data
  useNowPlayingMovies();
  useFetchAllLists();
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const user = useSelector((store) => store.user);
  if (!movies) return <Loading />;
  return (
    <div className="w-screen overflow-hidden">
      <Header />
      {user && (
        <div className="flex flex-col w-full bg-black">
          <MainContainer />
          <SecondaryContainer />
        </div>
      )}
    </div>
  );
};

export default Browse;
