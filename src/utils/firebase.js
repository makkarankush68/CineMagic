// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVMylwo4o3xjWpyvoWQFeTi0abL0B1fSg",
  authDomain: "netflix-gpt-21035.firebaseapp.com",
  projectId: "netflix-gpt-21035",
  storageBucket: "netflix-gpt-21035.appspot.com",
  messagingSenderId: "623043246859",
  appId: "1:623043246859:web:f447d76c24342f9d2f800e",
  measurementId: "G-ZQ36MC64FB"
};

// Initialize Firebase
// const app = 
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth();