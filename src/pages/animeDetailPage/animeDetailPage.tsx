import { FC } from "react";
import { GetAnimeDetailQuery } from "../../__generated__/graphql";
import {
  animeBanner,
  animeDetailCover,
  animeDetailHeader,
  animeDetailHeaderContainer,
  animeDetailHeaderInformationContainer,
  animeDetailPageContainerStyle,
  animeDetailPageInformationContainerStyle,
  backButtonStyle,
  badgeStyle,
  cardContainerStyle,
  horizontalScrollStyle,
  rowContainerStartCenterStyle,
  selectedCollectionContainerStyle,
} from "../../styles";
import { css } from "@emotion/react";
import { Anime } from "../../interfaces";
import { BsCardList, BsCollection } from "react-icons/bs";
import { MdOutlineCollectionsBookmark } from "react-icons/md";
import { BiTimeFive, BiArrowBack } from "react-icons/bi";
import { AiOutlineStar } from "react-icons/ai";
import Loading from "../../components/Loading";
import MovieCard from "../../components/MovieCard";

type AnimeDetailPageProps = {
  data?: GetAnimeDetailQuery;
  selectedCollection: string[];
  isLoading: boolean;
  handleGoBack: () => void;
  handleAddToCollection: (anime: Anime) => void;
  handleGoToCollectionDetail: (collection: string) => void;
  handleGoToAnimeDetail: (id: number) => void;
};

const AnimeDetailPage: FC<AnimeDetailPageProps> = ({
  data,
  selectedCollection,
  isLoading,
  handleGoBack,
  handleAddToCollection,
  handleGoToCollectionDetail,
  handleGoToAnimeDetail,
}) => {
  return (
    <section>
      {isLoading ? (
        <Loading />
      ) : (
        <div
          css={css({ display: "flex", flexDirection: "column", gap: "8px" })}
        >
          <div css={animeDetailPageContainerStyle}>
            <div css={rowContainerStartCenterStyle}>
              <BiArrowBack css={backButtonStyle} onClick={handleGoBack} />
              <h3>
                {data?.Media?.title?.english || data?.Media?.title?.native}
              </h3>
            </div>
            <MdOutlineCollectionsBookmark
              css={css({
                fontSize: "2rem",
                cursor: "pointer",
              })}
              onClick={() =>
                handleAddToCollection({
                  id: data?.Media?.id || 0,
                  title:
                    data?.Media?.title?.english ||
                    data?.Media?.title?.native ||
                    "",
                  coverImage: data?.Media?.coverImage?.large || "",
                })
              }
            />
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
                  <span>: {data?.Media?.averageScore} score</span>
                </div>
                <div css={rowContainerStartCenterStyle}>
                  <BsCardList />
                  <span>: {data?.Media?.episodes} episodes</span>
                </div>
                {selectedCollection.length > 0 && (
                  <div css={selectedCollectionContainerStyle}>
                    <BsCollection /> {": "}
                    {selectedCollection.map((collection) => (
                      <span
                        css={badgeStyle}
                        onClick={() => handleGoToCollectionDetail(collection)}
                      >
                        {collection}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <h2>Information</h2>
          <div css={animeDetailPageInformationContainerStyle}>
            <span>
              Start Date:{" "}
              {`${data?.Media?.startDate?.day}-${data?.Media?.startDate?.month}-${data?.Media?.startDate?.year}`}
            </span>
            <span>
              End Date:{" "}
              {`${data?.Media?.endDate?.day}-${data?.Media?.endDate?.month}-${data?.Media?.endDate?.year}`}
            </span>
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
          <h2>Recommendations</h2>
          <div css={horizontalScrollStyle}>
            {data?.Media?.recommendations?.nodes?.map((anime) => (
              <MovieCard
                key={anime?.id || 0}
                id={anime?.id || 0}
                title={
                  anime?.mediaRecommendation?.title?.english ||
                  anime?.mediaRecommendation?.title?.native ||
                  ""
                }
                coverImage={
                  anime?.mediaRecommendation?.coverImage?.medium || ""
                }
                averageScore={anime?.mediaRecommendation?.averageScore || 0}
                style={cardContainerStyle}
                handleClick={() => handleGoToAnimeDetail(anime?.id || 0)}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default AnimeDetailPage;
