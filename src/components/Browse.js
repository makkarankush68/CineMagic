import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import { useSelector } from "react-redux";
import useFetchAllLists from "../hooks/useFetchAllLists";
import SearchComp from "./SearchComp";

const Browse = () => {
  const showSearch = useSelector((store) => store.search.showSearch);
  // get movies data
  useNowPlayingMovies();
  useFetchAllLists();
  const user = useSelector((store) => store.user);
  return (
    <div className="w-screen overflow-hidden">
      <Header />
      {/* Main content */}
      {user && (
        <div className="flex flex-col w-full bg-black">
          {showSearch ? (
            <SearchComp />
          ) : (
            <>
              <MainContainer />
              <SecondaryContainer />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Browse;
