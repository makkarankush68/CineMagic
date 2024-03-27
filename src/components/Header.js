import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGO_CDN, NTFLX_USR } from "../utils/constants";

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
  const [showUserInfo, setShowUserInfo] = useState(true);
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
    <div className="relative z-50">
      <div className="absolute bg-gradient-to-b from-black w-full h-36 p-2">
        <img className="w-40 mx-5" alt="logo" src={LOGO_CDN} />
      </div>
      {user && (
        <div className="absolute z-10 right-0 my-6 mx-8 cursor-pointer">
          <img
            onClick={() => setShowUserInfo(!showUserInfo)}
            className="h-10"
            alt="signOut"
            src={NTFLX_USR}
          />
          {showUserInfo && (
            <div className="absolute p-6 m-1 right-[30%] flex flex-col justify-center text-center bg-black bg-opacity-30 text-white rounded-lg cursor-text ">
              <ul className="flex flex-col">
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
      )}
    </div>
  );
};

export default Header;
