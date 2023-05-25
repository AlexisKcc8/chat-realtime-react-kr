import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { ButtonIcon } from "./ButtonIcon";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import "../styles/HeaderApp.scss";
import { IconLogout } from "./icons/IconLogout";
import { IconMessage } from "./icons/IconMessage";
import { IconCamera } from "./icons/IconCamera";
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
          <ButtonIcon>
            <IconCamera bgColor="#fff" />
          </ButtonIcon>
          <ButtonIcon>
            <IconMessage bgColor="#fff" />
          </ButtonIcon>
          <ButtonIcon event={() => signOut(auth)}>
            <IconLogout bgColor="#fff" />
          </ButtonIcon>
        </article>
      </section>
    </header>
  );
};
