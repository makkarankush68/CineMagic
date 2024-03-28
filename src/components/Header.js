import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGO_CDN, NTFLX_USR } from "../utils/constants";
import { TogggleShowSearch } from "../utils/searchSlice";

const Header = () => {
  // naviagtion logic using firebase api/eventlistner
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);
  // User Info part
  const [showUserInfo, setShowUserInfo] = useState(false);
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
  // toggle search Button
  const showSearch = useSelector((store) => store.search.showSearch);
  return (
    <div className="relative z-50">
      <div className="absolute bg-gradient-to-b from-black w-full h-36 p-2">
        <img className="sm:w-40 sm:mx-5 w-32 my-3" alt="logo" src={LOGO_CDN} />
      </div>
      {user && (
        <div className="absolute z-10 right-0 my-6 mx-8 cursor-pointer flex gap-3">
          <button
            onClick={() => dispatch(TogggleShowSearch())}
            className="p-1 m-1 sm:text-lg bg-white font-semibold text-[#ff010b] rounded-sm  hover:bg-[#ff010b] hover:text-white duration-150"
          >
            {!showSearch ? "Genie" : "Home"}
          </button>
          <img
            onClick={() => setShowUserInfo(!showUserInfo)}
            className="h-10"
            alt="signOut"
            src={NTFLX_USR}
          />
          {!showUserInfo && (
            <div className="absolute p-6 m-1 right-[0%] top-[100%] flex flex-col text-center bg-black bg-opacity-50 text-white rounded-lg cursor-auto ">
              <ul className="flex flex-col">
                <li className="flex items-center min-w-32">
                  <img
                    alt="user-img"
                    className="bg-white rounded-full h-8 mx-auto"
                    src={user?.photoURL}
                  />
                  <span>
                    <span>Hi, </span>
                    <span>{user?.displayName}</span>
                  </span>
                </li>
                <li className="p-1">{user?.email}</li>
              </ul>
              <button
                className="bg-red-700 text-white w-fit p-1 rounded-md mx-auto mt-1"
                onClick={handleSignOut}
              >
                SignOut
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
