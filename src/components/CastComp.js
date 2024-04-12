import React from "react";
import { IMG_CDN } from "../utils/constants";

const CastComp = ({ cast }) => {
  const filteredCast = cast.filter((c) => c.profile_path);
  if (!filteredCast.length) return null;

  return (
    <div className="bg-black bg-opacity-50 rounded-md mt-6 py-2">
      <div className="flex flex-wrap md:max-w-[600px] max-w-96 max-h-[280px] overflow-y-scroll justify-around">
        {filteredCast.map((c) => (
          <CastMember
            key={c.id}
            name={c.name}
            character={c.character}
            profilePath={c.profile_path}
          />
        ))}
      </div>
    </div>
  );
};

const CastMember = ({ name, character, profilePath }) => (
  <div className="relative cursor-pointer text-center group">
    <h1
      className="absolute w-20 min-w-[5.5vw] m-2 rounded-b-md group-hover:scale-105 duration-200 text-[13px] text-wrap -z-10 -bottom-[3px] bg-black bg-opacity-40 group-hover:z-10"
      style={{ backdropFilter: "blur(2px)" }}
    >
      {name} as {character}
    </h1>
    <img
      alt="dp"
      src={IMG_CDN + profilePath}
      loading="lazy"
      className="w-20 min-w-[5.5vw] m-2 rounded-md hover:scale-105 duration-100"
    />
  </div>
);

export default CastComp;
