import { FC, memo } from "react";
import { css } from "@emotion/react";
import { brokenWhiteColor, charcoalColor } from "../styles";

type ButtonBasicProps = {
  label: string;
  handleClick: () => void;
};

const ButtonBasic: FC<ButtonBasicProps> = ({ label, handleClick }) => {
  return (
    <button
      css={css({
        padding: "0.5rem 0.75rem",
        borderRadius: "8px",
        backgroundColor: "transparent",
        border: `1px solid ${charcoalColor}`,
        fontSize: "0.8rem",
        transition: "all 0.3s ease",
        fontWeight: "bold",
        cursor: "pointer",
        [":hover"]: {
          backgroundColor: charcoalColor,
          color: brokenWhiteColor,
        },
      })}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default memo(ButtonBasic);
