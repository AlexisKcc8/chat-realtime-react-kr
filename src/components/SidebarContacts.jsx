import "../styles/SidebarContacts.scss";
import { Toolbar } from "./Toolbar";
import { contacts } from "../database/contacts-fake";
import { ItemContact } from "./ItemContact";
export const SidebarContacts = () => {
  // console.log(contacts);
  return (
    <aside className="side-contacts">
      <header className="header">
        <section className="header__section-title-and-icons">
          <h3 className="title-header">CodeChat</h3>
          <article className="header__section-button-icons">
            <button className="header__section-button-icon">
              <img src="/icons/icon-camera.svg" alt="icon-camera" />
            </button>
            <button className="header__section-button-icon">
              <img src="/icons/icon-glass.svg" alt="icon-camera" />
            </button>
            <button className="header__section-button-icon">
              <img src="/icons/icon-more.svg" alt="icon-camera" />
            </button>
          </article>
        </section>
        {/* <section className=""></section> */}
      </header>
      <section className="container-chats">
        <ul className="container-chats__list">
          {contacts.map((contact) => (
            <ItemContact key={contact.id} contact={contact} />
          ))}
        </ul>
      </section>
      <Toolbar />
    </aside>
  );
};
