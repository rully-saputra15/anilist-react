import { css } from "@emotion/react";
import facepaint from "facepaint";

const breakpoints = [576, 768, 992, 1200];

export const mq = facepaint(
  breakpoints.map((bp) => `@media (min-width: ${bp}px)`)
);

export const backgroundColor = "#F6F4EB";
export const primaryColor = "#4682A9";
export const secondaryColor = "#749BC2";
export const tertiaryColor = "#91C8E4";

export const rowContainerStyle = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  flexWrap: "wrap",
  gap: "1rem",
});

export const cardContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "0.5rem",
  padding: "0.5rem",
  flex: "1 0 40%",
  width: "40%",
  borderRadius: "1rem",
  border: `2px solid ${secondaryColor}`,
});

export const animeTitle = css({
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  textAlign: "center",
  fontWeight: "bold",
});

export const animeBanner = css({
  width: "100%",
  height: "10rem",
  objectFit: "cover",
  borderRadius: "1rem",
});

export const animeDetailHeaderContainer = css({
  marginTop: "-2rem",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  gap: "2rem",
  backgroundColor: backgroundColor,
  padding: "0.2rem",
});

export const animeDetailHeaderInformationContainer = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: "0.5rem",
});

export const animeDetailCover = css({
  width: "10rem",
  height: "10rem",
  objectFit: "cover",
  borderRadius: "1rem",
  shadow: "0 10px 10px rgba(0, 0, 0, 0.5)",
});
