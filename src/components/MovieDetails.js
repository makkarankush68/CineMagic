import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import { IMG_CDN, fetchFromTmdb } from "../utils/constants";
import Header from "./Header";
import VidContainer from "./VidContainer";
import Loading from "./Loading";
import ExtraDetails from "./ExtraDetails";
import MovVids from "./MovVids";
import { useDispatch } from "react-redux";
import { addMainTrailerId } from "../utils/moviesSlice";

const MovieDetails = () => {
  const dispatch = useDispatch();
  const [movie, setMovie] = useState("");
  const [vids, setVids] = useState("");
  const [cast, setCast] = useState("");
  const [params] = useSearchParams();
  const [id] = useState(params.get("id"));

  useEffect(() => {
    const fetchData = async () => {
      if (!movie) {
        const movieRes = await fetchFromTmdb(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US?video=true`
        );
        const movieData = await movieRes.json();
        setMovie(movieData);
        dispatch(addMainTrailerId(movieData.id));
      }

      if (!vids) {
        const vidsRes = await fetchFromTmdb(
          `https://api.themoviedb.org/3/movie/${id}/videos`
        );
        const vidsData = await vidsRes.json();
        setVids(vidsData);
      }

      if (!cast) {
        const castRes = await fetchFromTmdb(
          `https://api.themoviedb.org/3/movie/${id}/credits`
        );
        const castData = await castRes.json();
        setCast(castData);
      }
    };
    fetchData();
    return () => {
      dispatch(addMainTrailerId(null));
    };
  }, []);

  if (!movie || !cast || !vids) return <Loading />;

  return (
    <Suspense fallback={<Loading />}>
      <div>
        <Header />
        <div className="">
          <div className="overflow-hidden">
            <div className="xs:scale-100 scale-125 min-h-[500px] max-h-[80vh] overflow-hidden">
              <VidContainer />
            </div>
            <div className="w-screen max-h-[80vh]  aspect-video absolute top-0 text-white bg-gradient-to-t from-black  min-h-[500px] overflow-hidden"></div>
          </div>
          <div className=" w-screen text-white bg-black ">
            <div className="-translate-y-36 ">
              <div className="relative w-screen flex flex-wrap-reverse justify-evenly items-center bg-gradient-to-t from-black ">
                <div className="p-3 m-1 w-1/2 max-w-[600px] min-w-[250px] text-center">
                  <h1 className="md:text-4xl pb-2 text-3xl font-semibold ">
                    {movie.title}
                  </h1>
                  <p className="sm:text-lg text-sm max-h-[170px] overflow-scroll text-justify">
                    {movie.overview}
                  </p>
                </div>
                <img
                  alt="poster"
                  src={IMG_CDN + movie.poster_path}
                  className="sm:mr-12 sm:h-72 h-56 p-3"
                />
              </div>
              <div className="relative bg-black text-center overflow-hidden ">
                <img
                  alt="bg"
                  src={IMG_CDN + movie.backdrop_path}
                  className="absolute w-full h-full object-cover blur-sm"
                />
                <ExtraDetails movie={movie} cast={cast.cast} />
                <div className="relative p-6 bg-black bg-opacity-35">
                  <MovVids vids={vids.results} />
                </div>
              </div>
              <p className="absolute lg:text-8xl md:text-6xl text-4xl w-screen text-center lg:translate-y-[20%] md:translate-y-[40%] translate-y-[90%] opacity-70 text-white font-semibold">
                Let's Watch it !
              </p>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default MovieDetails;
