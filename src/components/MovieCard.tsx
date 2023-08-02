import { FC } from "react";
import { animeScoreCard, animeTitleCardList, cardImageStyle } from "../styles";
import { SerializedStyles, css } from "@emotion/react";
import { AiFillStar } from "react-icons/ai";

type MovieCardProps = {
  id: number;
  title: string;
  coverImage: string;
  averageScore: number | string;
  style: SerializedStyles;
  handleClick: () => void;
};

const MovieCard: FC<MovieCardProps> = ({
  id,
  title,
  coverImage,
  averageScore,
  style,
  handleClick,
}) => {
  return (
    <div key={id} css={style} onClick={handleClick}>
      <img src={coverImage} alt={title} css={cardImageStyle} />
      <div css={animeTitleCardList}>{title}</div>
      <div css={animeScoreCard}>
        <AiFillStar css={css({ color: "yellow" })} />
        {averageScore}
      </div>
    </div>
  );
};

export default MovieCard;
