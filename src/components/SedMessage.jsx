import { useState } from "react";
import { auth, dbFirestore } from "../firebase/firebase-config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
export const SedMessage = () => {
  const [msg, setMsg] = useState("");
  const messagesRef = collection(dbFirestore, "messages");

  const sendMsg = async (e) => {
    const { uid, photoURL } = auth.currentUser;

    await addDoc(messagesRef, {
      text: msg,
      createdAt: serverTimestamp(),
      uid: uid,
      photoURL: photoURL,
    });
    setMsg("");
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Message…"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <button onClick={sendMsg}>Send</button>
    </div>
  );
};
