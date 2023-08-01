import { useParams } from "react-router-dom";
import CollectionDetailPage from "./collectionDetailPage";
import { useCallback, useContext, useState } from "react";
import {
  CollectionContext,
  CollectionDispatchContext,
  deleteAnimeAction,
} from "../../store/reducer";
import { SelectedAnime, State } from "../../interfaces";
import useModal from "../../hooks/useModal";
import Modal from "../../components/Modal";
import { modalFormStyle } from "../../styles";
import Button from "../../components/Button";

const CollectionDetailPageContainer = () => {
  const { collectionName } = useParams();
  const collections: State = useContext(CollectionContext);
  const dispatch = useContext(CollectionDispatchContext);

  const { isModalOpen, handleCloseModal, handleShowModal } = useModal();
  const [selectedAnimeId, setSelectedAnimeId] = useState<SelectedAnime>({
    id: 0,
    title: "",
  });

  const handleOpenDeleteModal = useCallback(
    (selectedAnime: SelectedAnime) => {
      handleShowModal();
      setSelectedAnimeId(selectedAnime);
    },
    [handleShowModal]
  );
  const handleSubmitModal = useCallback(
    (ev: React.SyntheticEvent) => {
      ev.preventDefault();
      dispatch(deleteAnimeAction(collectionName as string, selectedAnimeId.id));
      handleCloseModal();
    },
    [collectionName, selectedAnimeId, dispatch, handleCloseModal]
  );

  return (
    <>
      {isModalOpen && (
        <Modal title="Delete Anime" handleCloseButton={handleCloseModal}>
          <form css={modalFormStyle} onSubmit={handleSubmitModal}>
            <p>
              Are you sure you want to delete {`${selectedAnimeId.title}`} in{" "}
              {`${collectionName}`}?
            </p>
            <Button label="Delete" />
          </form>
        </Modal>
      )}
      <CollectionDetailPage
        collectionName={collectionName || ""}
        animes={collections.data[collectionName as string] || []}
        handleOpenDeleteModal={handleOpenDeleteModal}
      />
    </>
  );
};

export default CollectionDetailPageContainer;
