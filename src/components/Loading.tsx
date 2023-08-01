import { memo } from "react";
import { BeatLoader } from "react-spinners";
import { primaryColor } from "../styles";
import { css } from "@emotion/react";

const Loading = () => {
  return (
    <div
      css={css({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        height: "80vh",
      })}
    >
      <BeatLoader color={primaryColor} />
    </div>
  );
};

export default memo(Loading);
