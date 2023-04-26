export const ButtonToolbar = (props) => {
  const { srcImg, altImg, nameButton } = props;
  return (
    <button className="button-toolbar">
      <img
        className="button-toolbar__imagen-button"
        src={srcImg}
        alt={altImg}
      />
      <figcaption className="button-toolbar__name-button">
        {nameButton}
      </figcaption>
    </button>
  );
};
