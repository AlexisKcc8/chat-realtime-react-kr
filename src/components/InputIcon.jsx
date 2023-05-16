import "../styles/InputIcon.scss";
export const InputIcon = (props) => {
  const { srcImg, altImg, type = "text", required, placeholder } = props;
  return (
    <div className="form-wrapper-input">
      <img className="form-wrapper-input__img" src={srcImg} alt={altImg} />
      <input
        className="form-wrapper-input__input"
        type={type}
        required
        placeholder={placeholder}
      />
    </div>
  );
};
