import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Loading from "./Loading";
const MovieDetails = lazy(() => import("./MovieDetails"));
const SearchComp = lazy(() => import("./SearchComp"));
const Login = lazy(() => import("./Login"));
const Browse = lazy(() => import("./Browse"));

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<Loading/>}>
          <Login />,
        </Suspense>
      ),
    },
    {
      path: "/browse",
      element: (
        <Suspense fallback={<Loading/>}>
          <Browse />,
        </Suspense>
      ),
    },
    {
      path: "/movie",
      element: (
        <Suspense fallback={<Loading/>}>
          <MovieDetails />,
        </Suspense>
      ),
    },
    {
      path: "/genie",
      element: (
        <Suspense fallback={<Loading/>}>
          <SearchComp />,
        </Suspense>
      ),
    },
  ]);

  return (
    <div className="max-w-screen overflow-x-hidden bg-black">
      <div className="max-w-screen min-h-screen">
        <RouterProvider router={appRouter} />
      </div>
      <footer className="w-screen p-4 text-center bg-black text-white">
        Made with 💕 by{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/makkarankush68"
          className="underline"
        >
          @makkarankush68
        </a>
      </footer>
    </div>
  );
};

export default Body;
