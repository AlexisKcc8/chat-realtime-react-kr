import { useContext } from "react";
import "../styles/HeaderApp.scss";
import { ButtonIcon } from "./ButtonIcon";
import { ChatContext } from "../context/ChatContext";
export const HeaderConversation = () => {
  const { data } = useContext(ChatContext);
  const { uid, displayName, photoURL } = data.user;

  return (
    <header className="header">
      <section className="header-title-and-icons">
        <article className="header-title-and-avatar">
          {/* <img src="/icons/icon-prev.svg" alt="icon-prev" /> */}
          {uid ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                className="header-title-and-avatar__img-avatar"
                src={photoURL}
                alt={`user: ${displayName}`}
              />
              <h3 className="">{displayName}</h3>
            </div>
          ) : (
            <h2>CodeChat</h2>
          )}
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
