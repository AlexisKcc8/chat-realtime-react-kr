import { useState } from "react";
import { auth, provider } from "../firebase/firebase-config";
import { signInWithPopup } from "firebase/auth";

import "../styles/SingIn.scss";
export const SingIn = () => {
  const [viewLogin, setViewLogin] = useState(true);
  const changeViewRegister = () => {
    setViewLogin(!viewLogin);
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
  };
  return (
    <section className="container-form">
      <h2>KR - CHAT🧢</h2>
      <h4>{!viewLogin ? "Register" : "Login"}</h4>
      <form className="form-register">
        {!viewLogin ? (
          <input type="text" name="" id="" placeholder="UserName" />
        ) : null}

        <input type="email" name="" id="" placeholder="Email" />
        <input type="password" name="" id="" placeholder="Password" />
        <input
          type="file"
          name=""
          id="input-avatar"
          placeholder="file"
          style={{ display: "none" }}
        />
        {!viewLogin ? (
          <section className="container-label-file-avatar">
            <label htmlFor="input-avatar" className="label-file-avatar">
              <img src="/icons/add-avatar-svg.svg" alt="" />
              <p>Add an avatar</p>
            </label>
          </section>
        ) : null}

        <button>Sing up</button>
      </form>
      <section className="social-media-register">
        <p>Do you prefer a social network?</p>
        <section>
          <button className="button-social-media" onClick={signInWithGoogle}>
            <img src="/icons/google-svg.svg" alt="icon-google" />
          </button>
          <button className="button-social-media">
            <img src="/icons/facebook-svg.svg" alt="icon-facebook" />
          </button>
        </section>
      </section>
      <section className="message-register">
        <p>You {!viewLogin ? "do" : "don't"} have a account?</p>
        <button onClick={changeViewRegister}>
          {!viewLogin ? "Login" : "Register"}
        </button>
      </section>
    </section>
  );
};
