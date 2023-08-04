import { vi, it, describe, beforeEach } from "vitest";

import { render } from "@testing-library/react";
import CollectionDetailPage from "./collectionDetailPage";
import ReactDOM from "react-dom";

describe("CollectionDetailPage", () => {
  beforeEach(() => {
    render(
      <CollectionDetailPage
        collectionName={""}
        animes={[]}
        handleOpenDeleteModal={vi.fn()}
        handleShowUpdateModal={vi.fn()}
        handleGoToAnimeDetail={vi.fn()}
        handleGoBack={vi.fn()}
      />
    );
  });

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <CollectionDetailPage
        collectionName={""}
        animes={[]}
        handleOpenDeleteModal={vi.fn()}
        handleShowUpdateModal={vi.fn()}
        handleGoToAnimeDetail={vi.fn()}
        handleGoBack={vi.fn()}
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
