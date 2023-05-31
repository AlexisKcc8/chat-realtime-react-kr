import "../styles/SingIn.scss";

//mis componentes
import { InputIcon } from "../components/InputIcon";
import { HeaderLoginRegister } from "../components/HeaderLoginRegister";
import { FooterLoginRegister } from "../components/FooterLoginRegister";
import { Link } from "react-router-dom";
import { useSingIn } from "../hooks/useSingIn";
export const SingIn = () => {
  const { submitInfoUser, inputChange, perfilUser, loading, errorLogin } =
    useSingIn();
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
        {errorLogin ? (
          <p className="container-form__msg-error">
            Ocurrió un problema, revisa el usuario y la contraseña
          </p>
        ) : null}
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
