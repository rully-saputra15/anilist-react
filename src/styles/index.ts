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
export const charcoalColor = "#36454F";
export const brokenWhiteColor = "#F8F7F3";

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
  gap: "1rem",
  flexWrap: "wrap",
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
  filter: "drop-shadow(0 3px 3px rgba(0, 0, 0, 0.3))",
  transition: "ease-in-out 0.2s",
  cursor: "pointer",
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

export const animeTitleCardList = css({
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "flex",
  flexDirection: "column",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  fontSize: "0.8rem",
  fontWeight: "bold",
  position: "absolute",
  bottom: 0,
  padding: "8px 0",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  textAlign: "center",
  backgroundColor: blackColor,
  width: "100%",
  borderRadius: "0 0 12px 12px",
  background: "rgba(0, 0, 0, 0.5)",
  height: "3rem",
});

export const animeTitle = css({
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  fontSize: "0.8rem",
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
    "-webkit-linear-gradient(rgba(70, 130, 169, 1), rgba(145, 200, 228, 1))",
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
  backgroundColor: charcoalColor,
  fontSize: "1rem",
  border: 0,
  padding: "8px 12px",
  borderRadius: "10px",
  color: "white",
  transition: "ease-in-out 0.2s",
  cursor: "pointer",
  [`:hover`]: {
    backgroundColor: brokenWhiteColor,
    color: charcoalColor,
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

export const badgeStyle = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: charcoalColor,
  padding: "4px 16px",
  borderRadius: "14px",
  fontSize: "0.7rem",
  color: brokenWhiteColor,
});

export const floatingActionButtonStyle = css({
  position: "fixed",
  bottom: "40px",
  right: "40px",
  height: "75px",
  width: "75px",
  zIndex: 100,
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  cursor: "pointer",
  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
});

export const horizontalScrollStyle = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "16px",
  overflow: "auto",
  whiteSpace: "nowrap",
});

export const buttonPage = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "6px 12px",
  backgroundColor: "white",
  borderRadius: "8px",
  border: `1px solid ${charcoalColor}`,
})

export const buttonCurrentPage = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "6px 12px",
  backgroundColor: charcoalColor,
  color: brokenWhiteColor,
  fontWeight: "bold",
  borderRadius: "8px",
  border: `1px solid ${charcoalColor}`,

})