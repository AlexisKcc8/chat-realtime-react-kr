import { useContext, useEffect, useRef, useState } from "react";
import { dbFirestore } from "../firebase/firebase-config";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  serverTimestamp,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { ReferenceContext } from "../context/ReferenceContext";

export const useContacts = () => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [err, setErr] = useState(false);
  const [chats, setChats] = useState([]);

  const { toggleSideContacts } = useContext(ReferenceContext);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(dbFirestore, "userChats", currentUser.uid),
        (doc) => {
          if (!doc.data()) {
            return setChats(null);
          }
          setChats(doc.data());
        }
      );

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const q = query(
        collection(dbFirestore, "users"),
        where("displayName", "==", userName)
      );
      const querySnapShot = await getDocs(q);
      querySnapShot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (myErr) {
      console.log(myErr);
      setErr(myErr);
    }
  };

  const handleSelectChat = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(dbFirestore, "chats", combinedId));
      if (!res.exists()) {
        //createa chat in chats collections
        await setDoc(doc(dbFirestore, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(dbFirestore, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(dbFirestore, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
    }

    setUser(null);
    setUserName("");
  };

  const handleSelectConversation = (chat) => {
    toggleSideContacts();
    dispatch({ type: "CHANGE_USER", payload: chat });
  };

  return {
    handleSearch,
    handleSelectChat,
    handleSelectConversation,
    user,
    userName,
    setUserName,
    chats,
    err,
  };
};
