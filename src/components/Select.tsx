import { FC } from "react";
import { inputContainerStyle, inputLabelStyle, inputStyle } from "../styles";

type SelectProps = {
  id: string;
  label: string;
  options: string[];
};

const Select: FC<SelectProps> = ({ id, label, options }) => {
  return (
    <div css={inputContainerStyle}>
      <label css={inputLabelStyle}>{label}</label>
      <select id={id} name={id} css={inputStyle}>
        {options.map((value: string) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
