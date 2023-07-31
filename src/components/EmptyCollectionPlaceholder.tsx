import { css } from "@emotion/react";

const EmptyCollectionPlaceholder = () => {
  return (
    <div
      css={css({
        fontSize: "0.5rem",
        fontWeight: "bold",
        padding: "1rem",
        margin: "1rem",
        backgroundColor: "rgba(218,218,218,0.3)",
        borderRadius: "10px",
        textAlign: "center",
      })}
    >
      Anime not available in this collection
    </div>
  );
};

export default EmptyCollectionPlaceholder;
