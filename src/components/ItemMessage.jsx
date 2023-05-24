import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export const ItemMessage = (props) => {
  const { message } = props;
  const { id, date, msg, senderId } = message;

  function toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
  }

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  return (
    <li
      className={`item-message ${
        senderId === currentUser.uid ? "sent" : "received"
      }`}
    >
      <div className="item-message__content">
        <p>{msg}</p>
        <img
          className="item-message__content-img"
          src={
            senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
        />
      </div>
      {/* <span>{toDateTime(date.seconds)}</span> */}
    </li>
  );
};
