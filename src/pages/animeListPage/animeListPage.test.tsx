import { it, vi, describe, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import AnimeListPage from "./animeListPage";
import ReactDOM from "react-dom";

describe("AnimeListPage", () => {
  beforeEach(() => {
    render(
      <AnimeListPage
        firstPage={0}
        lastPage={0}
        isLoading={false}
        isBulkMode={false}
        currentPage={0}
        selectedAnime={[]}
        observerTarget={{ current: null }}
        handleGoToAnimeDetail={vi.fn()}
        handlePreviousPage={vi.fn()}
        handleNextPage={vi.fn()}
        handleEnableBulkMode={vi.fn()}
        handleAddSelectedAnime={vi.fn()}
        handleConfirmBulkAdd={vi.fn()}
        handleClickPage={vi.fn()}
      />
    );
  });
  it("renders without crashing when bulk mode", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <AnimeListPage
        firstPage={0}
        lastPage={0}
        isLoading={false}
        isBulkMode={true}
        currentPage={0}
        selectedAnime={[]}
        observerTarget={{ current: null }}
        handleGoToAnimeDetail={vi.fn()}
        handlePreviousPage={vi.fn()}
        handleNextPage={vi.fn()}
        handleEnableBulkMode={vi.fn()}
        handleAddSelectedAnime={vi.fn()}
        handleConfirmBulkAdd={vi.fn()}
        handleClickPage={vi.fn()}
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders without crashing when not bulk mode", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <AnimeListPage
        isLoading={false}
        isBulkMode={false}
        currentPage={0}
        selectedAnime={[]}
        observerTarget={{ current: null }}
        handleGoToAnimeDetail={vi.fn()}
        handlePreviousPage={vi.fn()}
        handleNextPage={vi.fn()}
        handleEnableBulkMode={vi.fn()}
        handleAddSelectedAnime={vi.fn()}
        handleConfirmBulkAdd={vi.fn()}
        firstPage={0}
        lastPage={0}
        handleClickPage={vi.fn()}
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders AnimePageList correctly", () => {
    // const tree = render(
    //   <AnimeListPage
    //     isLoading={false}
    //     isBulkMode={false}
    //     currentPage={0}
    //     selectedAnime={[]}
    //     observerTarget={{ current: null }}
    //     handleGoToAnimeDetail={vi.fn()}
    //     handlePreviousPage={vi.fn()}
    //     handleNextPage={vi.fn()}
    //     handleEnableBulkMode={vi.fn()}
    //     handleAddSelectedAnime={vi.fn()}
    //     handleConfirmBulkAdd={vi.fn()}
    //   />
    // );
    // expect(tree).toMatchSnapshot(``);
    // console.log(screen.getByText(/Bulk Add Collection/i));
    // expect(screen.getByText(/Bulk Add Collection/i)).toBeInTheDocument();
  });
});
