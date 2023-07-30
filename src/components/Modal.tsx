import { css } from "@emotion/react";
import { FC } from "react";

type ModalProps = {
  title: string;
  children: React.ReactNode;
};

const ModalStyle = css({
  position: "fixed",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const ModalContentStyle = css({
  width: "50%",
  backgroundColor: "#fff",
  padding: "3rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
});

const Modal: FC<ModalProps> = ({ title, children }) => {
  return (
    <div css={ModalStyle}>
      <div css={ModalContentStyle}>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;
