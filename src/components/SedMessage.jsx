import "../styles/SedMessage.scss";
import { Iconpaperclip } from "./icons/Iconpaperclip";
import { IconNext } from "./icons/IconNext";
import { useConversation } from "../hooks/useConversation";
export const SedMessage = () => {
  const { handleSend, myMessage, handleChangeInputs } = useConversation();

  return (
    <form onSubmit={handleSend} className="container-sedMessage">
      <label htmlFor="file-send" className="container-sedMessage__label-img">
        <Iconpaperclip />
      </label>
      <input
        className="container-sedMessage__input-msg"
        type="text"
        placeholder="Message…"
        name="msgText"
        autoComplete="off"
        onChange={handleChangeInputs}
        value={myMessage.msgText}
      />
      <input
        type="file"
        id="file-send"
        name="msgImage"
        style={{ display: "none" }}
        onChange={handleChangeInputs}
      />
      <button className="container-sedMessage__btn-send-msg">
        <IconNext bgColor="#fff" />
      </button>
    </form>
  );
};
