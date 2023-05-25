import "../styles/SedMessage.scss";
import { useContext, useState } from "react";
import { dbFirestore, storage } from "../firebase/firebase-config";
import {
  serverTimestamp,
  updateDoc,
  doc,
  Timestamp,
  arrayUnion,
} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Iconpaperclip } from "./icons/Iconpaperclip";

export const SedMessage = () => {
  const [msg, setMsg] = useState("");
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, window.crypto.randomUUID());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(dbFirestore, "chats", data.chatId), {
              messages: arrayUnion({
                id: window.crypto.randomUUID(),
                msg,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(dbFirestore, "chats", data.chatId), {
        messages: arrayUnion({
          id: window.crypto.randomUUID(),
          msg,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(dbFirestore, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        msg,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(dbFirestore, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        msg,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setMsg("");
    setImg(null);
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
    <div className="container-sedMessage">
      <label htmlFor="file-send">
        <Iconpaperclip />
      </label>
      <input
        className="container-sedMessage__input-msg"
        type="text"
        placeholder="Message…"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <input
        type="file"
        id="file-send"
        style={{ display: "none" }}
        onChange={(e) => setImg(e.target.files[0])}
      />

      <button onClick={handleSend}>Send</button>
    </div>
  );
};
