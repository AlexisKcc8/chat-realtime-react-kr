import "../styles/ItemContact.scss";
export const ItemContact = (props) => {
  const { contact } = props;
  const { id, name, lastMessage, avatar } = contact;
  const showConversation = () => {};
  return (
    <li className="item-contact">
      <img
        className="item-contact__avatar"
        src={avatar}
        alt={`avatar-${name}`}
      />
      <section className="item-contact__section-info">
        <article className="container-name-hour">
          <h4 className="container-name-hour__name">{name}</h4>
          <span className="container-name-hour__hour">12:00pm</span>
        </article>
        <p className="item-contact__section-info-last-message">{lastMessage}</p>
      </section>
    </li>
  );
};
