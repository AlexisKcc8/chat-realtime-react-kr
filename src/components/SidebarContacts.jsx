import "../styles/SidebarContacts.scss";
import { Toolbar } from "./Toolbar";
import { contacts } from "../database/contacts-fake";
import { ItemContact } from "./ItemContact";
import { HeaderContacs } from "./HeaderContacs";
export const SidebarContacts = () => {
  return (
    <aside className="side-contacts">
      <HeaderContacs />
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
