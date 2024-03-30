import React from "react";

const MovVids = ({ vids }) => {
  if (!vids) return <></>;

  vids = vids.filter((v) => v.site === "YouTube" && v.type !== "Teaser");
  console.log(vids);
  return (
    <>
      <h1 className="font-semibold text-xl p-3">More Videos : </h1>
      <div className="pl-10 min-h-48 p-2 pb-4 flex max-w-screen overflow-x-scroll justify-center">
        {vids &&
          vids.map((v) => {
            return (
              <iframe
              key={v.key}
                className="rounded-lg ml-3"
                src={`https://www.youtube.com/embed/${v.key}?&controls=0&disablekb=1&playlist=${v.key}`}
                title="YouTube video player"
              ></iframe>
            );
          })}
      </div>
    </>
  );
};

export default MovVids;
