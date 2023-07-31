import { useParams } from "react-router-dom";
import CollectionDetailPage from "./collectionDetailPage";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  CollectionContext,
  CollectionDispatchContext,
} from "../../store/reducer";
import { Anime } from "../../interfaces";

const CollectionDetailPageContainer = () => {
  const { collectionName } = useParams();
  const collections: Record<string, Anime[]> = useContext(CollectionContext);
  const dispatch = useContext(CollectionDispatchContext);
  const [animes, setAnimes] = useState<Anime[]>([]);
  console.log(collections);
  useEffect(() => {
    try {
      if (collectionName) {
        setAnimes(collections[collectionName]);
      }
    } catch (err) {
      console.log(err);
    }
  }, [collections, collectionName]);

  const handleDeleteAnime = useCallback((animeId: number) => {
    dispatch({
      type: "DELETE_ANIME",
      payload: {
        collectionName,
        animeId,
      },
    });
  }, []);
  return (
    <CollectionDetailPage
      collectionName={collectionName || ""}
      animes={animes}
      handleDeleteAnime={handleDeleteAnime}
    />
  );
};

export default CollectionDetailPageContainer;
