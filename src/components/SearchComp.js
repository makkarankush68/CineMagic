import React, { useRef, useState } from "react";
import { geminiModel } from "../utils/initGemini";
import { API_OPTIONS, propmtToSend } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addResMovies } from "../utils/searchSlice";
import SearchRes from "./SearchRes";
import Header from "./Header";
import Loading from "./Loading";

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
    <div>
      <Header />
      <div className=" w-screen min-h-screen bg-bg-imgnt bg-fixed">
        {/* Search Bar */}
        <div className="pt-[144px] pb-10 w-screen">
          <form
            className={` box-border mx-auto w-fit flex flex-wrap gap-3`}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              ref={searchBar}
              className="rgb-border p-2 px-6 m-1 outline-none w-[40vw] min-w-[250px] mx-auto rounded-full text-white bg-gray-800 backdrop-blur-[2px] focus:shadow-lg bg-opacity-80 placeholder:text-slate-300"
              placeholder="What's on your mind?"
            />
            <button
              onClick={handleSearchClick}
              className="relative inline-flex items-center justify-center py-3 overflow-hidden transition duration-300 ease-out shadow-xl group hover:ring-1 hover:ring-purple-500  p-2 px-4 m-1 bg-purple-700 text-white mx-auto font-semibold rounded-full "
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
              <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
              <span className="relative text-white">Search🚀</span>
            </button>
          </form>
          {errMess && (
            <p className="bg-white p-1 px-2  rounded-md w-fit mx-auto text-center text-red-700">
              {errMess}
            </p>
          )}
        </div>
        {showLoading && (
          <h1 className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-45 text-white z-40">
            <Loading />
          </h1>
        )}
        <div>
          {resMess && (
            <p
              className="bg-black bg-opacity-60 pt-4 px-2 text-center text-2xl font-bold text-white"
              style={{ backdropFilter: "blur(4px)" }}
            >
              {resMess}
            </p>
          )}
          <SearchRes />
        </div>
      </div>
    </div>
  );
};

export default SearchComp;
