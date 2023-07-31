import { css } from "@emotion/react";
import { tertiaryColor } from "../styles";
import { NavLink } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { BsCollectionFill } from "react-icons/bs";
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
  alignItems: "center",
  gap: "1rem",
});

const linkCss = css({
  textDecoration: "none",
  color: "black",
  fontSize: "1.3rem",
});

const Navbar = () => {
  return (
    <div css={containerCss}>
      <span>AniList</span>
      <div css={menuCss}>
        <NavLink to="/" css={linkCss}>
          <GoHomeFill />
        </NavLink>
        <NavLink to="/collection" css={linkCss}>
          <BsCollectionFill />
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
