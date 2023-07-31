import { useNavigate, useParams } from "react-router-dom";
import AnimeDetailPage from "./animeDetailPage";
import { useQuery } from "@apollo/client";
import { GET_ANIME_DETAIL } from "../../utils/queries";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  CollectionContext,
  CollectionDispatchContext,
} from "../../store/reducer";
import { Anime } from "../../interfaces";
import Modal from "../../components/Modal";
import { ModalFormStyle } from "../../styles";

const AnimeDetailPageContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState<Anime>({
    id: 0,
    title: "",
    coverImage: "",
  });
  const [selectedCollection, setSelectedCollection] = useState<string>("");

  const { loading, data, error } = useQuery(GET_ANIME_DETAIL, {
    variables: {
      id: id ? parseInt(id) : 0,
    },
  });

  const collections: Record<string, Anime[]> = useContext(CollectionContext);
  const dispatch = useContext(CollectionDispatchContext);

  useEffect(() => {
    if (data) {
      Object.keys(collections).forEach((key: string) => {
        const collection = collections[key];
        const isExist = collection.find(
          (anime) => anime.id === data?.Media?.id
        );

        if (isExist) setSelectedCollection(key);
      });
    }
  }, [collections, data]);

  const handleAddToCollection = useCallback(
    (anime: Anime) => {
      try {
        if (!Object.keys(collections).length) {
          dispatch({
            type: "ADD_ANIME_TO_COLLECTION",
            payload: {
              anime: anime,
              collectionName: "",
            },
          });
          return;
        }
        setIsModalOpen(true);
        setSelectedAnime(anime);
        setSelectedCollection("New");
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

      dispatch({
        type: "ADD_ANIME_TO_COLLECTION",
        payload: {
          anime: selectedAnime,
          collectionName: selectedCollection,
        },
      });

      setIsModalOpen(false);
      setSelectedCollection(selectedCollection);
    },
    [dispatch, selectedAnime]
  );

  const handleGoToCollectionDetail = useCallback(() => {
    navigate(`/collection/${selectedCollection}`);
  }, [navigate, selectedCollection]);

  const handleShowModal = useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <>
      {isModalOpen && (
        <Modal title="Add to Collection" handleCloseButton={handleShowModal}>
          <form css={ModalFormStyle} onSubmit={handleInsertNewCollection}>
            <select id="collection" name="collection">
              {Object.keys(collections).map((key: string) => (
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
        selectedCollection={selectedCollection}
        handleAddToCollection={handleAddToCollection}
        handleGoToCollectionDetail={handleGoToCollectionDetail}
      />
    </>
  );
};

export default AnimeDetailPageContainer;
