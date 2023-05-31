import "../styles/InputIcon.scss";
export const InputIcon = (props) => {
  const {
    srcImg = "",
    altImg,
    type = "text",
    isRequired = true,
    placeholder,
    name,
    onChange,
    onKeyDown,
    value,
    id,
    className,
    minlength = 1,
  } = props;
  return (
    <div className="form-wrapper-input">
      {srcImg == "" ? null : (
        <img className="form-wrapper-input__img" src={srcImg} alt={altImg} />
      )}
      <input
        className={`form-wrapper-input__input ${className}`}
        type={type}
        required={isRequired}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        minLength={minlength}
        id={id}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};
