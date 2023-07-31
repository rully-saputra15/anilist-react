import { FC } from "react";
import { GetAnimeListQuery } from "../../__generated__/graphql";
import {
  cardContainerStyle,
  animeTitle,
  rowContainerStyle,
  animeScoreCard,
} from "../../styles";
import "./style.css";
import { css } from "@emotion/react";
import { AiFillStar } from "react-icons/ai";
import ButtonBasic from "../../components/ButtonBasic";

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
      <div css={rowContainerStyle}>
        <ButtonBasic label="prev" handleClick={handlePreviousPage} />
        <div>{currentPage}</div>
        <ButtonBasic label="next" handleClick={handleNextPage} />
      </div>
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
                    src={anime?.coverImage?.large || ""}
                    alt={anime?.title?.english || ""}
                    css={css({
                      width: "10rem",
                      height: "14rem",
                      borderRadius: "12px",
                    })}
                  />
                  <p css={animeTitle}>
                    {anime?.title?.english ?? anime?.title?.native}
                  </p>
                  <div css={animeScoreCard}>
                    <AiFillStar css={css({ color: "yellow" })} />
                    {anime?.averageScore ? anime?.averageScore : "N/A"}
                  </div>
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
