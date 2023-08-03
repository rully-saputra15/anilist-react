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
import usePagination from "../../hooks/usePagination";

const NUMBER_OF_ANIME_ADDED = 10;

const AnimeListPageContainer = () => {
  const navigate = useNavigate();
  const perPage = useRef(10);
  const observerTarget = useRef(null);
  const collections = useContext(CollectionContext);
  const dispatch = useContext(CollectionDispatchContext);
  const [selectedAnime, setSelectedAnime] = useState<Anime[]>([]);
  const [isBulkMode, setIsBulkMode] = useState(false);
  const { isModalOpen, handleCloseModal, handleShowModal } = useModal();
  const {
    firstPage,
    currentPage,
    lastPage,
    handleClickPage,
    handleNextPage: handleNextPagination,
    handlePrevPage: handlePrevPagination,
    handleSetTotalPage,
  } = usePagination();

  const {
    loading: isLoading,
    data: animeList,
    error,
    refetch,
  } = useQuery(GET_ANIME_LIST, {
    variables: {
      page: currentPage,
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

  useEffect(() => {
    if (animeList?.Page?.pageInfo?.total) {
      handleSetTotalPage(animeList?.Page?.pageInfo?.total);
    }
  }, [animeList]);

  const handlePreviousPage = useCallback(async () => {
    const page = currentPage - 1;
    if (currentPage > 1) {
      perPage.current = 10;
      await refetch({
        page: page,
        perPage: perPage.current,
      });
    }
    handlePrevPagination();
  }, [refetch]);

  const handleNextPage = useCallback(async () => {
    const page = currentPage + 1;
    perPage.current = 10;
    await refetch({
      page: page,
      perPage: perPage.current,
    });
    handleNextPagination();
  }, [refetch]);

  const handleEnableBulkMode = useCallback(() => {
    setIsBulkMode(!isBulkMode);
  }, [isBulkMode]);

  const handleAddSelectedAnime = useCallback(
    (anime: Anime) => {
      const selectedAnimeLoc = selectedAnime.findIndex(
        (el: Anime) => el.id === anime.id
      );
      if (selectedAnimeLoc === -1) {
        setSelectedAnime((prev) => [...prev, anime]);
      } else {
        setSelectedAnime((prev) =>
          prev.filter((el: Anime) => el.id !== anime.id)
        );
      }
    },
    [selectedAnime]
  );

  const handleConfirmBulkAdd = useCallback(() => {
    if (!Object.keys(collections.data).length) {
      dispatch(bulkAddAnimeToCollectionAction("New", selectedAnime));
      setIsBulkMode(false);
      return;
    }
    handleShowModal();
  }, [handleShowModal, collections.data, dispatch, selectedAnime]);

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
        firstPage={firstPage}
        currentPage={currentPage}
        lastPage={lastPage}
        isLoading={isLoading}
        isBulkMode={isBulkMode}
        animeList={animeList}
        selectedAnime={selectedAnime}
        observerTarget={observerTarget}
        handleGoToAnimeDetail={handleGoToAnimeDetail}
        handleClickPage={handleClickPage}
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
