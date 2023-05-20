import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { ButtonIcon } from "./ButtonIcon";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import "../styles/HeaderApp.scss";
export const HeaderContacs = () => {
  // const { userID } = auth.currentUser;
  const { currentUser } = useContext(AuthContext);
  const { photoURL, displayName } = currentUser;

  return (
    <header className="header">
      <section className="header-title-and-icons">
        <article className="header-title-and-avatar">
          <img
            className="header-title-and-avatar__img-avatar"
            src={photoURL}
            alt=""
          />
          <h3 className="">{displayName}</h3>
        </article>

        <article className="header-title-and-icons__buttons-icons">
          <ButtonIcon srcImg="/icons/icon-camera.svg" altImg="icon-camera" />
          <ButtonIcon srcImg="/icons/icon-glass.svg" altImg="icon-glass" />
          <ButtonIcon
            srcImg="/icons/icon-more.svg"
            altImg="icon-more"
            event={() => signOut(auth)}
          />
        </article>
      </section>
    </header>
  );
};
