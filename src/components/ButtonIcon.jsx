import "../styles/ButtonIcon.scss";
export const ButtonIcon = (props) => {
  const { srcImg, altImg, nameButton, event } = props;
  return (
    <button className="button-icon" onClick={event}>
      <img className="button-icon__img" src={srcImg} alt={altImg} />
      {nameButton == "" ? null : (
        <figcaption className="button-icon__name-button">
          {nameButton}
        </figcaption>
      )}
    </button>
  );
};
