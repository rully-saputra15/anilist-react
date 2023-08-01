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
export const redColor = "#ff5252";
export const blackColor = "#353839";
export const rowContainerStyle = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  flexWrap: "wrap",
  gap: "1rem",
});

export const rowContainerBetweenStyle = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "1rem",
  paddingBottom: "1rem",
});

export const rowContainerStartCenterStyle = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "1rem",
});

export const columnContainerStartCenterStyle = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
});

export const titlePageStyle = css({
  fontSize: "1.5rem",
  fontWeight: "bold",
});
export const cardContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "0.5rem",
  position: "relative",
  flex: "1 0 2",
  filter: "drop-shadow(0 3px 3px rgba(0, 0, 0, 0.3))",
  transition: "ease-in-out 0.2s",
  [`:hover`]: {
    transform: "scale(1.05) translateY(-5px)",
  },
});
export const selectedCardContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "0.5rem",
  position: "relative",
  flex: "1 0 2",
  filter: "drop-shadow(0 3px 3px rgba(0, 0, 0, 0.3))",
  transition: "ease-in-out 0.2s",
  [`:hover`]: {
    transform: "scale(1.05) translateY(-5px)",
  },
  opacity: "0.5",
  // background:
  //   "-webkit-linear-gradient(rgba(29, 38, 113, 0.8), rgba(195, 55, 100, 0.8))",
});

export const cardImageStyle = css({
  width: "10rem",
  height: "14rem",
  borderRadius: "12px",
});

export const animeTitle = css({
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",

  fontWeight: "bold",
  position: "absolute",
  bottom: "0",
  padding: "0 8px",
  color: "white",
  backgroundColor: blackColor,
  borderRadius: "12px",
});

export const animeScoreCard = css({
  display: "flex",
  flexDirection: "row",
  gap: "0.5rem",
  justifyContent: "flex-start",
  alignItems: "center",
  backgroundColor: "black",
  color: "white",
  position: "absolute",
  top: 0,
  right: 0,
  fontWeight: "bold",
  padding: "0.2rem",
  borderTopRightRadius: "12px",
  borderBottomLeftRadius: "12px",
});

export const animeBanner = css({
  width: "100%",
  height: "12rem",
  objectFit: "cover",
  borderRadius: "12px",
  opacity: "0.4",
});

export const animeDetailHeader = css({
  overflow: "hidden",
  position: "relative",
  borderRadius: "12px",
  background:
    "-webkit-linear-gradient(rgba(29, 38, 113, 0.8), rgba(195, 55, 100, 0.8))",
});
export const animeDetailHeaderContainer = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  gap: "2rem",
  position: "absolute",
  top: 10,
  left: 12,
  padding: "0.2rem",
  overflow: "hidden",
  zIndex: 100,
});

export const animeDetailHeaderInformationContainer = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: "0.5rem",
  backgroundColor: backgroundColor,
  borderRadius: "12px",
  padding: "0.5rem",
});

export const animeDetailCover = css({
  width: "10rem",
  height: "10rem",
  objectFit: "cover",
  borderRadius: "1rem",
  shadow: "0 10px 10px rgba(0, 0, 0, 0.5)",
});

export const modalFormStyle = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "100%",
  gap: "1rem",
});

export const collectionCardHeaderStyle = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "baseline",
  gap: "0.5rem",
  paddingTop: "0.5rem",
  fontSize: "1rem",
  fontWeight: "bold",
  paddingLeft: "1rem",
  paddingRight: "1rem",
});

export const primaryDividerStyle = css({
  borderTop: `1px solid ${primaryColor}`,
  width: "100%",
});
export const collectionCardStyle = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: "0.5rem",
  border: `1px solid ${primaryColor}`,
  borderRadius: "15px",
  backgroundColor: "white",
  filter: "drop-shadow(0 3px 3px rgba(0, 0, 0, 0.3))",
  marginBottom: "16px",
});

export const collectionCardContentStyle = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  gap: "0.5rem",
  alignItems: "center",
  padding: "0.5rem 1rem 1rem 1rem",
});

export const animeCardCollectionStyle = css({
  width: "5rem",
  height: "5rem",
  objectFit: "cover",
  borderRadius: "10px",
});

export const buttonStyle = css({
  display: "flex",
  flexDirection: "row",
  gap: "0.5rem",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: primaryColor,
  fontSize: "1rem",
  border: 0,
  padding: "8px 12px",
  borderRadius: "10px",
  color: "white",
  transition: "ease-in-out 0.2s",
  cursor: "pointer",
  [`:hover`]: {
    backgroundColor: secondaryColor,
    color: "black",
  },
});

export const inputContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "stretch",
  gap: "0.5rem",
});

export const inputLabelStyle = css({
  fontSize: "1rem",
  fontWeight: "bold",
  color: primaryColor,
});
export const inputStyle = css({
  padding: "8px 12px",
  borderRadius: "8px",
  border: `1px solid ${primaryColor}`,
  transition: "ease-in-out 0.2s",
  [`:focus`]: {
    outline: "2px solid ${primaryColor}",
  },
});
