import { useQuery } from "@apollo/client";

import AnimeListPage from "./animeListPage";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { GET_ANIME_LIST } from "../../utils/queries";

const AnimeListPageContainer = () => {
  const navigate = useNavigate();
  const {
    loading,
    data: animeList,
    error,
  } = useQuery(GET_ANIME_LIST, {
    variables: {
      page: 1,
      perPage: 10,
    },
  });

  const handleGoToAnimeDetail = useCallback(
    (id: number) => {
      try {
        navigate(`/anime/${id}`);
      } catch (err) {
        console.log(err);
      }
    },
    [navigate]
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  return (
    <AnimeListPage
      animeList={animeList}
      handleGoToAnimeDetail={handleGoToAnimeDetail}
    />
  );
};

export default AnimeListPageContainer;
