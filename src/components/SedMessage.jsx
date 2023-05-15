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

  const styleContainerSedMessage = {
    width: "100%",
    height: "5rem",
    display: "flex",
    border: "1px solid red",
  };
  const styleContainerInputMessage = { width: "85%" };
  const styleContainerButtonMessage = { width: "15%" };
  return (
    <div style={styleContainerSedMessage}>
      <input
        type="text"
        placeholder="Message…"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        style={styleContainerInputMessage}
      />
      <button style={styleContainerButtonMessage} onClick={sendMsg}>
        Send
      </button>
    </div>
  );
};
