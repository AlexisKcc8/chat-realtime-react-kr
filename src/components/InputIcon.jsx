import "../styles/InputIcon.scss";
export const InputIcon = (props) => {
  const {
    srcImg,
    altImg,
    type = "text",
    isRequired = true,
    placeholder,
    name,
    onChange,
    value,
    id,
  } = props;
  return (
    <div className="form-wrapper-input">
      {srcImg == "" ? null : (
        <img className="form-wrapper-input__img" src={srcImg} alt={altImg} />
      )}
      <input
        className="form-wrapper-input__input"
        type={type}
        required={isRequired}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        id={id}
      />
    </div>
  );
};
