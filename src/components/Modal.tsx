import { css } from "@emotion/react";
import { FC } from "react";
import { IoCloseSharp } from "react-icons/io5";

type ModalProps = {
  title: string;
  children: React.ReactNode;
  handleCloseButton: () => void;
};

const modalStyle = css({
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
  zIndex: 100,
});

const modalContentStyle = css({
  width: "50%",
  backgroundColor: "#fff",
  padding: "3rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  borderRadius: "15px",
  position: "relative",
});

const Modal: FC<ModalProps> = ({ title, children, handleCloseButton }) => {
  return (
    <div css={modalStyle}>
      <div css={modalContentStyle}>
        <IoCloseSharp
          css={css({
            position: "absolute",
            top: "0",
            right: "0",
            paddingTop: "10px",
            paddingRight: "10px",
            fontSize: "2rem",
            cursor: "pointer",
          })}
          onClick={handleCloseButton}
        />
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;
