import { useEffect } from "react";
import "../styles/ItemContact.scss";
export const ItemContact = (props) => {
  const { contact, lastMessage = "", eventClick } = props;
  const { uid, displayName, photoURL } = contact;
  // useEffect(() => {
  //   console.log(contact);
  // }, []);

  return (
    <li className="item-contact" onClick={eventClick}>
      <img
        className="item-contact__avatar"
        src={photoURL}
        alt={`avatar-${displayName}`}
      />
      <section className="item-contact__section-info">
        <article className="container-name-hour">
          <h4 className="container-name-hour__name">{displayName}</h4>
          <span className="container-name-hour__hour">12:00pm</span>
        </article>
        {lastMessage ? (
          <p className="item-contact__section-info-last-message">
            {lastMessage}
          </p>
        ) : null}
      </section>
    </li>
  );
};
