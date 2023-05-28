import "../styles/SidebarContacts.scss";

import { Toolbar } from "./Toolbar";
import { ItemContact } from "./ItemContact";
import { HeaderContacs } from "./HeaderContacs";
import { InputIcon } from "./InputIcon";
import { ButtonIcon } from "./ButtonIcon";
import { useContacts } from "../hooks/useContacts";
import { useHomeChat } from "../hooks/useHomeChat";
export const SidebarContacts = () => {
  const {
    handleSearch,
    handleSelectChat,
    handleSelectConversation,
    user,
    userName,
    setUserName,
    chats,
    err,
  } = useContacts();

  return (
    <aside className="side-contacts">
      <header className="container-header">
        <HeaderContacs />
        <div className="container-input-search-filter">
          <form onSubmit={handleSearch} className="container-input-search">
            <InputIcon
              type="text"
              placeholder="Busca un chat o inicia uno nuevo"
              value={userName}
              className="search-user"
              onChange={(e) => setUserName(e.target.value)}
            />
          </form>
          <ButtonIcon
            srcImg={"/icons/icon-glass.svg"}
            altImg={"button-sear-user"}
            event={handleSearch}
          />
        </div>
      </header>
      <section className="container-chats">
        {err && <span>User not found!</span>}
        <div className="container-chats__content-user-found">
          {user ? (
            <div className="container-chats__user-found">
              <h3>Usario Encontrado</h3>
              <span>"Seleccionalo para agregarlo a tu feed"</span>
              <ItemContact contact={user} eventClick={handleSelectChat} />
            </div>
          ) : null}
        </div>
        <ul className="container-chats__list">
          {chats
            ? Object.entries(chats)
                ?.sort((a, b) => b[1].date - a[1].date)
                .map((chat) => (
                  <ItemContact
                    key={chat[0]}
                    contact={chat[1].userInfo}
                    lastMessage={chat[1].lastMessage?.msg}
                    eventClick={() =>
                      handleSelectConversation(chat[1].userInfo)
                    }
                  />
                ))
            : null}
        </ul>
      </section>
      <footer className="container-footer">
        <Toolbar />
      </footer>
    </aside>
  );
};
