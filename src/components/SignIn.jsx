import { useRef, useState } from "react";
import {
  auth,
  provider,
  storage,
  dbFirestore,
} from "../firebase/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

import "../styles/SingIn.scss";

const TYPES_INPUTS_FORM = {
  PASSWORD: "password",
  TEXT: "text",
  FILE: "file",
};
const INITIAL_STATE_USER = {
  username: "",
  email: "",
  password: "",
  photo: null,
};

export const SingIn = () => {
  const [viewLogin, setViewLogin] = useState(true);
  const [showTextPassword, setShowTextPassword] = useState(false);
  const [perfilUser, setPerfilUser] = useState(INITIAL_STATE_USER);
  const [loading, setLoading] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);

  const inputPws = useRef();

  const inputChange = (e) => {
    let data = null;
    let prop = e.target.name;
    data = e.target.value;
    if (e.target.type == "file") {
      data = e.target.files[0];
    }
    setPerfilUser({
      ...perfilUser,
      [prop]: data,
    });
  };

  const formSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { username, email, password, photo } = perfilUser;

    try {
      //create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log("result123", res.user.uid);
      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${username + date}`);

      await uploadBytesResumable(storageRef, photo).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //update profile
            await updateProfile(res.user, {
              username,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(dbFirestore, "users", res.user.uid), {
              uid: res.user.uid,
              username,
              email,
              photoURL: downloadURL,
            });
            //create empty user chats on firestore
            await setDoc(doc(dbFirestore, "userChats", res.user.uid), {});
          } catch (err) {
            console.log(err);
            setErrorLogin(true);
            setLoading(false);
          }
        });
      });
    } catch (error) {
      setErr(true);
      setLoading(false);
    }
  };

  const changeViewRegister = () => {
    setViewLogin(!viewLogin);
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
  };

  const showTextInputPassword = () => {
    let typeInput = inputPws.current.type;
    if (typeInput === TYPES_INPUTS_FORM.PASSWORD) {
      inputPws.current.type = TYPES_INPUTS_FORM.TEXT;
      setShowTextPassword(true);
    } else {
      inputPws.current.type = TYPES_INPUTS_FORM.PASSWORD;
      setShowTextPassword(false);
    }
  };

  return (
    <section className="container-singin">
      <section className="container-hero">
        <img
          className="container-hero__img-avatar"
          src="/images/my-avatar.jpg"
          alt="imagen-avatar"
        />
        <article className="container-hero__container-title-autor">
          <h3 className="container-hero__title">CodeChat</h3>
          <span className="container-hero__name-autor">By: AlexisKR🧢</span>
        </article>
      </section>

      <form className="container-form" onSubmit={formSubmit}>
        <h3 className="container-form__message-info">
          {viewLogin ? "Login" : "Create a New Account"}
        </h3>
        {viewLogin ? null : (
          <div className="container-form__wrapper-input">
            <img
              className="container-form__img-input"
              src="/icons/icon-username.svg"
              alt="icon-username"
            />
            <input
              className="container-form__input"
              type="text"
              required
              name="username"
              onChange={inputChange}
              value={perfilUser.username}
              placeholder="UserName"
            />
          </div>
        )}
        <div className="container-form__wrapper-input">
          <img
            className="container-form__img-input"
            src="/icons/icon-email.svg"
            alt="icon-email"
          />
          <input
            className="container-form__input"
            type="email"
            required
            placeholder="Email"
            name="email"
            onChange={inputChange}
            value={perfilUser.email}
          />
        </div>
        <div className="container-form__wrapper-input">
          {showTextPassword ? (
            <img
              onClick={showTextInputPassword}
              className="container-form__img-input container-form__img-input--password"
              src="/icons/icon-close-pws.svg"
              alt="icon-password-close"
            />
          ) : (
            <img
              onClick={showTextInputPassword}
              className="container-form__img-input container-form__img-input--password"
              src="/icons/icon-open-pws.svg"
              alt="icon-password"
            />
          )}

          <input
            ref={inputPws}
            className="container-form__input container-form__input--password"
            type="password"
            required
            placeholder="Password"
            name="password"
            onChange={inputChange}
            value={perfilUser.password}
          />
        </div>

        <input
          className="container-form__input"
          style={{ display: "none" }}
          type="file"
          name="photo"
          onChange={inputChange}
          id="input-file-avatar"
        />
        {viewLogin ? null : (
          <label
            className="container-form__label-avatar"
            htmlFor="input-file-avatar"
          >
            <img
              className="container-form__img-add-avatar"
              src="/icons/add-avatar-svg.svg"
              alt="icono-añadir-avatar"
            />
            <p className="container-form__msg-add-avatar">Add an avatar</p>
          </label>
        )}
        <button disabled={loading} className="container-form__form-button">
          Sing Up
        </button>
        {errorLogin ? <span>Something an error</span> : null}
      </form>

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
            onClick={signInWithGoogle}
          >
            <img
              className="container-social-media__button-img"
              src="/icons/google-svg.svg"
              alt="logo-google"
            />
          </button>
        </article>
        <article className="container-social-media__container-message-account">
          <p className="container-social-media__message-account">
            {viewLogin ? "You don't" : "Already"} have an account?
          </p>
          <button
            onClick={changeViewRegister}
            className="container-social-media__change-view-login"
          >
            {viewLogin ? "Register" : "Login"} Here
          </button>
        </article>
      </section>
    </section>
  );
};
