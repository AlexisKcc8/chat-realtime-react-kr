import "../styles/ItemContact.scss";
import { secondsToHour } from "../helpers/Hours";
export const ItemContact = (props) => {
  const { contact, lastMessage = "", eventClick, lastHour } = props;
  const { uid, displayName, photoURL } = contact;

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
          <p className="container-name-hour__hour">{secondsToHour(lastHour)}</p>
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
