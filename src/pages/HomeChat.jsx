import { InputIcon } from "../components/InputIcon";
import { SidebarContacts } from "../components/SidebarContacts";
import { SidebarConversations } from "../components/SidebarConversations";

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
