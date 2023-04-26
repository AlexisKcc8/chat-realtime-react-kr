import { ButtonToolbar } from "./ButtonToolbar";

export const Toolbar = () => {
  return (
    <footer className="container-toolbar">
      <ButtonToolbar
        srcImg="/icons/icon-chats.svg"
        altImg="icon-chat"
        nameButton="Chats"
      />
      <ButtonToolbar
        srcImg="/icons/icon-group.svg"
        altImg="icon-communities"
        nameButton="Communites"
      />
      <ButtonToolbar
        srcImg="/icons/icon-status.svg"
        altImg="icon-status"
        nameButton="Status"
      />
      <ButtonToolbar
        srcImg="/icons/icon-phone.svg"
        altImg="icon-phone"
        nameButton="Calls"
      />
    </footer>
  );
};
