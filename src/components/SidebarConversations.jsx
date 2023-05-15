import { useEffect, useState } from "react";
import { auth, dbFirestore } from "../firebase/firebase-config";

import {
  collection,
  query,
  limit,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import { HeaderConversation } from "./HeaderConversation";
import { SedMessage } from "./SedMessage";

import "../styles/SidebarConversation.scss";
export const SidebarConversations = () => {
  const [messages, setMessages] = useState([]);
  const { userID } = auth.currentUser;
  useEffect(() => {
    const q = query(
      collection(dbFirestore, "messages"),
      orderBy("createdAt"),
      limit(50)
    );

    const data = onSnapshot(q, (QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log(messages);
      setMessages(messages);
    });

    return () => data;
  }, []);
  return (
    <section className="side-conversation">
      <HeaderConversation />
      <section className="container-conversation">
        <ul className="container-conversation__list">
          {messages &&
            messages.map((message, id, uid, photoURL) => (
              <li
                key={id}
                className={`container-conversation__list-item ${
                  userID === auth.currentUser.uid ? "sent" : "received"
                }`}
              >
                <div className={`msg container-conversation__list-item-msg `}>
                  {/* <img src={message.photoURL} /> */}
                  <p>{message.text}</p>
                </div>
              </li>
            ))}
        </ul>
      </section>
      <SedMessage />
    </section>
  );
};
