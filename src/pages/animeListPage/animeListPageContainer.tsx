import { useQuery } from "@apollo/client";

import AnimeListPage from "./animeListPage";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GET_ANIME_LIST } from "../../utils/queries";
import { Anime } from "../../interfaces";

import { modalFormStyle } from "../../styles";
import useModal from "../../hooks/useModal";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import Select from "../../components/Select";
import {
  CollectionContext,
  CollectionDispatchContext,
  bulkAddAnimeToCollectionAction,
} from "../../store/reducer";

const NUMBER_OF_ANIME_ADDED = 10;
const AnimeListPageContainer = () => {
  const navigate = useNavigate();
  const page = useRef(1);
  const perPage = useRef(10);
  const observerTarget = useRef(null);
  const collections = useContext(CollectionContext);
  const dispatch = useContext(CollectionDispatchContext);
  const [selectedAnime, setSelectedAnime] = useState<Anime[]>([]);
  const [isBulkMode, setIsBulkMode] = useState(false);
  const { isModalOpen, handleCloseModal, handleShowModal } = useModal();

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
  }, [refetch]);

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
  }, [handleLoadMoreAnime, observerTarget]);

  useEffect(() => {
    setSelectedAnime([]);
  }, [isBulkMode]);

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

  const handleEnableBulkMode = useCallback(() => {
    setIsBulkMode(!isBulkMode);
  }, [isBulkMode]);

  const handleAddSelectedAnime = useCallback((anime: Anime) => {
    setSelectedAnime((prev) => [...prev, anime]);
  }, []);

  const handleConfirmBulkAdd = useCallback(() => {
    handleShowModal();
  }, [handleShowModal]);

  const handleSubmitModal = useCallback(
    (ev: React.SyntheticEvent) => {
      ev.preventDefault();
      const target = ev.target as typeof ev.target & {
        collection: { value: string };
      };
      const selectedCollection = target.collection.value;
      dispatch(
        bulkAddAnimeToCollectionAction(selectedCollection, selectedAnime)
      );
      handleCloseModal();
      setIsBulkMode(false);
    },
    [dispatch, selectedAnime, handleCloseModal]
  );

  console.log(selectedAnime);
  if (error) return <div>Error...</div>;
  return (
    <>
      {isModalOpen && (
        <Modal title="Add to Collection" handleCloseButton={handleCloseModal}>
          <form css={modalFormStyle} onSubmit={handleSubmitModal}>
            <Select
              id="collection"
              label="Collections"
              options={Object.keys(collections.data).map((key: string) => key)}
            />
            <Button label="Add" />
          </form>
        </Modal>
      )}
      <AnimeListPage
        isLoading={isLoading}
        isBulkMode={isBulkMode}
        animeList={animeList}
        selectedAnime={selectedAnime}
        currentPage={page.current}
        observerTarget={observerTarget}
        handleGoToAnimeDetail={handleGoToAnimeDetail}
        handleAddSelectedAnime={handleAddSelectedAnime}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        handleEnableBulkMode={handleEnableBulkMode}
        handleConfirmBulkAdd={handleConfirmBulkAdd}
      />
      <div ref={observerTarget}></div>
    </>
  );
};

export default AnimeListPageContainer;
