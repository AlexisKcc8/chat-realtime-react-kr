//hooks
import { useRef, useState } from "react";
//mis componentes
import { InputIcon } from "../components/InputIcon";
import { HeaderLoginRegister } from "../components/HeaderLoginRegister";
import { FooterLoginRegister } from "../components/FooterLoginRegister";

import "../styles/SingIn.scss";

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
  const [showTextPassword, setShowTextPassword] = useState(false);
  const [perfilUser, setPerfilUser] = useState(INITIAL_STATE_USER);
  const [loading, setLoading] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);

  const inputPws = useRef();

  const inputChange = (e) => {
    let prop = e.target.name;
    let data = e.target.value;

    setPerfilUser({
      ...perfilUser,
      [prop]: data,
    });
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
    <section className="container-login-register">
      <HeaderLoginRegister />

      <form className="container-form">
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
    </section>
  );
};
