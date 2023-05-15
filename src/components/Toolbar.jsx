import URL_ICON_CHAT from "/icons/icon-chats.svg";
import URL_ICON_GROUP from "/icons/icon-group.svg";
import URL_ICON_STATUS from "/icons/icon-status.svg";
import URL_ICON_PHONE from "/icons/icon-phone.svg";
import { ButtonIcon } from "./ButtonIcon";

export const Toolbar = () => {
  return (
    <footer className="container-toolbar">
      <ButtonIcon
        srcImg={URL_ICON_CHAT}
        altImg="icon-chat"
        nameButton="Chats"
      />
      <ButtonIcon
        srcImg={URL_ICON_GROUP}
        altImg="icon-communities"
        nameButton="Communites"
      />
      <ButtonIcon
        srcImg={URL_ICON_STATUS}
        altImg="icon-status"
        nameButton="Status"
      />
      <ButtonIcon
        srcImg={URL_ICON_PHONE}
        altImg="icon-phone"
        nameButton="Calls"
      />
    </footer>
  );
};
