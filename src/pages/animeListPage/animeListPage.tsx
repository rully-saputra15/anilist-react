import { FC } from "react";
import { GetAnimeListQuery } from "../../__generated__/graphql";
import {
  cardContainerStyle,
  animeTitle,
  rowContainerStyle,
  animeScoreCard,
  rowContainerStartCenterStyle,
  rowContainerBetweenStyle,
  cardImageStyle,
  buttonStyle,
  selectedCardContainerStyle,
  animeTitleCardList,
} from "../../styles";
import "./style.css";
import { css } from "@emotion/react";
import { AiFillStar } from "react-icons/ai";
import ButtonBasic from "../../components/ButtonBasic";
import Loading from "../../components/Loading";
import { Anime } from "../../interfaces";

type AnimeListPageProps = {
  isLoading: boolean;
  isBulkMode: boolean;
  currentPage: number;
  selectedAnime: Anime[];
  animeList?: GetAnimeListQuery;
  observerTarget: React.MutableRefObject<null>;
  handleGoToAnimeDetail: (id: number) => void;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  handleEnableBulkMode: () => void;
  handleAddSelectedAnime: (anime: Anime) => void;
  handleConfirmBulkAdd: () => void;
};

const AnimeListPage: FC<AnimeListPageProps> = ({
  isLoading,
  isBulkMode,
  currentPage,
  selectedAnime,
  animeList,
  observerTarget,
  handleGoToAnimeDetail,
  handlePreviousPage,
  handleNextPage,
  handleEnableBulkMode,
  handleAddSelectedAnime,
  handleConfirmBulkAdd,
}) => {
  return (
    <section>
      {isBulkMode && (
        <div
          css={css({
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
          })}
          onClick={() => handleConfirmBulkAdd()}
        >
          Confirm
        </div>
      )}
      <div css={rowContainerBetweenStyle}>
        <div css={rowContainerStartCenterStyle}>
          <ButtonBasic label="<" handleClick={handlePreviousPage} />
          <span>{currentPage}</span>
          <ButtonBasic label=">" handleClick={handleNextPage} />
        </div>
        <ButtonBasic label="Bulk" handleClick={() => handleEnableBulkMode()} />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div css={rowContainerStyle}>
            {animeList?.Page?.media?.map((anime) => {
              const isSelected =
                selectedAnime.findIndex(
                  (el: Anime) => el.id === (anime?.id ?? 0)
                ) !== -1;

              const newAnime: Anime = {
                id: anime?.id ?? 0,
                title: anime?.title?.english ?? anime?.title?.native ?? "",
                coverImage: anime?.coverImage?.large ?? "",
              };

              return (
                <div
                  key={anime?.id}
                  css={
                    isSelected ? selectedCardContainerStyle : cardContainerStyle
                  }
                  onClick={() =>
                    isBulkMode
                      ? handleAddSelectedAnime(newAnime)
                      : handleGoToAnimeDetail(anime?.id ?? 0)
                  }
                >
                  <img
                    src={anime?.coverImage?.large || ""}
                    alt={anime?.title?.english || ""}
                    css={cardImageStyle}
                  />
                  <div css={animeTitleCardList}>
                    {anime?.title?.english ?? anime?.title?.native}
                  </div>
                  <div css={animeScoreCard}>
                    <AiFillStar css={css({ color: "yellow" })} />
                    {anime?.averageScore ? anime?.averageScore : "N/A"}
                  </div>
                </div>
              );
            })}
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
    </section>
  );
};

export default AnimeListPage;
