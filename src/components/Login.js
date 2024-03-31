import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
// firebase for auth/signIn
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
// redux
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_IMG, DMMY_DP } from "../utils/constants";
import ccImg from "../imgs/ccImg.png";
import vidImg from "../imgs/vidImg.png";
import loadingImg from "../imgs/loading.png";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errMess, setErrMess] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleToggleSigninForm = () => {
    setIsSignIn(!isSignIn);
  };

  // validating forms
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  // update user profile after signin
  const dispatch = useDispatch();

  const handleSignBtn = () => {
    setErrMess("");
    try {
      if (!isSignIn && name.current.value === "") {
        throw new Error("Name not valid");
      }
      const res = checkValidData(email.current.value, password.current.value);
      if (res) {
        throw new Error(res);
      }
      setLoading(true);
      // sign up logic
      if (!isSignIn) {
        createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            const user = userCredential.user;
            updateProfile(user, {
              displayName: name.current.value,
              photoURL: DMMY_DP,
            })
              .then(() => {
                // dispatch an action again
                // to update redux store
                const updatedUser = auth.currentUser;
                dispatch(
                  addUser({
                    uid: updatedUser.uid,
                    email: updatedUser.email,
                    displayName: updatedUser.displayName,
                    photoURL: updatedUser.photoURL,
                  })
                );
              })
              .catch((error) => {
                console.log(error.message);
              });
          })
          .catch((error) => {
            const errorMessage = error.message;
            setErrMess(errorMessage);
          });
      }
      // sign in logic
      else {
        signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed in
            // const user = userCredential.user;
          })
          .catch((error) => {
            // const errorCode = error.code;
            const errorMessage = error.message;
            setErrMess(errorMessage + " : Email/Password not correct");
          });
      }
    } catch (err) {
      setErrMess(err.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  };
  const handleKeyDown = (e, ref) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (ref.current) {
        ref.current.focus();
      }
    }
  };
  useEffect(() => {
    setErrMess("");
    if (!isSignIn) {
      email.current.value = "";
      password.current.value = "";
    }
  }, [isSignIn]);
  const handleFillTestDetails = () => {
    setErrMess("");
    email.current.value = "test@movi.com";
    password.current.value = "Test1234!";
  };
  // rendering
  return (
    <div className="relative">
      <Header />
      <img className="w-screen object-cover h-screen" alt="logo" src={BG_IMG} />
      <div className="text-white absolute top-[25%] mx-[50%] translate-x-[-50%] bg-[#000000d1] p-10 w-[40%] max-w-[400px] min-w-[300px] rounded-lg  z-30 ">
        <form
          className="relative flex gap-2 flex-col"
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className="p-2 font-bold text-3xl">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignIn && (
            <input
              ref={name}
              type="text"
              placeholder="Username"
              className="p-2 my-2 bg-[#3a3a3ac3] outline-none focus:border-red-500 focus:border rounded-md"
              onKeyDown={(e) => handleKeyDown(e, email)}
            />
          )}
          <input
            ref={email}
            type="email"
            placeholder="Email"
            className="p-2 my-2 bg-[#3a3a3ac3] outline-none focus:border-red-500 focus:border rounded-md"
            onKeyDown={(e) => handleKeyDown(e, password)}
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-2 my-2 bg-[#3a3a3ac3] outline-none focus:border-red-500 focus:border rounded-md"
          />
          <p className="text-red-500 text-sm font-thin px-1">{errMess}</p>
          <button
            onClick={handleSignBtn}
            className="relative items-center justify-center inline-block px-5 py-2 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group w-40 mx-auto"
          >
            <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease"></span>
            <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
              <span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md"></span>
              <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md"></span>
            </span>
            <span className="relative text-white font-semibold">
              {isSignIn ? "Sign In" : "Sign Up"}
            </span>
          </button>
        </form>
        {loading && (
          <div className="absolute top-1/2 w-full h-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-40 backdrop-blur-[1px]">
            <img
              alt="loading"
              src={loadingImg}
              className="animate-spin opacity-90 w-24 h-24 m-auto mt-[50%]"
            />
          </div>
        )}
        <p className="py-2">
          {isSignIn ? " New to Netflix?" : "Already registered?"}
          <span
            className="cursor-pointer px-1"
            onClick={handleToggleSigninForm}
          >
            {isSignIn ? "Sign Up Now" : "Sign In Now"}
          </span>
        </p>
        {isSignIn && (
          <p className="text-gray-300">
            Just trying out?
            <span
              className="cursor-pointer px-1"
              onClick={handleFillTestDetails}
            >
              Demo login !
            </span>
          </p>
        )}
      </div>
      <img
        alt="deco"
        src={ccImg}
        className="absolute sm:w-44 w-32 bottom-10 sm:left-20 left-10 bott-img"
      />
      <img
        alt="deco"
        src={vidImg}
        className="absolute sm:w-44 w-32 top-14 sm:right-20 right-8 bott-img"
      />
    </div>
  );
};

export default Login;
