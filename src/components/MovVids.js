import React from "react";

const MovVids = ({ vids }) => {
  if (!vids) return <></>;

  vids = vids.filter((v) => v.site === "YouTube" && v.type !== "Teaser");
  return (
    <div>
      <h1 className="font-semibold w-full text-2xl p-3">More Videos </h1>
      <div className="flex max-w-screen overflow-x-scroll justify-start mx-auto pb-6">
        {vids &&
          vids.map((v) => {
            return (
              <iframe
                key={v.key}
                className="mx-auto rounded-lg ml-3 aspect-video sm:min-h-52 min-h-36"
                src={`https://www.youtube.com/embed/${v.key}?&controls=0&disablekb=1&playlist=${v.key}`}
                title="YouTube video player"
              ></iframe>
            );
          })}
      </div>
    </div>
  );
};

export default MovVids;
