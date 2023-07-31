import { useCallback, useContext, useState } from "react";
import CollectionListPage from "./collectionListPage";
import { CollectionDispatchContext } from "../../store/reducer";
import Modal from "../../components/Modal";
import { ModalFormStyle } from "../../styles";

const CollectionListPageContainer = () => {
  const dispatch = useContext(CollectionDispatchContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCollection = useCallback(
    (ev: React.SyntheticEvent) => {
      ev.preventDefault();
      const target = ev.target as typeof ev.target & {
        newCollection: { value: string };
      };
      const newCollection = target.newCollection.value;
      setIsModalOpen(false);
      dispatch({
        type: "ADD_NEW_COLLECTION",
        payload: newCollection,
      });
    },
    [dispatch]
  );

  const handleShowModal = useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen]);

  return (
    <>
      {isModalOpen && (
        <Modal title="Add New Collection" handleCloseButton={handleShowModal}>
          <form css={ModalFormStyle} onSubmit={handleAddToCollection}>
            <input id="newCollection" name="newCollection" />
            <button type="submit">Add</button>
          </form>
        </Modal>
      )}
      <CollectionListPage handleShowModal={handleShowModal} />
    </>
  );
};

export default CollectionListPageContainer;
