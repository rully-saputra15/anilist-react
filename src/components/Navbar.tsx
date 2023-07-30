import { css } from "@emotion/react";
import { tertiaryColor } from "../styles";
import { NavLink } from "react-router-dom";

const containerCss = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  backgroundColor: tertiaryColor,
  fontSize: "1rem",
  padding: "1rem",
  flex: "1 0 auto",
});

const menuCss = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  gap: "0.5rem",
});

const linkCss = css({
  textDecoration: "none",
  color: "black",
});

const Navbar = () => {
  return (
    <div css={containerCss}>
      <span>AniList</span>
      <div css={menuCss}>
        <NavLink to="/" css={linkCss}>
          Home
        </NavLink>
        <NavLink to="/collection" css={linkCss}>
          Collection
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
