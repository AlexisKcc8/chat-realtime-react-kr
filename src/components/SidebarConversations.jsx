import "../styles/SidebarConversation.scss";

import { HeaderConversation } from "./HeaderConversation";
import { SedMessage } from "./SedMessage";
import { ItemMessage } from "./ItemMessage";
import { InfoCodeChat } from "./InfoCodeChat";

import { useConversation } from "../hooks/useConversation";
export const SidebarConversations = () => {
  const { messages, data } = useConversation();

  return (
    <section>
      {data.chatId == "null" ? (
        <InfoCodeChat />
      ) : (
        <div className="side-conversation">
          <div className="container-header">
            <HeaderConversation />
          </div>
          <section className="container-conversation">
            <ul className="container-conversation__list">
              {messages
                ? messages.map((m) => (
                    <ItemMessage key={window.crypto.randomUUID()} message={m} />
                  ))
                : null}
            </ul>
          </section>
          <div className="container-footer">
            <SedMessage />
          </div>
        </div>
      )}
    </section>
  );
};
