import { it, vi, describe, beforeEach } from "vitest";
import AnimeDetailPage from "./animeDetailPage";
import ReactDOM from "react-dom";

describe("AnimeDetailPage", () => {
  beforeEach(() => {
    <AnimeDetailPage
      data={{}}
      isLoading={false}
      selectedCollection={[]}
      handleGoBack={vi.fn()}
      handleAddToCollection={vi.fn()}
      handleGoToCollectionDetail={vi.fn()}
      handleGoToAnimeDetail={vi.fn()}
    />;
  });
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <AnimeDetailPage
        data={{}}
        isLoading={false}
        selectedCollection={[]}
        handleGoBack={vi.fn()}
        handleAddToCollection={vi.fn()}
        handleGoToCollectionDetail={vi.fn()}
        handleGoToAnimeDetail={vi.fn()}
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
