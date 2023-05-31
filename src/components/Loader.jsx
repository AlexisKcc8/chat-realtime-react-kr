import "../styles/Loader.scss";

export const Loader = (props) => {
  const { colorBorder } = props;
  return (
    <span
      className="loader"
      style={{ border: `5px solid  ${colorBorder}` }}
    ></span>
  );
};
