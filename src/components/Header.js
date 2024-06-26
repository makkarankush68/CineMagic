import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { NTFLX_USR } from "../utils/constants";
import { TogggleShowSearch } from "../utils/searchSlice";
import cinemagic from "../imgs/cinemagic-bg.png";
import { toggleMuted } from "../utils/moviesSlice";
import mute from "../imgs/Mute.png";
import unmute from "../imgs/Unmute.png";

const Header = () => {
  // naviagtion logic using firebase api/eventlistner
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useState(useLocation().pathname);
  // auth State by firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User SignIn/SignUp
        const { uid, email, displayName, photoURL } = auth.currentUser;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        if (params === "/") navigate("/browse");
        else if (params === "/browse") navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);
  // User Info part
  const user = useSelector((store) => store.user);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // sign out succesful
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const muted = useSelector((store) => store.movies.muted); // State to manage mute/unmute

  return (
    <div className="relative z-50">
      <div className="absolute bg-gradient-to-b from-black w-full h-36 p-2">
        <img
          onClick={() => {
            navigate("/");
          }}
          className="sm:w-40 sm:mx-5 w-32 my-3 cursor-pointer mb-0"
          alt="logo"
          src={cinemagic}
        />
        {(params === "/browse" || params === "/movie") && (
          <div className="sm:m-5 m-0 mt-2 relative">
            <div className="group w-fit">
              <button
                className="bg-white sm:p-2 p-1.5 rounded-md bg-opacity-70 hover:bg-opacity-100 relative"
                onClick={() => {
                  dispatch(toggleMuted());
                }} // Toggle mute state
              >
                {muted ? (
                  <img className="md:h-5 h-4" alt="unmute" src={unmute} />
                ) : (
                  <img className="md:h-5 h-4" alt="mute" src={mute} />
                )}
              </button>
              <span className="absolute bg-black text-white sm:text-sm text-xs rounded-md m-1 mx-2 p-1 tooltip opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-200">
                {muted ? "Unmute (may not work in all browsers)" : "Mute "}
              </span>
            </div>
          </div>
        )}
      </div>
      {user && (
        <div className="absolute z-10 right-0 my-4 sm:mx-8 mx-3 cursor-pointer flex items-center gap-3">
          <button
            onClick={() => {
              dispatch(TogggleShowSearch());
              params !== "/genie" ? navigate("/genie") : navigate(-1);
            }}
            className="p-1 m-1 sm:text-lg bg-white font-semibold text-[#ff010b] rounded-sm  hover:bg-[#ff010b] hover:text-white duration-150"
          >
            {params !== "/genie" ? "Genie" : "Back"}
          </button>
          <img
            onClick={() => setShowUserInfo(!showUserInfo)}
            onBlur={() => setShowUserInfo(false)}
            className="h-10"
            alt="signOut"
            src={NTFLX_USR}
          />
          {showUserInfo && (
            <div className="absolute p-4 m-1 right-[0%] top-[100%] flex flex-col text-center bg-black bg-opacity-50 text-white rounded-lg cursor-auto lg:text-lg md:text-md text-sm ">
              <ul className="flex flex-col">
                <li className="flex items-center min-w-28">
                  <img
                    alt="user-img"
                    className="bg-white rounded-full sm:h-8 h-7 mx-auto"
                    src={user?.photoURL}
                  />
                  <span>
                    <span>Hi, {user?.displayName}</span>
                  </span>
                </li>
                <li className="p-1 font-semibold">{user?.email}</li>
              </ul>
              <button
                onClick={handleSignOut}
                className="relative items-center justify-center inline-block px-4 py-1.5 overflow-hidden font-medium text-indigo-600 shadow-2xl group w-fit p-1 rounded-md mx-auto mt-1"
              >
                <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease"></span>
                <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
                  <span className="absolute bottom-0 left-0 w-20 h-20 -ml-10 bg-purple-500 rounded-full blur-md"></span>
                  <span className="absolute bottom-0 right-0 w-20 h-20 -mr-10 bg-pink-500 rounded-full blur-md"></span>
                </span>
                <span className="relative text-white font-semibold">
                  Logout
                </span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
