//hooks
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//firebase
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

import { auth, dbFirestore, storage } from "../firebase/firebase-config";

//mis componentes
import { HeaderLoginRegister } from "../components/HeaderLoginRegister";
import { FooterLoginRegister } from "../components/FooterLoginRegister";
import { InputIcon } from "../components/InputIcon";

import "../styles/SingIn.scss";
import { PageLoadingWait } from "../components/PageLoadingWait";

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

export const Register = () => {
  const [newUser, setNewUser] = useState(INITIAL_STATE_USER);
  const [loading, setLoading] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);

  const navigate = useNavigate();

  const formSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    let { username, email, password, photo } = newUser;
    let userName = username.toLowerCase();

    if (photo == null) {
      let isAccept = confirm(
        "No añadiste una foto de perfil, se te agregara una imagen por defecto. Estas de acuerdo?"
      );

      if (isAccept) {
        photo = await loadImgDefect();
      } else {
        setLoading(false);
        return;
      }
    }
    try {
      //create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${userName + date}`);

      await uploadBytesResumable(storageRef, photo).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //update profile
            await updateProfile(res.user, {
              displayName: userName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(dbFirestore, "users", res.user.uid), {
              uid: res.user.uid,
              displayName: userName,
              email,
              photoURL: downloadURL,
            });
            //create empty user chats on firestore
            await setDoc(doc(dbFirestore, "userChats", res.user.uid), {});
            //si no existe ningun problema, redirigimos a home
            navigate("/");
          } catch (err) {
            console.log(err);
            setErrorLogin(true);
          } finally {
            setLoading(false);
          }
        });
      });
    } catch (error) {
      console.log(error);
      setErrorLogin(true);
      setLoading(false);
    }
  };

  const inputChange = (e) => {
    let data = null;
    let prop = e.target.name;
    data = e.target.value;
    if (e.target.type == "file") {
      data = e.target.files[0];
    }
    setNewUser({
      ...newUser,
      [prop]: data,
    });
  };

  const loadImgDefect = async () => {
    let imageUrl = "/images/robotito.jpg";
    let fileName = "image.jpg";
    let response = await fetch(imageUrl);
    let data = await response.blob();
    let fileImg = new File([data], fileName, { type: "image/jpeg" });
    return fileImg;
  };
  return (
    <>
      <section className="container-login-register">
        {loading ? <PageLoadingWait /> : null}

        <HeaderLoginRegister />
        <form className="container-form" onSubmit={formSubmit}>
          <h3 className="container-form__message-info">Create a New Account</h3>
          <InputIcon
            srcImg="/icons/icon-username.svg"
            altImg="icon-username"
            placeholder="UserName"
            name="username"
            onChange={inputChange}
            value={newUser.username}
          />
          <InputIcon
            srcImg="/icons/icon-email.svg"
            altImg="icon-email"
            placeholder="Email"
            type="email"
            name="email"
            onChange={inputChange}
            value={newUser.newEmail}
          />

          <InputIcon
            srcImg="/icons/icon-close-pws.svg"
            altImg="icon-password-close"
            type="password"
            placeholder="Password"
            name="password"
            onChange={inputChange}
            value={newUser.password}
          />

          <div style={{ display: "none" }}>
            <InputIcon
              type="file"
              name="photo"
              onChange={inputChange}
              isRequired={false}
              id="input-file-avatar"
            />
          </div>

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
          <button disabled={loading} className="container-form__form-button">
            Sing Up
          </button>
          {errorLogin ? <span>Something an error</span> : null}
        </form>
        <FooterLoginRegister />

        <article className="container-social-media__container-message-account">
          <p className="container-social-media__message-account">
            You do have an account?
          </p>
          <Link
            to="/login"
            className="container-social-media__change-view-login"
          >
            Login
          </Link>
        </article>
      </section>
    </>
  );
};
