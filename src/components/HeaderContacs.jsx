import { auth, dbFirestore } from "../firebase/firebase-config";
import "../styles/HeaderApp.scss";
import { ButtonIcon } from "./ButtonIcon";
export const HeaderContacs = () => {
  // const { userID } = auth.currentUser;
  return (
    <header className="header">
      <section className="header-title-and-icons">
        <article className="header-title-and-avatar">
          <img
            className="header-title-and-avatar__img-avatar"
            style={{ border: "1px solid red", height: "100%" }}
            src="/images/my-avatar.jpg"
            alt=""
          />
          <h3 className="">CodeChat</h3>
        </article>

        <article className="header-title-and-icons__buttons-icons">
          <ButtonIcon srcImg="/icons/icon-camera.svg" altImg="icon-camera" />
          <ButtonIcon srcImg="/icons/icon-glass.svg" altImg="icon-glass" />
          <ButtonIcon
            srcImg="/icons/icon-more.svg"
            altImg="icon-more"
            // event={() => auth.signOut()}
          />
        </article>
      </section>
    </header>
  );
};
