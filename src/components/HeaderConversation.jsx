import "../styles/HeaderApp.scss";
import { ButtonIcon } from "./ButtonIcon";
export const HeaderConversation = () => {
  return (
    <header className="header">
      <section className="header-title-and-icons">
        <article className="header-title-and-avatar">
          <img src="/icons/icon-prev.svg" alt="icon-prev" />
          <img
            className="header-title-and-avatar__img-avatar"
            style={{ border: "1px solid red", height: "100%" }}
            src="/images/my-avatar.jpg"
            alt=""
          />
          <h3 className="">Alexis</h3>
        </article>

        <article className="header-title-and-icons__buttons-icons">
          <ButtonIcon
            srcImg="/icons/icon-phone-header.svg"
            altImg="icon-phone"
          />
          <ButtonIcon srcImg="/icons/icon-paperclip.svg" altImg="icon-clip" />
          <ButtonIcon srcImg="/icons/icon-more.svg" altImg="icon-more" />
        </article>
      </section>
    </header>
  );
};
