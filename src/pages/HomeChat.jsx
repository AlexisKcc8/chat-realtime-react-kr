import { useRef } from "react";
import { SidebarContacts } from "../components/SidebarContacts";
import { SidebarConversations } from "../components/SidebarConversations";

import "../styles/HomeChat.scss";
export const HomeChat = () => {
  const sideContacts = useRef();
  const sideConversation = useRef();
  return (
    <section className="container-home-chat">
      <div ref={sideContacts} className="home-chat-side-contact">
        <SidebarContacts />
      </div>
      <div ref={sideConversation} className="home-chat-side-conversation">
        <SidebarConversations />
      </div>
    </section>
  );
};
