import { useEffect, useState } from "react";
import { auth, dbFirestore } from "../firebase/firebase-config";
import { SedMessage } from "./SedMessage";
import {
  collection,
  query,
  limit,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
export const Chat = () => {
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
      setMessages(messages);
    });
    return () => data;
  }, []);

  return (
    <div>
      <button onClick={() => auth.signOut()}>Sign Out</button>
      {messages &&
        messages.map((message, id, uid, photoURL) => (
          <div
            key={id}
            className={`msg ${
              userID === auth.currentUser.uid ? "sent" : "received"
            }`}
          >
            <img src={message.photoURL} />
            <p>{message.text}</p>
          </div>
        ))}
      <SedMessage />
    </div>
  );
};
