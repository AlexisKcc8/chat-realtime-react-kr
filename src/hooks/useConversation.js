import { useContext, useEffect, useMemo, useRef, useState } from "react";
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
const INITIAL_STATE_MESSAGE = {
  msgText: "",
  msgImage: null,
};
export const useConversation = () => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const [myMessage, setMyMessage] = useState(INITIAL_STATE_MESSAGE);
  const [messages, setMessages] = useState([]);

  const inputMessage = useRef(null);
  const containerMessages = useRef(null);
  const containerSideChats = useRef(null);

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

  useEffect(() => {
    scrollChatToBottom();
  }, [messages]);

  const scrollChatToBottom = () => {
    if (containerMessages.current) {
      const chatContainer = containerMessages.current;
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };
  const handleChangeInputs = (e) => {
    let data = null;
    let prop = e.target.name;
    data = e.target.value;
    if (e.target.type == "file") {
      data = e.target.files[0];
    }
    setMyMessage({
      ...myMessage,
      [prop]: data,
    });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const { msgText, msgImage } = myMessage;

    if (msgText == "" && msgImage == null)
      return alert(
        "por favor, escriba un mensaje antes de presionar el boton de enviar"
      );
    if (msgImage) {
      const storageRef = ref(storage, window.crypto.randomUUID());
      const uploadTask = uploadBytesResumable(storageRef, msgImage);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(dbFirestore, "chats", data.chatId), {
              messages: arrayUnion({
                id: window.crypto.randomUUID(),
                msgText,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                msgImage: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(dbFirestore, "chats", data.chatId), {
        messages: arrayUnion({
          id: window.crypto.randomUUID(),
          msgText,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });

      await updateDoc(doc(dbFirestore, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          msgText,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(dbFirestore, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          msgText,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
    }
    setMyMessage(INITIAL_STATE_MESSAGE);
  };

  return {
    messages,
    data,
    handleSend,
    inputMessage,
    myMessage,
    handleChangeInputs,
    containerMessages,
    containerSideChats,
  };
};
