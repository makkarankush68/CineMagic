import React from "react";
import loadingImg from "../imgs/loading.png";
const Loading = () => {
  return (
    <div className="w-full h-full">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img
          alt=""
          src={loadingImg}
          className="animate-spin opacity-90 w-24 h-24 m-auto mt-[50%]"
        />
      </div>
    </div>
  );
};

export default Loading;
