import { FC } from "react";
import { inputContainerStyle, inputLabelStyle, inputStyle } from "../styles";

type InputProps = {
  name: string;
  label: string;
  placeholder: string;
};

const Input: FC<InputProps> = ({ name, label, placeholder }) => {
  return (
    <div css={inputContainerStyle}>
      <label css={inputLabelStyle}>{label}</label>
      <input css={inputStyle} name={name} placeholder={placeholder} />
    </div>
  );
};

export default Input;
