import React, { useState } from "react";
import Header from "./Header";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useSelector } from "react-redux";
import { NTFLX_USR } from "../utils/constants";

const Browse = () => {
  const [ showUserInfo , setShowUserInfo ] = useState(true);
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // sign out succesful
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="relative">
      <Header />
      <div className="absolute z-10 right-0 my-4 mx-6">
        <img
          onClick={() => setShowUserInfo(!showUserInfo)}
          className="h-10"
          alt="signOut"
          src={NTFLX_USR}
        />
        {showUserInfo && (
          <div className="absolute p-2 m-1 right-[30%] flex flex-col justify-center text-center bg-[#000000b1] text-white rounded-xl ">
            <ul>
              <img
                alt="user-img"
                className="bg-white rounded-full h-8 mx-auto"
                src={user?.photoURL}
              />
              <li>{user?.displayName}</li>
              <li>{user?.email}</li>
            </ul>
            <button
              className="bg-red-800 text-white w-fit p-1 rounded-md mx-auto mt-2"
              onClick={handleSignOut}
            >
              SignOut
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
