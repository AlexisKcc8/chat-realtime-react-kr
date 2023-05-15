import { HeaderConversation } from "./HeaderConversation";
import "../styles/SidebarConversation.scss";
import { SedMessage } from "./SedMessage";
export const SidebarConversations = () => {
  return (
    <section className="side-conversation">
      <HeaderConversation />
      <section className="container-conversation">
        <ul className="container-conversation__list">
          <li>si</li>
        </ul>
      </section>
      <SedMessage />
    </section>
  );
};
