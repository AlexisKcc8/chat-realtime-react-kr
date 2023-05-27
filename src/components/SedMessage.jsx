import "../styles/SedMessage.scss";
import { Iconpaperclip } from "./icons/Iconpaperclip";
import { IconNext } from "./icons/IconNext";
import { useConversation } from "../hooks/useConversation";
export const SedMessage = () => {
  const { handleSend, inputMessage, msg, setMsg, setImg } = useConversation();

  return (
    <form onSubmit={handleSend} className="container-sedMessage">
      <label htmlFor="file-send">
        <Iconpaperclip />
      </label>
      <input
        ref={inputMessage}
        className="container-sedMessage__input-msg"
        type="text"
        placeholder="Message…"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <input
        type="file"
        id="file-send"
        style={{ display: "none" }}
        onChange={(e) => setImg(e.target.files[0])}
      />
      <button className="container-sedMessage__btn-send-msg">
        <IconNext bgColor="#fff" />
      </button>
    </form>
  );
};
