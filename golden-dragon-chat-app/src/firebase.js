// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzI1Q90SzV-LMLHu8jnALlSOnUR7NsMWY",
  authDomain: "golden-dragon-chat-app.firebaseapp.com",
  databaseURL: "https://golden-dragon-chat-app-default-rtdb.firebaseio.com",
  projectId: "golden-dragon-chat-app",
  storageBucket: "golden-dragon-chat-app.appspot.com",
  messagingSenderId: "638264429171",
  appId: "1:638264429171:web:6d1b072109483a74323806"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
