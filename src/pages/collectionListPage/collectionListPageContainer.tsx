import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CollectionListPage from "./collectionListPage";
import {
  CollectionContext,
  CollectionDispatchContext,
  clearErrorMessageAction,
  deleteCollectionAction,
  editCollectionNameAction,
} from "../../store/reducer";
import Modal from "../../components/Modal";
import { buttonStyle, modalFormStyle } from "../../styles";
import Input from "../../components/Input";
import { handleShowErrorToast } from "../../utils/toast";
import useModal from "../../hooks/useModal";

const CollectionListPageContainer = () => {
  const collections = useContext(CollectionContext);
  const dispatch = useContext(CollectionDispatchContext);
  const navigate = useNavigate();
  const {
    isModalOpen: isModalCreateOpen,
    handleShowModal: handleShowCreateModal,
    handleCloseModal: handleCloseCreateModal,
  } = useModal();

  const {
    isModalOpen: isModalDeleteOpen,
    handleShowModal: handleShowDeleteModal,
    handleCloseModal: handleCloseDeleteModal,
  } = useModal();

  const {
    isModalOpen: isModalUpdateOpen,
    handleShowModal: handleShowUpdateModal,
    handleCloseModal: handleCloseUpdateModal,
  } = useModal();

  const [selectedCollectionName, setSelectedCollectionName] = useState("");

  const handleAddToCollection = useCallback(
    (ev: React.SyntheticEvent) => {
      ev.preventDefault();
      const target = ev.target as typeof ev.target & {
        newCollection: { value: string };
      };
      const newCollection = target.newCollection.value;

      dispatch({
        type: "ADD_NEW_COLLECTION",
        payload: newCollection,
      });
      handleCloseCreateModal();
    },
    [dispatch]
  );

  useEffect(() => {
    if (collections.errorMessage) {
      handleShowErrorToast(collections.errorMessage);
      dispatch(clearErrorMessageAction());
    }
  }, [dispatch, collections.errorMessage]);

  const handleGoToCollection = useCallback((collectionName: string) => {
    navigate(`/collection/${collectionName}`);
  }, []);

  const handleOpenUpdateCollectionModal = useCallback(
    (collectionName: string) => {
      setSelectedCollectionName(collectionName);
      handleShowUpdateModal();
    },
    []
  );

  const handleUpdateCollection = useCallback(
    (ev: React.SyntheticEvent) => {
      ev.preventDefault();
      const target = ev.target as typeof ev.target & {
        newCollectionName: { value: string };
      };
      const newCollectionName = target.newCollectionName.value;
      handleCloseCreateModal();
      dispatch(
        editCollectionNameAction(selectedCollectionName, newCollectionName)
      );
      // dispatch({
      //   type: "UPDATE_COLLECTION_NAME",
      //   payload: {
      //     prevCollectionName: selectedCollectionName,
      //     newCollectionName,
      //   },
      // });
      handleCloseUpdateModal();
    },
    [dispatch, selectedCollectionName]
  );

  const handleOpenDeleteModal = useCallback(
    (collectionName: string) => {
      setSelectedCollectionName(collectionName);
      handleShowDeleteModal();
    },
    [handleShowDeleteModal]
  );

  const handleConfirmDeleteCollection = useCallback(
    (ev: React.SyntheticEvent) => {
      ev.preventDefault();
      dispatch(deleteCollectionAction(selectedCollectionName));
      handleCloseDeleteModal();
    },
    [dispatch, selectedCollectionName, handleCloseDeleteModal]
  );

  return (
    <>
      {isModalCreateOpen && (
        <Modal
          title="Add New Collection"
          handleCloseButton={handleCloseCreateModal}
        >
          <form css={modalFormStyle} onSubmit={handleAddToCollection}>
            <Input
              name="newCollection"
              label="Collection Name"
              placeholder="ex: My Collection"
            />

            <button css={buttonStyle} type="submit">
              Add
            </button>
          </form>
        </Modal>
      )}
      {isModalDeleteOpen && (
        <Modal
          title="Delete Collection"
          handleCloseButton={handleCloseDeleteModal}
        >
          <form css={modalFormStyle} onSubmit={handleConfirmDeleteCollection}>
            <p>
              Are you sure you want to delete {`${selectedCollectionName}`}?
            </p>
            <button css={buttonStyle} type="submit">
              Confirm
            </button>
          </form>
        </Modal>
      )}
      {isModalUpdateOpen && (
        <Modal
          title="Update Collection"
          handleCloseButton={handleCloseUpdateModal}
        >
          <form css={modalFormStyle} onSubmit={handleUpdateCollection}>
            <Input
              name="newCollectionName"
              label="New Collection Name"
              placeholder={selectedCollectionName}
            />
            <button css={buttonStyle} type="submit">
              Submit
            </button>
          </form>
        </Modal>
      )}
      <CollectionListPage
        handleShowModal={handleShowCreateModal}
        handleOpenUpdateCollectionModal={handleOpenUpdateCollectionModal}
        handleShowDeleteModal={handleOpenDeleteModal}
        handleGoToCollection={handleGoToCollection}
      />
    </>
  );
};

export default CollectionListPageContainer;
