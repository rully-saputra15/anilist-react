import { css } from "@emotion/react";
import { brokenWhiteColor, charcoalColor, tertiaryColor } from "../styles";
import { NavLink } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { BsCollectionFill } from "react-icons/bs";
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
  zIndex: 100,
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
  return (
    <nav css={containerCss}>
      <span
        css={css({
          color: brokenWhiteColor,
          fontSize: "1.2rem",
        })}
      >
        AniList
      </span>
      <div css={menuCss}>
        <NavLink to="/" css={linkCss}>
          <GoHomeFill />
        </NavLink>
        <NavLink to="/collection" css={linkCss}>
          <BsCollectionFill />
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
