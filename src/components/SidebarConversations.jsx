import "../styles/SidebarConversation.scss";
import { useContext, useEffect, useState } from "react";
import { dbFirestore } from "../firebase/firebase-config";

import { onSnapshot, doc } from "firebase/firestore";

import { HeaderConversation } from "./HeaderConversation";
import { SedMessage } from "./SedMessage";

import { ChatContext } from "../context/ChatContext";
import { ItemMessage } from "./ItemMessage";
import { InfoCodeChat } from "./InfoCodeChat";
export const SidebarConversations = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  useEffect(() => {
    const unSub = onSnapshot(doc(dbFirestore, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);
  console.log(data);
  return (
    <section>
      {data.chatId == "null" ? (
        <InfoCodeChat />
      ) : (
        <div className="side-conversation">
          <HeaderConversation />
          <section className="container-conversation">
            <ul className="container-conversation__list">
              {messages.map((m) => (
                <ItemMessage key={window.crypto.randomUUID()} message={m} />
              ))}
            </ul>
          </section>
          <SedMessage />
        </div>
      )}
    </section>
  );
};
