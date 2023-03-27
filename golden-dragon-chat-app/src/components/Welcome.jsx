// The welcome screen shown upon login. Maybe show number of chats since last login or something
import "../css/main.css";
import React, { useState } from "react";
import GoogleSignin from "../img/btn_google_signin_dark_normal_web.png";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect, signInWithPopup, getRedirectResult } from "firebase/auth";
import FakeMessage from "./FakeMessage";
import Cat from "../img/cat.jpg";
import Dog from "../img/dog.png";
import Capybara from "../img/capybara.png";

export default function Welcome() {
  const [user] = useAuthState(auth);
  const googleSignIn = async () => {
    try {
      const res = await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (err) {
      // If popup fails, try redirect
      signInWithRedirect(auth, new GoogleAuthProvider());
      // After the page redirects back
      const userCred = await getRedirectResult(auth);
      console.error(err);
    }
  };

  return (
    <main className="welcome-container">
      <div className="welcome__left">
        <h1>Welcome to Golden Dragon Chat</h1>
        <p>Chat with others around the world!</p>
        <button className="sign-in">
          <img
            onClick={googleSignIn}
            src={GoogleSignin}
            alt="sign in with google"
            type="button"
          />
        </button>
      </div>
      <div className="welcome__right">
        <FakeMessage
          img={Cat}
          message="hello i'm cat"
          time="3/20/2023, 15:01"
          user="Bob123"
        />
        <FakeMessage
          img={Dog}
          message="howdy ho partner"
          time="3/20/2023, 15:02"
          user="Mr_Dog"
          own={true}
        />
        <FakeMessage
          img={Capybara}
          message="capybara capybara capybara"
          time="3/20/2023, 15:02"
          user="Capy"
        />
      </div>
    </main>
  );
}
