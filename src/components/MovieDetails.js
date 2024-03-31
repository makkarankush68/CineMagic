import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API_OPTIONS, IMG_CDN } from "../utils/constants";
import Header from "./Header";
import VidContainer from "./VidContainer";
import Loading from "./Loading";
import ExtraDetails from "./ExtraDetails";
import MovVids from "./MovVids";

const MovieDetails = () => {
  const [movie, setMovie] = useState("");
  const [vids, setVids] = useState("");
  const [cast, setcast] = useState("");
  const [params] = useSearchParams();
  const id = params.get("id");

  useEffect(() => {
    if (!movie) fetchDetails();
    if (!vids) fetchVids();
    if (!cast) fetchCast();
  }, []);
  const fetchDetails = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US?video=true`,
      API_OPTIONS
    );
    const data = await res.json();
    setMovie(data);
  };
  const fetchVids = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos`,
      API_OPTIONS
    );
    const data = await res.json();
    setVids(data);
  };
  const fetchCast = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits`,
      API_OPTIONS
    );
    const data = await res.json();
    setcast(data);
  };
  if (!movie) return <Loading />;

  return (
    <div>
      <Header />
      <div className="">
        <div className="overflow-hidden">
          <div className="xs:scale-100 scale-125  max-h-[80vh] overflow-hidden">
            <VidContainer id={movie.id} />
          </div>
          <div className="w-screen max-h-[80vh]  aspect-video absolute top-0 text-white bg-gradient-to-tr from-black  min-h-[500px] overflow-hidden"></div>
        </div>
        <div className=" w-screen text-white bg-black ">
          <div className="-translate-y-36 ">
            <div className="w-screen flex flex-wrap justify-evenly items-center bg-gradient-to-t from-black ">
              <div className="p-3 m-1 w-1/2 max-w-[600px] min-w-[250px] text-center">
                <h1 className="md:text-4xl pb-2 text-3xl font-semibold ">
                  {movie.title}
                </h1>
                <p className="sm:text-lg text-sm max-h-[170px] overflow-scroll ">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
/*
///
{
  "id": 823464,
  "cast": [
    {
      "adult": false,
      "gender": 1,
      "id": 15556,
      "known_for_department": "Acting",
      "name": "Rebecca Hall",
      "original_name": "Rebecca Hall",
      "popularity": 5.379,
      "profile_path": "/cVZaQrUY7F5khCBYdKDlEppHnQi.jpg",
      "cast_id": 10,
      "character": "Dr. Ilene Andrews",
      "credit_id": "6307a3a8bb070d0095ae6147",
      "order": 0
    },
    {
      "adult": false,
      "gender": 1,
      "id": 2948491,
      "known_for_department": "Acting",
      "name": "Kaylee Hottle",
      "original_name": "Kaylee Hottle",
      "popularity": 5.379,
      "profile_path": "/xpQQZgptOUI6duMMBDyCiaJ4JUv.jpg",
      "cast_id": 12,
      "character": "Jia",
      "credit_id": "6307a3c30398ab007d761db7",
      "order": 1
    },
  ],
  "crew": [
    {
      "adult": false,
      "gender": 2,
      "id": 1706,
      "known_for_department": "Writing",
      "name": "Terry Rossio",
      "original_name": "Terry Rossio",
      "popularity": 5.379,
      "profile_path": "/fFB0vhLH1dU6pSMWojEY5Stbv21.jpg",
      "credit_id": "656cee6b8de0ae013a801686",
      "department": "Writing",
      "job": "Screenplay"
    },
    {
      "adult": false,
      "gender": 2,
      "id": 1706,
      "known_for_department": "Writing",
      "name": "Terry Rossio",
      "original_name": "Terry Rossio",
      "popularity": 5.379,
      "profile_path": "/fFB0vhLH1dU6pSMWojEY5Stbv21.jpg",
      "credit_id": "656cee70568463015163e60e",
      "department": "Writing",
      "job": "Story"
    },
  ]
}
  */
