import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";

export const ItemMessage = (props) => {
  const { message } = props;
  const { id, date, img, msg, senderId } = message;
  const { currentUser } = useContext(AuthContext);
  const lastMessage = useRef();

  useEffect(() => {
    lastMessage.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [message]);

  return (
    <li
      ref={lastMessage}
      className={`item-message ${
        senderId === currentUser.uid ? "sent" : "received"
      }`}
    >
      {img ? (
        <div className="content-item-img-message">
          <img className="content-item-img-message__img" src={img} alt="" />
        </div>
      ) : null}
      {msg ? (
        <div className="content-item-message">
          <p>{msg}</p>
          {/* <span>now</span> */}
        </div>
      ) : null}

      {/* <span>{toDateTime(date.seconds)}</span> */}
    </li>
  );
};
