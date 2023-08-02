import { FC } from "react";
import { Anime, SelectedAnime } from "../../interfaces";
import {
  animeTitle,
  blackColor,
  cardContainerStyle,
  cardImageStyle,
  redColor,
  rowContainerStartCenterStyle,
  titlePageStyle,
} from "../../styles";
import { BiSolidTrash } from "react-icons/bi";
import { css } from "@emotion/react";

type CollectionDetailPageProps = {
  collectionName: string;
  animes: Anime[];
  handleOpenDeleteModal: (anime: SelectedAnime) => void;
};

const CollectionDetailPage: FC<CollectionDetailPageProps> = ({
  collectionName,
  animes,
  handleOpenDeleteModal,
}) => {
  return (
    <section>
      <h1 css={titlePageStyle}>{collectionName}</h1>
      <div css={rowContainerStartCenterStyle}>
        {animes.map((anime: Anime) => (
          <div key={anime.id} css={cardContainerStyle}>
            <img
              src={anime.coverImage}
              alt={anime.title}
              css={cardImageStyle}
            />
            <div css={animeTitle}>{anime.title}</div>
            {/* <button onClick={() => handleDeleteAnime(anime.id)}>delete</button>
            <button>view</button> */}
            <BiSolidTrash
              css={css({
                position: "absolute",
                bottom: 40,
                fontSize: "2rem",
                cursor: "pointer",
                color: redColor,
                padding: "0.5rem",
                backgroundColor: blackColor,
                borderRadius: "50%",
                transition: "all 0.3s ease",
                ["&:hover"]: {
                  transform: "scale(1.2)",
                  backgroundColor: "white",
                },
              })}
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
