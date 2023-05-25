import "../styles/SidebarContacts.scss";

import { Toolbar } from "./Toolbar";
import { ItemContact } from "./ItemContact";
import { HeaderContacs } from "./HeaderContacs";
import { InputIcon } from "./InputIcon";
import { useContext, useEffect, useState } from "react";
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
export const SidebarContacts = () => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [err, setErr] = useState(false);
  const [chats, setChats] = useState([]);

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
      // console.log(q);
      const querySnapShot = await getDocs(q);
      querySnapShot.forEach((doc) => {
        // console.log(doc.data());
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
    dispatch({ type: "CHANGE_USER", payload: chat });
  };

  return (
    <aside className="side-contacts">
      <header className="container-header">
        <HeaderContacs />
        <div className="container-input-search-filter">
          <form onSubmit={handleSearch} className="container-input-search">
            <InputIcon
              type="text"
              placeholder="Busca un chat o inicia uno nuevo"
              value={userName}
              className="search-user"
              onChange={(e) => setUserName(e.target.value)}
            />
          </form>
          <img src="/icons/icon-glass.svg" alt="" />
        </div>
      </header>
      <section className="container-chats">
        {err && <span>User not found!</span>}
        <div className="container-chats__content-user-found">
          {user ? (
            <div className="container-chats__user-found">
              <h3>Usario Encontrado</h3>
              <ItemContact contact={user} eventClick={handleSelectChat} />
            </div>
          ) : null}
        </div>
        <ul className="container-chats__list">
          {chats
            ? Object.entries(chats)
                ?.sort((a, b) => b[1].date - a[1].date)
                .map((chat) => (
                  <ItemContact
                    key={chat[0]}
                    contact={chat[1].userInfo}
                    lastMessage={chat[1].lastMessage?.msg}
                    eventClick={() =>
                      handleSelectConversation(chat[1].userInfo)
                    }
                  />
                ))
            : null}
        </ul>
      </section>
      <footer className="container-footer">
        <Toolbar />
      </footer>
    </aside>
  );
};
