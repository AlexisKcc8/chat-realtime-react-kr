import "../styles/SingIn.scss";
//hooks
import { Link } from "react-router-dom";
//mis componentes
import { HeaderLoginRegister } from "../components/HeaderLoginRegister";
import { FooterLoginRegister } from "../components/FooterLoginRegister";
import { InputIcon } from "../components/InputIcon";
import { PageLoadingWait } from "../components/PageLoadingWait";
import { useRegister } from "../hooks/useRegister";

export const Register = () => {
  const {
    newUser,
    formSubmit,
    inputChange,
    loading,
    errorLogin,
    isLoadImgUser,
  } = useRegister();
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
            minlength={8}
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
          {isLoadImgUser ? (
            <p className="container-form__text-img-load">Imagen Cargada.</p>
          ) : null}

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
