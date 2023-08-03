import { useNavigate, useParams } from "react-router-dom";
import CollectionDetailPage from "./collectionDetailPage";
import { useCallback, useContext, useState } from "react";
import {
  CollectionContext,
  CollectionDispatchContext,
  deleteAnimeAction,
  editCollectionNameAction,
} from "../../store/reducer";
import { SelectedAnime, State } from "../../interfaces";
import useModal from "../../hooks/useModal";
import Modal from "../../components/Modal";
import { buttonStyle, modalFormStyle } from "../../styles";
import Button from "../../components/Button";
import Input from "../../components/Input";

// TODO EDIT COLLECTION NAME
const CollectionDetailPageContainer = () => {
  const { collectionName } = useParams();
  const collections: State = useContext(CollectionContext);
  const dispatch = useContext(CollectionDispatchContext);
  const navigate = useNavigate();

  const { isModalOpen, handleCloseModal, handleShowModal } = useModal();
  const {
    isModalOpen: isModalUpdateOpen,
    handleCloseModal: handleCloseUpdateModal,
    handleShowModal: handleShowUpdateModal,
  } = useModal();

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

  const handleUpdateCollection = useCallback(
    (ev: React.SyntheticEvent) => {
      ev.preventDefault();
      const target = ev.target as typeof ev.target & {
        newCollectionName: { value: string };
      };
      const newCollectionName = target.newCollectionName.value;
      handleCloseUpdateModal();
      dispatch(
        editCollectionNameAction(collectionName || "", newCollectionName)
      );
      navigate(`/collection/${newCollectionName}`);
    },
    [dispatch, handleCloseUpdateModal, collectionName]
  );

  const handleGoToAnimeDetail = useCallback((id: number) => {
    navigate(`/anime/${id}`);
  }, []);

  return (
    <>
      {isModalUpdateOpen && (
        <Modal
          title="Update Collection"
          handleCloseButton={handleCloseUpdateModal}
        >
          <form css={modalFormStyle} onSubmit={handleUpdateCollection}>
            <Input
              name="newCollectionName"
              label="New Collection Name"
              placeholder={collectionName || ""}
            />
            <button css={buttonStyle} type="submit">
              Submit
            </button>
          </form>
        </Modal>
      )}
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
        handleShowUpdateModal={handleShowUpdateModal}
        handleGoToAnimeDetail={handleGoToAnimeDetail}
      />
    </>
  );
};

export default CollectionDetailPageContainer;
