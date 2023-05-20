import "../styles/SidebarContacts.scss";

import { Toolbar } from "./Toolbar";
import { contacts } from "../database/contacts-fake";
import { ItemContact } from "./ItemContact";
import { HeaderContacs } from "./HeaderContacs";
import { InputIcon } from "./InputIcon";
import { useContext, useState } from "react";
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
} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
export const SidebarContacts = () => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async (e) => {
    e.preventDefault();

    const q = query(
      collection(dbFirestore, "users"),
      where("displayName", "==", userName)
    );

    try {
      const querySnapShot = await getDocs(q);
      querySnapShot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      console.log(error);
      setErr(error);
    }
  };
  const example = () => {
    console.log(user);
  };
  const handleSelect = async () => {
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

        console.log(combinedId);
      }
    } catch (err) {
      console.log(err);
    }

    setUser(null);
    setUserName("");
  };

  return (
    <aside className="side-contacts">
      <HeaderContacs />
      <div className="container-input-search-filter">
        <form onSubmit={handleSearch} className="container-input-search">
          <InputIcon
            srcImg="/icons/icon-glass.svg"
            altImg="icon-glass"
            type="text"
            placeholder="Busca un chat o inicia uno nuevo"
            value={userName}
            className="search-user"
            onChange={(e) => setUserName(e.target.value)}
          />
        </form>
        <img onClick={example} src="/icons/icon-glass.svg" alt="" />
      </div>
      {err || !user ? <h3>Usuario no encontrado</h3> : null}
      <section className="container-chats">
        <div>
          {user ? (
            <ItemContact contact={user} eventClick={handleSelect} />
          ) : (
            <h3 style={{ margin: "1rem 2rem" }}>
              Sin Contactos por el momento
            </h3>
          )}
        </div>
        <ul className="container-chats__list">
          {/* <p>{user}</p> */}

          {contacts.map((contact) => (
            <ItemContact key={contact.id} contact={contact} />
          ))}
        </ul>
      </section>
      <Toolbar />
    </aside>
  );
};
