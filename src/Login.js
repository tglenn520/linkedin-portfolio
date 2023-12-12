import React, { useState } from "react";
import "./Login.css";

import {
  auth,
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "./firebase.js";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  // Register New User
  const register = () => {
    if (!name) {
      return alert("Please enter a full name");
    }
    // async create
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        updateProfile(userCredential.user, {
          displayName: name,
          photoURL: profilePic,
        }).then(() => {
          dispatch(
            login({
              email: userCredential.user.email,
              uid: userCredential.user.uid,
              displayName: name,
              photoURL: profilePic,
            })
          );
        });
      })
      .catch((err) => {
        alert(err);
      });
  };
  const loginToApp = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        console.log("user logged in:", userCred.user);
        dispatch(
          login({
            email: userCred.user.email,
            uid: userCred.user.uid,
            displayName: userCred.user.displayName,
            profileUrl: userCred.user.photoURL,
          })
        );
      })
      .catch((err) => alert(err));
  };
  return (
    <div className="login">
      <img
        src="https://news.hitb.org/sites/default/files/styles/large/public/field/image/500px-LinkedIn_Logo.svg__1.png?itok=q_lR0Vks"
        alt=""
      />
      {/* Form */}
      <form>
        {/* Get user typed in name Onchange */}

        <input
          type="text"
          placeholder="Full name (required if registering)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Get user typed in profile Pic  Onchange */}
        <input
          type="text"
          placeholder="Profile pic URL (optional)"
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
        />
        {/* Get user typed in Email Onchange */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* Get user typed in Password Onchange */}
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Login to App Button */}
        <button type="submit" onClick={loginToApp}>
          Sign In
        </button>
      </form>
      <p>
        Not a member? {/* Register New User Onclick */}
        <span className="login__register" onClick={register}>
          Register Now
        </span>
      </p>
    </div>
  );
}

export default Login;
