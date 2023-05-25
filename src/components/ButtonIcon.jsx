import "../styles/ButtonIcon.scss";
export const ButtonIcon = (props) => {
  const { srcImg, altImg, nameButton, event, children } = props;
  return (
    <button className="button-icon" onClick={event}>
      {srcImg ? (
        <img className="button-icon__img" src={srcImg} alt={altImg} />
      ) : null}

      {nameButton == "" ? null : (
        <figcaption className="button-icon__name-button">
          {nameButton}
        </figcaption>
      )}
      {children ? children : null}
    </button>
  );
};
