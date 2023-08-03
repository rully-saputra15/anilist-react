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
import Button from "../../components/Button";
import Select from "../../components/Select";

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

  const [selectedCollection, setSelectedCollection] = useState<string[]>([]);

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
      const currentCollections: string[] = [];
      Object.keys(collections.data).forEach((key: string) => {
        const collection = collections.data[key];
        const isExist = collection.find(
          (anime) => anime.id === data?.Media?.id
        );
        if (isExist) currentCollections.push(key);
      });
      setSelectedCollection(currentCollections);
    }
  }, [collections, data]);

  const handleAddToCollection = useCallback(
    (anime: Anime) => {
      try {
        if (!Object.keys(collections.data).length) {
          dispatch(addNewAnimeToCollectionAction(anime, ""));
          setSelectedCollection((prev) => [...prev, "New"]);
          return;
        }
        handleShowModal();
        setSelectedAnime(anime);
      } catch (err) {
        console.log(err);
      }
    },
    [collections.data, handleShowModal, dispatch]
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
      setSelectedCollection((prev) => [...prev, selectedCollection]);
    },
    [dispatch, handleCloseModal, selectedAnime]
  );

  const handleGoToCollectionDetail = useCallback(
    (collection: string) => {
      navigate(`/collection/${collection}`);
    },
    [navigate]
  );

  const handleGoToAnimeDetail = useCallback(
    (id: number) => {
      navigate(`/anime/${id}`);
    },
    [navigate]
  );

  if (error) return <div>Error...</div>;

  return (
    <>
      {isModalOpen && (
        <Modal title="Add to Collection" handleCloseButton={handleCloseModal}>
          <form css={modalFormStyle} onSubmit={handleInsertNewCollection}>
            <Select
              id="collection"
              label="Collections"
              options={Object.keys(collections.data).map((key: string) => key)}
            />
            <Button label="Add" />
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
        handleGoToAnimeDetail={handleGoToAnimeDetail}
      />
    </>
  );
};

export default AnimeDetailPageContainer;
