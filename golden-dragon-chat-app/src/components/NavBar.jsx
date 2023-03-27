// Sign in / out button on a nav bar, maybe abutton to show the SendMessage component as well
import React from "react";
import GoogleSignin from "../img/btn_google_signin_dark_normal_web.png";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect, signInWithPopup } from "firebase/auth";

const NavBar = () => {

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
  const signOut = () => {
    auth.signOut();
  };
  return (
    <nav className="nav-bar">
      <h1>Golden Dragon Chat</h1>
      {user ? (
        <button onClick={signOut} className="sign-out" type="button">
          Sign Out
        </button>
      ) : (
        <button className="sign-in"
          onClick={googleSignIn}
        >
          <img
            src={GoogleSignin}
            alt="sign in with google"
            type="button"
          />
        </button>
      )}
    </nav>
  );
};
export default NavBar;
