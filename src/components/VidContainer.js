import React from "react";
import useTrailerVideo from "../hooks/useTrailerVideo";
import { useSelector } from "react-redux";
import Loading from "./Loading";

const VidContainer = () => {
  useTrailerVideo();
  const VidKey = useSelector((store) => store.movies?.mainTrailerKey);
  if (!VidKey) return <Loading/>;
  return (
    <div className="w-screen sm:aspect-video sm:h-auto  min-h-[500px]">
      <iframe
        className="md:scale-[1.35] sm:scale-[1.9] xs:scale-[2.5] scale-[3] min-h-[500px] translate-y-[-10px]"
        width="100%"
        height="100%"
        min-height="500px"
        src={`https://www.youtube.com/embed/${VidKey}?autoplay=1&mute=1&loop=1&controls=0&disablekb=1&playlist=${VidKey}&start=20`}
        title="YouTube video player"
      ></iframe>
    </div>
  );
};

export default VidContainer;
