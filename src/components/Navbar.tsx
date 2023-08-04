import { css } from "@emotion/react";
import { brokenWhiteColor, charcoalColor } from "../styles";
import { NavLink, useNavigate } from "react-router-dom";
import { BsCollectionFill } from "react-icons/bs";
import { useCallback } from "react";
const containerCss = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  backgroundColor: charcoalColor,
  fontSize: "1rem",
  padding: "1rem",
  flex: "1 0 auto",
  position: "sticky",
  top: 0,
  zIndex: 1000,
});

const menuCss = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1rem",
});

const linkCss = css({
  textDecoration: "none",
  color: brokenWhiteColor,
  fontSize: "1.5rem",
});

const Navbar = () => {
  const navigate = useNavigate();
  const handleGoToHome = useCallback(() => {
    navigate("/");
  }, []);
  return (
    <nav css={containerCss}>
      <span
        css={css({
          color: brokenWhiteColor,
          fontSize: "1.2rem",
          fontWeight: "bold",
          textDecoration: "underline",
          cursor: "pointer",
        })}
        onClick={handleGoToHome}
      >
        AniList
      </span>
      <div css={menuCss}>
        <NavLink to="/collection" css={linkCss}>
          <BsCollectionFill />
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
