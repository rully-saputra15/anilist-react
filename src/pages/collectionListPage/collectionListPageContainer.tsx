import { useCallback, useContext, useState } from "react";
import CollectionListPage from "./collectionListPage";
import { CollectionDispatchContext } from "../../store/reducer";
import Modal from "../../components/Modal";
import { ModalFormStyle } from "../../styles";
import { useNavigate } from "react-router-dom";

const CollectionListPageContainer = () => {
  const dispatch = useContext(CollectionDispatchContext);
  const navigate = useNavigate();
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [selectedCollectionName, setSelectedCollectionName] = useState("");
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

  const handleAddToCollection = useCallback(
    (ev: React.SyntheticEvent) => {
      ev.preventDefault();
      const target = ev.target as typeof ev.target & {
        newCollection: { value: string };
      };
      const newCollection = target.newCollection.value;
      setIsModalCreateOpen(false);
      dispatch({
        type: "ADD_NEW_COLLECTION",
        payload: newCollection,
      });
    },
    [dispatch]
  );

  const handleShowModal = useCallback(() => {
    setIsModalCreateOpen(!isModalCreateOpen);
  }, [isModalCreateOpen]);

  const handleCloseUpdateModal = useCallback(() => {
    setIsModalUpdateOpen(false);
  }, []);

  const handleGoToCollection = useCallback((collectionName: string) => {
    navigate(`/collection/${collectionName}`);
  }, []);

  const handleOpenUpdateCollectionModal = useCallback(
    (collectionName: string) => {
      setSelectedCollectionName(collectionName);
      setIsModalUpdateOpen(true);
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
      setIsModalCreateOpen(false);
      dispatch({
        type: "UPDATE_COLLECTION_NAME",
        payload: {
          prevCollectionName: selectedCollectionName,
          newCollectionName,
        },
      });
      setIsModalUpdateOpen(false);
    },
    [dispatch, selectedCollectionName]
  );

  return (
    <>
      {isModalCreateOpen && (
        <Modal title="Add New Collection" handleCloseButton={handleShowModal}>
          <form css={ModalFormStyle} onSubmit={handleAddToCollection}>
            <input id="newCollection" name="newCollection" />
            <button type="submit">Add</button>
          </form>
        </Modal>
      )}
      {isModalUpdateOpen && (
        <Modal
          title="Update Collection"
          handleCloseButton={handleCloseUpdateModal}
        >
          <form css={ModalFormStyle} onSubmit={handleUpdateCollection}>
            <input
              id="newCollectionName"
              name="newCollectionName"
              placeholder={selectedCollectionName}
            />
            <button type="submit">Submit</button>
          </form>
        </Modal>
      )}
      <CollectionListPage
        handleShowModal={handleShowModal}
        handleOpenUpdateCollectionModal={handleOpenUpdateCollectionModal}
        handleGoToCollection={handleGoToCollection}
      />
    </>
  );
};

export default CollectionListPageContainer;
