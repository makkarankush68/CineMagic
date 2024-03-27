import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import { useSelector } from "react-redux";
import useFetchAllLists from "../hooks/useFetchAllLists";

const Browse = () => {
  // get movies data
  useNowPlayingMovies();
  useFetchAllLists();
  const user = useSelector(store=>store.user);
  return (
    <div>
      <Header />
      {/* Main content */}
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
