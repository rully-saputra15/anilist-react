import { FC } from "react";
import { Anime, SelectedAnime } from "../../interfaces";
import {
  animeTitle,
  backButtonStyle,
  cardContainerStyle,
  cardImageStyle,
  rowContainerStartCenterStyle,
  titlePageStyle,
  trashIconStyle,
} from "../../styles";
import { BiArrowBack, BiSolidTrash } from "react-icons/bi";
import { css } from "@emotion/react";
import { FiEdit2 } from "react-icons/fi";

type CollectionDetailPageProps = {
  collectionName: string;
  animes: Anime[];
  handleGoBack: () => void;
  handleOpenDeleteModal: (anime: SelectedAnime) => void;
  handleShowUpdateModal: () => void;
  handleGoToAnimeDetail: (id: number) => void;
};

const CollectionDetailPage: FC<CollectionDetailPageProps> = ({
  collectionName,
  animes,
  handleGoBack,
  handleOpenDeleteModal,
  handleShowUpdateModal,
  handleGoToAnimeDetail,
}) => {
  return (
    <section>
      <h1 css={titlePageStyle}>
        <BiArrowBack css={backButtonStyle} onClick={handleGoBack} />
        {collectionName}{" "}
        <FiEdit2
          css={css({ cursor: "pointer" })}
          onClick={() => handleShowUpdateModal()}
        />
      </h1>
      <div css={rowContainerStartCenterStyle}>
        {animes.map((anime: Anime) => (
          <div key={anime.id} css={cardContainerStyle}>
            <img
              src={anime.coverImage}
              alt={anime.title}
              css={cardImageStyle}
              onClick={() => handleGoToAnimeDetail(anime.id)}
            />
            <div css={animeTitle}>{anime.title}</div>
            <BiSolidTrash
              css={trashIconStyle}
              onClick={() =>
                handleOpenDeleteModal({ id: anime.id, title: anime.title })
              }
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollectionDetailPage;
