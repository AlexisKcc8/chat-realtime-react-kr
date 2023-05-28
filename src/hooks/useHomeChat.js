import { useRef } from "react";

export const useHomeChat = () => {
  const refSideContacts = useRef();
  const refSideConversation = useRef();

  const toggleViewSideContacts = () => {
    console.log(refSideContacts);
    // refSideContacts.current?.classList.toggle("toggleSideContacts");
  };
  const toggleViewSideConversations = () => {
    refSideConversation.current?.classList.toggle("toggleSideConversation");
  };

  return {
    refSideContacts,
    toggleViewSideContacts,
    refSideConversation,
    toggleViewSideConversations,
  };
};
