import React from "react";
import Login from "./Login";
import Browse from "./Browse";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";

const Body = () => {
  // router
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  return (
    <div className="max-w-screen overflow-x-clip ">
      <RouterProvider router={appRouter} />
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
