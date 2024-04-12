import React from "react";

const MovVids = ({ vids }) => {
  vids = vids.filter(
    (v) =>
      v.site === "YouTube" &&
      v.type !== "Bloopers" &&
      v.type !== "Featurette"
  );
  if (!vids[0]) return ;

  return (
    <div>
      <h1 className="font-semibold w-full text-2xl p-3">More Videos </h1>
      <div className="flex justify-center items-center">
        <div className="flex max-w-screen w-fit overflow-x-scroll  pb-6">
          {vids &&
            vids.map((v, i) => {
              return (
                i < 6 && (
                  <iframe
                    key={v.key}
                    className="rounded-lg ml-3 aspect-video sm:h-52 h-36"
                    src={`https://www.youtube.com/embed/${v.key}?&controls=0&disablekb=1&playlist=${v.key}`}
                    title="YouTube video player"
                    loading="lazy"
                  ></iframe>
                )
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default MovVids;
