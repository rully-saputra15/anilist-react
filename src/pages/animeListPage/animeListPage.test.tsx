import { expect, it, vi, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import AnimeListPage from "./animeListPage";
import ReactDOM from "react-dom";

describe("AnimeListPage", () => {
  beforeEach(() => {
    render(
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
      />
    );
  });
  it("renders without crashing when bulk mode", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <AnimeListPage
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
