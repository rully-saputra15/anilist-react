import { FC, useContext } from "react";
import { CollectionContext } from "../../store/reducer";
import { Anime } from "../../interfaces";
import { CollectionCardHeaderStyle, CollectionCardStyle } from "../../styles";
import { BsPlusCircle } from "react-icons/bs";
import Button from "../../components/Button";
import { css } from "@emotion/react";

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
  console.log(collections);
  const renderCollection = () => {
    return Object.keys(collections).map((key: string) => {
      const collection = collections[key];
      return (
        <div css={CollectionCardStyle} key={key}>
          <span
            css={CollectionCardHeaderStyle}
            onClick={() => handleOpenUpdateCollectionModal(key)}
          >
            {key}
          </span>
          {collection.map((collection: Anime) => {
            return (
              <span onClick={() => handleGoToCollection(key)}>
                {collection.title}
              </span>
            );
          })}
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
      <Button
        label="Collection"
        handleClick={handleShowModal}
        icon={<BsPlusCircle />}
      />
      <div>{renderCollection()}</div>
    </div>
  );
};

export default CollectionListPage;
