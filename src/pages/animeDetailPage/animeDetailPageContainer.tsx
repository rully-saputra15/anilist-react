import { useParams } from "react-router-dom";
import AnimeDetailPage from "./animeDetailPage";
import { useQuery } from "@apollo/client";
import { GET_ANIME_DETAIL } from "../../utils/queries";
import { useCallback, useContext } from "react";
import { CollectionDispatchContext } from "../../store/reducer";
import { Collection } from "../../interfaces";

const AnimeDetailPageContainer = () => {
  const { id } = useParams();

  const { loading, data, error } = useQuery(GET_ANIME_DETAIL, {
    variables: {
      id: id ? parseInt(id) : 0,
    },
  });

  const dispatch = useContext(CollectionDispatchContext);

  const handleAddToCollection = useCallback(
    (collection: Collection) => {
      dispatch({
        type: "ADD_COLLECTION",
        payload: collection,
      });
    },
    [dispatch]
  );
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  return (
    <AnimeDetailPage
      data={data}
      handleAddToCollection={handleAddToCollection}
    />
  );
};

export default AnimeDetailPageContainer;
