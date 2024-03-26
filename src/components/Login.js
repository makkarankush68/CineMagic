import React, { useRef, useState } from "react";
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
import { DMMY_DP } from "../utils/constants";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errMess, setErrMess] = useState(null);
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
    if (!isSignIn && name.current.value === "") {
      setErrMess("Name not valid");
      return;
    }
    const res = checkValidData(email.current.value, password.current.value);
    if (res) {
      setErrMess(res);
      return;
    }
    // Signin Signup the user
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
              setErrMess(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMess(errorCode + " : " + errorMessage);
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
  };

  // rendering
  return (
    <div className="relative">
      <Header />
      <img
        className="w-[100vw] h-[90vh] min-h-[660px]"
        alt="logo"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/a3873901-5b7c-46eb-b9fa-12fea5197bd3/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
      />
      <div className="text-white absolute top-[25%] mx-[50%] translate-x-[-50%] bg-[#000000d1] p-10 w-[40%] max-w-[400px] min-w-[300px] rounded-lg">
        <form
          className=" flex gap-2 flex-col "
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
              className="p-2 m-1 my-2 bg-[#3a3a3ac3] outline-none focus:border-red-500 focus:border rounded-md"
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email  "
            className="p-2 m-1 my-2 bg-[#3a3a3ac3] outline-none focus:border-red-500 focus:border rounded-md"
          />
          <input
            ref={password}
            type="text"
            placeholder="Password  "
            className="p-2 m-1 my-2 bg-[#3a3a3ac3] outline-none focus:border-red-500 focus:border rounded-md"
          />
          <p className="text-red-500 text-sm font-thin px-1">{errMess}</p>
          <button
            onClick={handleSignBtn}
            className="p-2 m-1 my-2 bg-red-600 rounded-md"
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <p>
          {isSignIn ? " New to Netflix?" : "Already registered?"}
          <span
            className="cursor-pointer px-1"
            onClick={handleToggleSigninForm}
          >
            {isSignIn ? "Sign Up Now" : "Sign In Now"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
