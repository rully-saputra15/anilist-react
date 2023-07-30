import { FC } from "react";
import { GetAnimeDetailQuery } from "../../__generated__/graphql";
import {
  animeBanner,
  animeDetailCover,
  animeDetailHeaderContainer,
  animeDetailHeaderInformationContainer,
} from "../../styles";
import { css } from "@emotion/react";
import { Collection } from "../../interfaces";

type AnimeDetailPageProps = {
  data?: GetAnimeDetailQuery;
  handleAddToCollection: (collection: Collection) => void;
};

const AnimeDetailPage: FC<AnimeDetailPageProps> = ({
  data,
  handleAddToCollection,
}) => {
  return (
    <div>
      <h2>{data?.Media?.title?.english}</h2>
      <button onClick={() => handleAddToCollection(data?.Media as Collection)}>
        ADD
      </button>
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
          <span>Duration: {data?.Media?.duration}</span>
          <span>Average Score: {data?.Media?.averageScore}</span>
          <span>Episoded: {data?.Media?.episodes}</span>
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
        dangerouslySetInnerHTML={{ __html: data?.Media?.description ?? " " }}
      />
    </div>
  );
};

export default AnimeDetailPage;
