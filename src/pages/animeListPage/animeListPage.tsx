import { FC } from "react";
import { GetAnimeListQuery } from "../../__generated__/graphql";
import {
  cardContainerStyle,
  animeTitle,
  rowContainerStyle,
} from "../../styles";
import "./style.css";
import { css } from "@emotion/react";

type AnimeListPageProps = {
  isLoading: boolean;
  currentPage: number;
  animeList?: GetAnimeListQuery;
  observerTarget: React.MutableRefObject<null>;
  handleGoToAnimeDetail: (id: number) => void;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
};

const AnimeListPage: FC<AnimeListPageProps> = ({
  isLoading,
  currentPage,
  animeList,
  observerTarget,
  handleGoToAnimeDetail,
  handlePreviousPage,
  handleNextPage,
}) => {
  return (
    <>
      <div onClick={handlePreviousPage}>back</div>
      <div>{currentPage}</div>
      <div onClick={handleNextPage}>next</div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
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
                  <p css={animeTitle}>
                    {anime?.title?.english ?? anime?.title?.native}
                  </p>
                </div>
              );
            })}

            {/* <pre>{JSON.stringify(animeList?.Page?.pageInfo)}</pre> */}
          </div>
          <div
            css={css({
              fontSize: "1rem",
              textAlign: "center",
              paddingTop: "0.5rem",
            })}
            ref={observerTarget}
          >
            Load More
          </div>
        </>
      )}
    </>
  );
};

export default AnimeListPage;
