import { vi, it, describe, beforeEach } from "vitest";

import { render } from "@testing-library/react";
import CollectionListPage from "./collectionListPage";
import ReactDOM from "react-dom";

describe("CollectionListPage", () => {
  beforeEach(() => {
    render(
      <CollectionListPage
        handleShowModal={vi.fn()}
        handleOpenUpdateCollectionModal={vi.fn()}
        handleShowDeleteModal={vi.fn()}
        handleGoToCollection={vi.fn()}
      />
    );
  });
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <CollectionListPage
        handleShowModal={vi.fn()}
        handleOpenUpdateCollectionModal={vi.fn()}
        handleShowDeleteModal={vi.fn()}
        handleGoToCollection={vi.fn()}
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
