import "../styles/HeaderApp.scss";
import { useContext } from "react";
import { ButtonIcon } from "./ButtonIcon";
import { ChatContext } from "../context/ChatContext";
import { IconPrev } from "./icons/IconPrev";
import { IconMessage } from "./icons/IconMessage";
import { IconCamera } from "./icons/IconCamera";
export const HeaderConversation = () => {
  const { data } = useContext(ChatContext);
  const { uid, displayName, photoURL } = data.user;

  return (
    <header className="header">
      <section className="header-title-and-icons">
        <article className="header-title-and-avatar">
          <div className="header-title-and-avatar__btn-prev">
            <ButtonIcon>
              <IconPrev bgColor="#fff" />
            </ButtonIcon>
          </div>
          <img
            className="header-title-and-avatar__img-avatar"
            src={photoURL}
            alt={`user: ${displayName}`}
          />
          <h3 className="">{displayName}</h3>
        </article>

        {uid ? (
          <article className="header-title-and-icons__buttons-icons">
            <ButtonIcon
              srcImg="/icons/icon-phone-header.svg"
              altImg="icon-phone"
            />
            <ButtonIcon srcImg="/icons/icon-paperclip.svg" altImg="icon-clip" />
            <ButtonIcon srcImg="/icons/icon-more.svg" altImg="icon-more" />
          </article>
        ) : null}
      </section>
    </header>
  );
};
