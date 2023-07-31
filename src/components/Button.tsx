import { FC } from "react";
import { buttonStyle } from "../styles";

type ButtonProps = {
  icon: React.ReactNode;
  label: string;
  handleClick: () => void;
};

const Button: FC<ButtonProps> = ({ icon, label, handleClick }) => {
  return (
    <button css={buttonStyle} onClick={handleClick}>
      <span>{label}</span>
      {icon}
    </button>
  );
};

export default Button;
