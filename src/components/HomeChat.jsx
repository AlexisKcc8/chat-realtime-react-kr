import { SidebarContacts } from "./SidebarContacts";
import { SidebarConversations } from "./SidebarConversations";

import "../styles/HomeChat.scss";
export const HomeChat = () => {
  return (
    <section className="container-home-chat">
      <div className="home-chat-side-contact">
        <SidebarContacts />
      </div>
      <div className="home-chat-side-conversation">
        <SidebarConversations />
      </div>
    </section>
  );
};
