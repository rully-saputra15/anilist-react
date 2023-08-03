import { useCallback, useState } from "react";

const usePagination = () => {
  const [firstPage, setFirstPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(3);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(false);

  const handleNextPage = useCallback(() => {
    if (currentPage === totalPage) {
      setIsLastPage(true);
    } else {
      setCurrentPage((prev) => prev + 1);
      setFirstPage((prev) => prev + 1);
      setLastPage((prev) => prev + 1);
    }
  }, [currentPage]);

  const handlePrevPage = useCallback(() => {
    if (currentPage === 1) {
      setIsFirstPage(true);
    } else {
      setCurrentPage((prev) => prev - 1);
      setFirstPage((prev) => prev - 1);
      setLastPage((prev) => prev - 1);
    }
  }, [currentPage]);

  const handleSetTotalPage = useCallback((totalPage: number) => {
    setTotalPage(totalPage);
  }, []);

  const handleClickPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return {
    firstPage,
    currentPage,
    lastPage,
    isLastPage,
    isFirstPage,
    handleNextPage,
    handlePrevPage,
    handleSetTotalPage,
    handleClickPage,
  };
};

export default usePagination;
