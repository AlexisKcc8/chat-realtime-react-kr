import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { secondsToHour } from "../helpers/Hours";

export const ItemMessage = (props) => {
  const { message } = props;
  const { id, date, msgImage, msgText, senderId } = message;
  const { currentUser } = useContext(AuthContext);

  return (
    <li
      className={`item-message ${
        senderId === currentUser.uid ? "sent" : "received"
      }`}
    >
      {msgImage ? (
        <div className="content-item-img-message">
          <img
            className="content-item-img-message__img"
            src={msgImage}
            alt=""
          />
        </div>
      ) : null}
      {msgText ? (
        <div className="content-item-message">
          <p className="content-item-message__text">{msgText}</p>
          <span className="content-item-message__hour">
            {secondsToHour(date.seconds)}
          </span>
        </div>
      ) : null}

      {/* <span>{toDateTime(date.seconds)}</span> */}
    </li>
  );
};
