import { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import {
  serverTimestamp,
  updateDoc,
  doc,
  Timestamp,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";
import { dbFirestore, storage } from "../firebase/firebase-config";
import { AuthContext } from "../context/AuthContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const useConversation = () => {
  const [msg, setMsg] = useState("");
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);

  const inputMessage = useRef(null);

  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(dbFirestore, "chats", data.chatId), (doc) => {
      if (doc.exists()) {
        setMessages(doc.data().messages);
      }
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  const handleSend = async (e) => {
    e.preventDefault();

    if (msg == "" && img == null)
      return alert(
        "por favor, escriba un mensaje antes de presionar el boton de enviar"
      );
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
    }
    setMsg("");
    inputMessage.current?.focus();
    setImg(null);
  };

  return { messages, data, handleSend, inputMessage, msg, setMsg, setImg };
};
