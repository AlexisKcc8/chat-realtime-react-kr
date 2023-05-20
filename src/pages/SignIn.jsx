//hooks
import { useRef, useState } from "react";
//mis componentes
import { InputIcon } from "../components/InputIcon";
import { HeaderLoginRegister } from "../components/HeaderLoginRegister";
import { FooterLoginRegister } from "../components/FooterLoginRegister";

import "../styles/SingIn.scss";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";

const TYPES_INPUTS_FORM = {
  PASSWORD: "password",
  TEXT: "text",
  FILE: "file",
};
const INITIAL_STATE_USER = {
  email: "",
  password: "",
};

export const SingIn = () => {
  const [perfilUser, setPerfilUser] = useState(INITIAL_STATE_USER);
  const [loading, setLoading] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);

  const navigate = useNavigate();

  const inputChange = (e) => {
    let prop = e.target.name;
    let data = e.target.value;

    setPerfilUser({
      ...perfilUser,
      [prop]: data,
    });
  };

  const submitInfoUser = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = perfilUser;

      await signInWithEmailAndPassword(auth, email, password);

      navigate("/");
    } catch (error) {
      setErrorLogin(true);
    }
  };
  return (
    <section className="container-login-register">
      <HeaderLoginRegister />

      <form className="container-form" onSubmit={submitInfoUser}>
        <h3 className="container-form__message-info">Login</h3>
        <InputIcon
          srcImg="/icons/icon-email.svg"
          altImg="icon-email"
          placeholder="Email"
          type="email"
          name="email"
          onChange={inputChange}
          value={perfilUser.email}
        />

        <InputIcon
          srcImg="/icons/icon-close-pws.svg"
          altImg="icon-password-close"
          type="password"
          placeholder="Password"
          name="password"
          onChange={inputChange}
          value={perfilUser.password}
        />

        <button disabled={loading} className="container-form__form-button">
          Sing Up
        </button>
        {errorLogin ? <span>Something an error</span> : null}
      </form>

      <FooterLoginRegister />

      <article className="container-social-media__container-message-account">
        <p className="container-social-media__message-account">
          You don't have an account?
        </p>
        <Link
          to="/register"
          className="container-social-media__change-view-login"
        >
          Register Here
        </Link>
      </article>
    </section>
  );
};
