import "../styles/HomeChat.scss";

import { SidebarContacts } from "../components/SidebarContacts";
import { SidebarConversations } from "../components/SidebarConversations";
import { useContext } from "react";
import { ReferenceContext } from "../context/ReferenceContext";
export const HomeChat = () => {
  const { sideContacts, sideConversations } = useContext(ReferenceContext);
  return (
    <section className="container-home-chat">
      <div className="home-chat-side-contact" ref={sideContacts}>
        <SidebarContacts />
      </div>
      <div className="home-chat-side-conversation" ref={sideConversations}>
        <SidebarConversations />
      </div>
    </section>
  );
};
