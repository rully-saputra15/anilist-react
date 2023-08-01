import { useQuery } from "@apollo/client";

import AnimeListPage from "./animeListPage";
import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GET_ANIME_LIST } from "../../utils/queries";

const NUMBER_OF_ANIME_ADDED = 10;
const AnimeListPageContainer = () => {
  const navigate = useNavigate();
  const page = useRef(1);
  const perPage = useRef(10);
  const observerTarget = useRef(null);

  const {
    loading: isLoading,
    data: animeList,
    error,
    refetch,
  } = useQuery(GET_ANIME_LIST, {
    variables: {
      page: page.current,
      perPage: perPage.current,
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

  const handleLoadMoreAnime = useCallback(async () => {
    perPage.current += NUMBER_OF_ANIME_ADDED;
    await refetch({
      page: 1,
      perPage: perPage.current,
    });
  }, [perPage.current]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMoreAnime();
        }
      },
      { threshold: 0.5 }
    );
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) observer.unobserve(observerTarget.current);
    };
  }, [observerTarget]);

  const handlePreviousPage = useCallback(async () => {
    if (page.current > 1) {
      page.current -= 1;
      perPage.current = 10;
      await refetch({
        page: page.current,
        perPage: perPage.current,
      });
    }
  }, [refetch]);

  const handleNextPage = useCallback(async () => {
    page.current += 1;
    perPage.current = 10;
    await refetch({
      page: page.current,
      perPage: perPage.current,
    });
  }, [refetch]);

  if (error) return <div>Error...</div>;
  return (
    <>
      <AnimeListPage
        isLoading={isLoading}
        animeList={animeList}
        currentPage={page.current}
        observerTarget={observerTarget}
        handleGoToAnimeDetail={handleGoToAnimeDetail}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
      />
      <div ref={observerTarget}></div>
    </>
  );
};

export default AnimeListPageContainer;
