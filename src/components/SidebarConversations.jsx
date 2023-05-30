import "../styles/SidebarConversation.scss";

import { HeaderConversation } from "./HeaderConversation";
import { SedMessage } from "./SedMessage";
import { ItemMessage } from "./ItemMessage";
import { InfoCodeChat } from "../pages/InfoCodeChat";
import { useConversation } from "../hooks/useConversation";
export const SidebarConversations = () => {
  const { messages, data, containerMessages, containerSideChats } =
    useConversation();

  return (
    <section>
      {data.chatId == "null" ? (
        <InfoCodeChat />
      ) : (
        <div className="side-conversation" ref={containerSideChats}>
          <div className="container-header">
            <HeaderConversation />
          </div>
          <section className="container-conversation">
            <ul
              className="container-conversation__list"
              ref={containerMessages}
            >
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
