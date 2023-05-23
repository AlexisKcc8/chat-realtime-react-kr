import { useEffect } from "react";
import "../styles/ItemContact.scss";
export const ItemContact = (props) => {
  const { contact, eventClick } = props;
  const { uid, displayName, photoURL } = contact;
  // useEffect(() => {
  //   console.log(displayName);
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
        {/* <p className="item-contact__section-info-last-message">{lastMessage}</p> */}
      </section>
    </li>
  );
};
