import { css } from "@emotion/react";
import { FC } from "react";
import { primaryColor, secondaryColor } from "../styles";

type ButtonProps = {
  icon: React.ReactNode;
  label: string;
  handleClick: () => void;
};

const ButtonStyle = css({
  display: "flex",
  flexDirection: "row",
  gap: "0.5rem",
  justifyContent: "flex-start",
  alignItems: "center",
  backgroundColor: primaryColor,
  fontSize: "1rem",
  border: 0,
  padding: "8px 12px",
  borderRadius: "10px",
  color: "white",
  transition: "ease-in-out 0.2s",
  [`:hover`]: {
    backgroundColor: secondaryColor,
    color: "black",
  },
});

const Button: FC<ButtonProps> = ({ icon, label, handleClick }) => {
  return (
    <button css={ButtonStyle} onClick={handleClick}>
      <span>{label}</span>
      {icon}
    </button>
  );
};

export default Button;
