import { useNavigate, useParams } from "react-router-dom";
import AnimeDetailPage from "./animeDetailPage";
import { useQuery } from "@apollo/client";
import { GET_ANIME_DETAIL } from "../../utils/queries";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  CollectionContext,
  CollectionDispatchContext,
  addNewAnimeToCollectionAction,
} from "../../store/reducer";
import { Anime, State } from "../../interfaces";
import Modal from "../../components/Modal";
import { modalFormStyle } from "../../styles";
import useNavigator from "../../hooks/useNavigator";
import useModal from "../../hooks/useModal";
import { handleShowErrorToast } from "../../utils/toast";

const AnimeDetailPageContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleGoBack } = useNavigator();

  const { isModalOpen, handleShowModal, handleCloseModal } = useModal();
  const [selectedAnime, setSelectedAnime] = useState<Anime>({
    id: 0,
    title: "",
    coverImage: "",
  });
  const [selectedCollection, setSelectedCollection] = useState<string>("");

  const {
    loading: isLoading,
    data,
    error,
  } = useQuery(GET_ANIME_DETAIL, {
    variables: {
      id: id ? parseInt(id) : 0,
    },
  });

  const collections: State = useContext(CollectionContext);
  const dispatch = useContext(CollectionDispatchContext);

  useEffect(() => {
    if (data) {
      Object.keys(collections.data).forEach((key: string) => {
        const collection = collections.data[key];
        const isExist = collection.find(
          (anime) => anime.id === data?.Media?.id
        );

        if (isExist) setSelectedCollection(key);
      });
    }
  }, [collections, data]);

  useEffect(() => {
    if (collections.errorMessage)
      handleShowErrorToast(collections.errorMessage);
  }, [collections.errorMessage]);

  const handleAddToCollection = useCallback(
    (anime: Anime) => {
      try {
        if (!Object.keys(collections.data).length) {
          dispatch(addNewAnimeToCollectionAction(anime, ""));
          setSelectedCollection("New");
          return;
        }
        handleShowModal();
        setSelectedAnime(anime);
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch, collections]
  );

  const handleInsertNewCollection = useCallback(
    (ev: React.SyntheticEvent) => {
      ev.preventDefault();
      const target = ev.target as typeof ev.target & {
        collection: { value: string };
      };
      const selectedCollection = target.collection.value;
      dispatch(
        addNewAnimeToCollectionAction(selectedAnime, selectedCollection)
      );
      handleCloseModal();
      setSelectedCollection(selectedCollection);
    },
    [dispatch, selectedAnime]
  );

  const handleGoToCollectionDetail = useCallback(() => {
    navigate(`/collection/${selectedCollection}`);
  }, [navigate, selectedCollection]);

  if (error) return <div>Error...</div>;

  return (
    <>
      {isModalOpen && (
        <Modal title="Add to Collection" handleCloseButton={handleCloseModal}>
          <form css={modalFormStyle} onSubmit={handleInsertNewCollection}>
            <select id="collection" name="collection">
              {Object.keys(collections.data).map((key: string) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
            <button type="submit">Add</button>
          </form>
        </Modal>
      )}
      <AnimeDetailPage
        data={data}
        isLoading={isLoading}
        selectedCollection={selectedCollection}
        handleGoBack={handleGoBack}
        handleAddToCollection={handleAddToCollection}
        handleGoToCollectionDetail={handleGoToCollectionDetail}
      />
    </>
  );
};

export default AnimeDetailPageContainer;
