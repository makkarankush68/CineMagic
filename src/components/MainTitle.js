import React from "react";
import { useNavigate } from "react-router-dom";
import useTrailerDetails from "../hooks/useTrailerDetails";
import { useSelector } from "react-redux";

const MainTitle = ({ id }) => {
  const navigate = useNavigate();
  useTrailerDetails(id);
  const { mId, title, overview } = useSelector(
    (store) => store.movies.mainTrailerInfo
  );
  if (!overview || !title) return;
  return (
    <div>
      {" "}
      <div className="w-screen aspect-video absolute top-0 text-white bg-gradient-to-tr from-black pl-12 min-h-[500px] max-h-screen ">
        <div className="absolute lg:bottom-48 bottom-40">
          <h1 className="sm:text-4xl pb-2 text-lg font-semibold">{title}</h1>
          <p className="sm:text-lg text-sm lg:w-1/2 md:w-1/2 xs:w-3/4 w-5/6 ">
            {overview.split(" ").splice(0, 19).join(" ")}...
          </p>
          <div className="flex w-fit py-2">
            <button
              onClick={() => navigate("/movie?id=" + mId)}
              className="p-2 px-6 m-1 bg-white bg-opacity-50 font-bold md:text-xl sm:text-md text-sm  rounded-md text-black z-40 hover:bg-red-600 hover:bg-opacity-70  hover:text-white duration-150"
            >
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTitle;
