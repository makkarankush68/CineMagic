import React from "react";
import { IMG_CDN } from "../utils/constants";

const CastComp = ({ cast }) => {
  if (!cast) return <></>;
  cast = cast.filter((c) => c.profile_path);
  return (
    <div className="bg-black bg-opacity-50 rounded-md mt-6 py-2">
      <div className="flex flex-wrap  md:max-w-[600px] max-w-96  max-h-[280px] overflow-y-scroll justify-around">
        {cast.map((c) => {
          return (
            <div key={c.id} className="relative cursor-pointer text-center">
              {/* <h1 className="absolute text-wrap max-w-20">{c.name}</h1> */}
              <img
                alt="dp"
                src={IMG_CDN + c.profile_path}
                className="w-20  m-2 rounded-md  hover:scale-105 duration-100"
              />
              {/* <h1 className="max-w-24 bottom-0 absolute">{c.character}</h1> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CastComp;
