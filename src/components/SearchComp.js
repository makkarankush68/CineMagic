import React, { useRef, useState } from "react";
import { geminiModel } from "../utils/initGemini";
import { API_OPTIONS, propmtToSend } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addResMovies } from "../utils/searchSlice";
import SearchRes from "./SearchRes";

const SearchComp = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [errMess, setErrMess] = useState("");
  const [resMess, setResMess] = useState("");
  const searchBar = useRef(null);

  const dispatch = useDispatch();
  const arrToMov = async (mov) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${mov}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const data = await res.json();
    return data.results;
  };
  const handleSearchClick = async () => {
    setShowLoading(true);
    setErrMess("");
    try {
      if (!searchBar.current.value) throw new Error("Please type something");
      const prompt = propmtToSend + searchBar.current.value;

      const result = await geminiModel.generateContent(prompt);
      const response = await result?.response;
      const text = await response.text();

      // making it an arr
      const resArr = text.split(",");
      const resPromises = resArr.map((res) => {
        return arrToMov(res);
      });
      const movieResults = await Promise.all(resPromises);
      dispatch(
        addResMovies({ movieNames: resArr, movieResults: movieResults })
      );
      // setting search bar null
      setResMess("Results for : " + searchBar.current.value);
      searchBar.current.value = "";
    } catch (error) {
      setErrMess(error.message);
    } finally {
      setShowLoading(false);
    }
  };

  return (
    <div className=" w-screen min-h-screen bg-bg-imgnt bg-fixed">
      {/* Search Bar */}
      <div className="pt-[144px] pb-10 w-screen">
        <form
          className={` box-border mx-auto w-fit flex flex-wrap gap-3`}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            ref={searchBar}
            className=" p-2 px-6 m-1 outline-none w-[40vw] min-w-[250px] mx-auto rounded-full text-white bg-gray-800 backdrop-blur-[2px] focus:shadow-lg bg-opacity-70"
            placeholder="What's on your mind?"
          />
          <button
            className="p-2 px-4 m-1 bg-purple-700 text-white mx-auto font-semibold rounded-full hover:shadow-lg"
            onClick={handleSearchClick}
          >
            Search🚀
          </button>
        </form>
        {errMess && (
          <p className="bg-white p-1 px-2  rounded-md w-fit mx-auto text-center text-red-700">
            {errMess}
          </p>
        )}
      </div>
      {showLoading && (
        <h1 className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-45 text-white">
          Loading..
        </h1>
      )}
      <div>
        {resMess && (
          <p className="bg-black bg-opacity-60 pt-4 px-2 text-center text-2xl font-bold text-white">
            {resMess}
          </p>
        )}
        <SearchRes />
      </div>
    </div>
  );
};

export default SearchComp;
