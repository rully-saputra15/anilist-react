import { FC, useContext } from "react";
import { CollectionContext } from "../../store/reducer";
import { Anime } from "../../interfaces";
import {
  animeCardCollectionStyle,
  collectionCardContentStyle,
  collectionCardHeaderStyle,
  collectionCardStyle,
  primaryDividerStyle,
  titlePageStyle,
} from "../../styles";
import { BsPlusCircle } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import Button from "../../components/Button";
import { css } from "@emotion/react";
import EmptyCollectionPlaceholder from "../../components/EmptyCollectionPlaceholder";

type CollectionListPageProps = {
  handleShowModal: () => void;
  handleOpenUpdateCollectionModal: (collectionName: string) => void;
  handleGoToCollection: (collectionName: string) => void;
};

const CollectionListPage: FC<CollectionListPageProps> = ({
  handleShowModal,
  handleOpenUpdateCollectionModal,
  handleGoToCollection,
}) => {
  const collections: Record<string, Anime[]> = useContext(CollectionContext);

  const renderCollection = () => {
    return Object.keys(collections).map((key: string) => {
      const animes = collections[key];
      return (
        <div css={collectionCardStyle} key={key}>
          <div css={collectionCardHeaderStyle}>
            <span>{key}</span>
            <FiEdit2 onClick={() => handleOpenUpdateCollectionModal(key)} />
          </div>

          <span css={primaryDividerStyle} />

          {animes.length > 0 ? (
            <div css={collectionCardContentStyle}>
              {animes.slice(0, 3).map((anime: Anime) => {
                return (
                  <img
                    key={anime.id}
                    src={anime.coverImage}
                    alt={anime.title}
                    css={animeCardCollectionStyle}
                    onClick={() => handleGoToCollection(key)}
                  />
                );
              })}
              {animes.length > 3 && <div>More</div>}
            </div>
          ) : (
            <div style={{ width: "100%" }}>
              <EmptyCollectionPlaceholder />
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div
      css={css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: "1rem",
      })}
    >
      <div
        css={css({
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        })}
      >
        <span css={titlePageStyle}>Collections</span>
        <Button
          label="Collection"
          handleClick={handleShowModal}
          icon={<BsPlusCircle />}
        />
      </div>
      <div style={{ width: "100%" }}>{renderCollection()}</div>
    </div>
  );
};

export default CollectionListPage;
