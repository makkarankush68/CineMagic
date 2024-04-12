import React, { lazy } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import useFetchAllLists from "../hooks/useFetchAllLists";
import Loading from "./Loading";
import { Suspense } from "react";
const MainContainer = lazy(() => import("./MainContainer"));
const SecondaryContainer = lazy(() => import("./SecondaryContainer"));
const Browse = () => {
  // get movies data
  useFetchAllLists();
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const user = useSelector((store) => store.user);
  if (!movies) return <Loading />;
  return (
    <div className="w-screen overflow-hidden">
      <Header />
      {user && (
        <div className="flex flex-col w-full bg-black">
          <Suspense fallback={<Loading />}>
            <MainContainer />
            <SecondaryContainer />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default Browse;
