import { FC } from "react";
import { GetAnimeListQuery } from "../../__generated__/graphql";
import {
  cardContainerStyle,
  rowContainerStyle,
  rowContainerStartCenterStyle,
  rowContainerBetweenStyle,
  selectedCardContainerStyle,
  floatingActionButtonStyle,
  buttonPage,
  buttonCurrentPage,
} from "../../styles";
import "./style.css";
import { css } from "@emotion/react";
import ButtonBasic from "../../components/ButtonBasic";
import Loading from "../../components/Loading";
import { Anime } from "../../interfaces";
import MovieCard from "../../components/MovieCard";

type AnimeListPageProps = {
  firstPage: number;
  lastPage: number;
  isLoading: boolean;
  isBulkMode: boolean;
  currentPage: number;
  selectedAnime: Anime[];
  animeList?: GetAnimeListQuery;
  observerTarget: React.MutableRefObject<null>;
  handleGoToAnimeDetail: (id: number) => void;
  handleClickPage: (page: number) => void;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  handleEnableBulkMode: () => void;
  handleAddSelectedAnime: (anime: Anime) => void;
  handleConfirmBulkAdd: () => void;
};

const AnimeListPage: FC<AnimeListPageProps> = ({
  firstPage,
  lastPage,
  isLoading,
  isBulkMode,
  currentPage,
  handleClickPage,
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
  const renderPageNumbers = () => {
    const pages: JSX.Element[] = [];

    for (let idx = firstPage; idx <= lastPage; idx++) {
      pages.push(
        <button
          key={idx}
          onClick={() => handleClickPage(idx)}
          css={currentPage === idx ? buttonCurrentPage : buttonPage}
        >
          {idx}
        </button>
      );
    }
    return pages;
  };
  return (
    <section>
      {isBulkMode && (
        <div
          css={floatingActionButtonStyle}
          onClick={() => handleConfirmBulkAdd()}
        >
          Confirm
        </div>
      )}
      <div css={rowContainerBetweenStyle}>
        <div css={rowContainerStartCenterStyle}>
          <ButtonBasic label="<" handleClick={handlePreviousPage} />
          {renderPageNumbers()}
          <ButtonBasic label=">" handleClick={handleNextPage} />
        </div>
        <ButtonBasic
          label={isBulkMode ? "Cancel" : "Bulk Add Collection"}
          handleClick={() => handleEnableBulkMode()}
        />
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
                <MovieCard
                  key={anime?.id}
                  id={anime?.id || 0}
                  title={anime?.title?.english || anime?.title?.native || ""}
                  style={
                    isSelected ? selectedCardContainerStyle : cardContainerStyle
                  }
                  averageScore={
                    anime?.averageScore ? anime?.averageScore : "N/A"
                  }
                  coverImage={anime?.coverImage?.large || ""}
                  handleClick={() =>
                    isBulkMode
                      ? handleAddSelectedAnime(newAnime)
                      : handleGoToAnimeDetail(anime?.id ?? 0)
                  }
                />
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
