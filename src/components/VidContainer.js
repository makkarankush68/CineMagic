import React from "react";
import useTrailerVideo from "../hooks/useTrailerVideo";
import { useSelector } from "react-redux";

const VidContainer = ({ id }) => {
  useTrailerVideo(id);
  const VidKey = useSelector((store) => store.movies?.mainTrailerKey);
  return (
    <div className="w-screen sm:aspect-video sm:h-auto  min-h-[500px]">
      <iframe
        className="lg:scale-[1.35] md:scale-[1.9] scale-[2.5] min-h-[500px] translate-y-[-10px]"
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
