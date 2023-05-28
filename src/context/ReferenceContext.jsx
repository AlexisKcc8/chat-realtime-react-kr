import { useRef } from "react";
import { createContext } from "react";

export const ReferenceContext = createContext();
export const ReferenceContextProvider = ({ children }) => {
  const sideContacts = useRef(null);
  const sideConversations = useRef(null);

  const toggleSideContacts = () => {
    sideContacts.current?.classList.add("toggle-side-contacts-conversations");
    sideConversations.current?.classList.remove(
      "toggle-side-contacts-conversations"
    );
  };
  const toggleSideConversations = () => {
    sideConversations.current?.classList.add(
      "toggle-side-contacts-conversations"
    );
    sideContacts.current?.classList.remove(
      "toggle-side-contacts-conversations"
    );
  };
  let refs = {
    sideContacts,
    sideConversations,
    toggleSideContacts,
    toggleSideConversations,
  };
  return (
    <ReferenceContext.Provider value={refs}>
      {children}
    </ReferenceContext.Provider>
  );
};
