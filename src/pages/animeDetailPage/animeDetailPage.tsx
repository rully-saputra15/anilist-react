import { FC } from "react";
import { GetAnimeDetailQuery } from "../../__generated__/graphql";
import {
  animeBanner,
  animeDetailCover,
  animeDetailHeader,
  animeDetailHeaderContainer,
  animeDetailHeaderInformationContainer,
  rowContainerStartCenterStyle,
  titlePageStyle,
} from "../../styles";
import { css } from "@emotion/react";
import { Anime } from "../../interfaces";
import { BsBookmark, BsCardList, BsFillBookmarkFill } from "react-icons/bs";
import { BiTimeFive, BiArrowBack } from "react-icons/bi";
import { AiOutlineStar } from "react-icons/ai";
import Loading from "../../components/Loading";

type AnimeDetailPageProps = {
  data?: GetAnimeDetailQuery;
  selectedCollection: string;
  isLoading: boolean;
  handleGoBack: () => void;
  handleAddToCollection: (anime: Anime) => void;
  handleGoToCollectionDetail: () => void;
};

const AnimeDetailPage: FC<AnimeDetailPageProps> = ({
  data,
  selectedCollection,
  isLoading,
  handleGoBack,
  handleAddToCollection,
  handleGoToCollectionDetail,
}) => {
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div
          css={css({ display: "flex", flexDirection: "column", gap: "8px" })}
        >
          <div
            css={css({
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              flex: 1,
            })}
          >
            <div css={rowContainerStartCenterStyle}>
              <BiArrowBack
                css={css({
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                })}
                onClick={handleGoBack}
              />
              <span css={titlePageStyle}>{data?.Media?.title?.english}</span>
            </div>
            {selectedCollection ? (
              <BsFillBookmarkFill
                css={css({
                  fontSize: "1.5rem",
                })}
                onClick={() => {}}
              />
            ) : (
              <BsBookmark
                css={css({
                  fontSize: "1.5rem",
                })}
                onClick={() => handleAddToCollection(data?.Media as Anime)}
              />
            )}
          </div>

          <div css={animeDetailHeader}>
            <img
              css={animeBanner}
              src={data?.Media?.bannerImage || ""}
              alt="banner"
            />
            <div css={animeDetailHeaderContainer}>
              <img
                css={animeDetailCover}
                src={data?.Media?.coverImage?.large || ""}
                alt="cover"
              />
              <div css={animeDetailHeaderInformationContainer}>
                <div css={rowContainerStartCenterStyle}>
                  <BiTimeFive />
                  <span>: {data?.Media?.duration} mins</span>
                </div>
                <div css={rowContainerStartCenterStyle}>
                  <AiOutlineStar />
                  <span>: {data?.Media?.averageScore}</span>
                </div>
                <div css={rowContainerStartCenterStyle}>
                  <BsCardList />
                  <span>: {data?.Media?.episodes} episodes</span>
                </div>
                {selectedCollection && (
                  <span onClick={handleGoToCollectionDetail}>
                    Collection: {selectedCollection}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div>
            Studio:{" "}
            {data?.Media?.studios?.nodes?.length
              ? data?.Media?.studios?.nodes[0]?.name
              : "Studio not found"}
          </div>
          <div>
            Genres:{" "}
            {data?.Media?.genres?.map((genre) => {
              return genre + " ";
            })}
          </div>
          <div
            css={css({
              paddingTop: "1rem",
            })}
            dangerouslySetInnerHTML={{
              __html: data?.Media?.description ?? " ",
            }}
          />
        </div>
      )}
    </>
  );
};

export default AnimeDetailPage;
