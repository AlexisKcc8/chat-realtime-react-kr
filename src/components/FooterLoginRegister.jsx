//hooks react
import { useState } from "react";
//firebase
import { auth, provider } from "../firebase/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const FooterLoginRegister = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
    // console.log(auth);
    // navigate("/");
  };

  return (
    <section className="container-social-media">
      <article className="container-social-media__container-message">
        <p className="container-social-media__message">or signup with</p>
      </article>
      <article className="container-social-media__container-buttons">
        <button className="container-social-media__button">
          <img
            className="container-social-media__button-img"
            src="/icons/facebook-svg.svg"
            alt="logo-facebook"
          />
        </button>
        <button
          className="container-social-media__button"
          // onClick={signInWithGoogle}
        >
          <img
            className="container-social-media__button-img"
            src="/icons/google-svg.svg"
            alt="logo-google"
          />
        </button>
      </article>
    </section>
  );
};
