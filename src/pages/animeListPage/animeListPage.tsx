import { FC } from "react";
import { GetAnimeListQuery } from "../../__generated__/graphql";
import {
  cardContainerStyle,
  animeTitle,
  rowContainerStyle,
} from "../../styles";

type AnimeListPageProps = {
  animeList?: GetAnimeListQuery;
  handleGoToAnimeDetail: (id: number) => void;
};

const AnimeListPage: FC<AnimeListPageProps> = ({
  animeList,
  handleGoToAnimeDetail,
}) => {
  return (
    <div css={rowContainerStyle}>
      {animeList?.Page?.media?.map((anime) => {
        return (
          <div
            key={anime?.id}
            css={cardContainerStyle}
            onClick={() => handleGoToAnimeDetail(anime?.id ?? 0)}
          >
            <img
              src={anime?.coverImage?.medium || ""}
              alt={anime?.title?.english || ""}
            />
            <p css={animeTitle}>{anime?.title?.english}</p>
          </div>
        );
      })}
    </div>
  );
};

export default AnimeListPage;
