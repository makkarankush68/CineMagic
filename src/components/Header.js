import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGO_CDN } from "../utils/constants";

const Header = () => {
  // naviagtion logic using firebase api/eventlistner
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // auth State by firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User SignIn/SignUp
        const { uid, email, displayName, photoURL } = user;
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

  return (
    <div className="absolute bg-gradient-to-b from-black w-full h-44 p-2">
      <img className="w-40 mx-5" alt="logo" src={LOGO_CDN} />
    </div>
  );
};

export default Header;
