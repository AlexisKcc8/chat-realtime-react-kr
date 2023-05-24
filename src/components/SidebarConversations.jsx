import "../styles/SidebarConversation.scss";
import { useContext, useEffect, useState } from "react";
import { auth, dbFirestore } from "../firebase/firebase-config";

import {
  collection,
  query,
  limit,
  orderBy,
  onSnapshot,
  doc,
} from "firebase/firestore";

import { HeaderConversation } from "./HeaderConversation";
import { SedMessage } from "./SedMessage";

import { ChatContext } from "../context/ChatContext";
import { ItemMessage } from "./ItemMessage";
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

  // console.log(messages);
  return (
    <section className="side-conversation">
      <HeaderConversation />
      <section className="container-conversation">
        <ul className="container-conversation__list">
          {messages.map((m) => (
            <ItemMessage key={window.crypto.randomUUID()} message={m} />
          ))}
        </ul>
      </section>
      <SedMessage />
    </section>
  );
};
