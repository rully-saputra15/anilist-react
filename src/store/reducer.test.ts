import { expect, it, describe, beforeEach } from "vitest";
import {
  addNewAnimeToCollectionAction,
  addNewCollectionAction,
  bulkAddAnimeToCollectionAction,
  clearErrorMessageAction,
  clearSuccessMessageAction,
  collectionReducer,
  deleteCollectionAction,
  initialData,
} from "./reducer";
import { Anime } from "../interfaces";

const anime: Anime = {
  id: 1,
  title: "Naruto",
  coverImage: "https://example.com/naruto.jpg",
};

const anime2: Anime = {
  id: 2,
  title: "Naruto 2",
  coverImage: "https://example.com/naruto.jpg",
};

const anime3: Anime = {
  id: 3,
  title: "Naruto 3",
  coverImage: "https://example.com/naruto.jpg",
};
const anime4: Anime = {
  id: 4,
  title: "Naruto 4",
  coverImage: "https://example.com/naruto.jpg",
};

describe("reducer", () => {
  beforeEach(() => {
    collectionReducer(initialData, clearErrorMessageAction());
    collectionReducer(initialData, clearSuccessMessageAction());
  });
  it("should return success and automatically create new collection when collection list empty", () => {
    expect(
      collectionReducer(initialData, addNewAnimeToCollectionAction(anime, ""))
    ).toEqual({
      errorMessage: "",
      successMessage: "",
      data: {
        New: [anime],
      },
    });
  });

  it("should return success when add new collection", () => {
    expect(
      collectionReducer(initialData, addNewCollectionAction("Baru"))
    ).toEqual({
      errorMessage: "",
      successMessage: "Collection created",
      data: {
        New: [anime],
        Baru: [],
      },
    });
  });

  it("should return success when we input specific collection name", () => {
    expect(
      collectionReducer(
        initialData,
        addNewAnimeToCollectionAction(anime2, "Baru")
      )
    ).toEqual({
      errorMessage: "",
      successMessage: "Anime added to collection",
      data: {
        New: [anime],
        Baru: [anime2],
      },
    });
  });

  it("should return error when we input specific collection name with same value", () => {
    expect(
      collectionReducer(
        initialData,
        addNewAnimeToCollectionAction(anime2, "Baru")
      )
    ).toEqual({
      errorMessage: "Anime already existed in collection",
      successMessage: "",
      data: {
        New: [anime],
        Baru: [anime2],
      },
    });
  });
  it("should return succes when we do bulk add anime to collection", () => {
    expect(
      collectionReducer(
        initialData,
        bulkAddAnimeToCollectionAction("Baru", [anime3, anime4])
      )
    ).toEqual({
      errorMessage: "",
      successMessage: "Anime added to Baru collection",
      data: {
        New: [anime],
        Baru: [anime2, anime3, anime4],
      },
    });
  });
  it("should return error when we do bulk add same anime to collection", () => {
    expect(
      collectionReducer(
        initialData,
        bulkAddAnimeToCollectionAction("Baru", [anime3, anime4])
      )
    ).toEqual({
      errorMessage: "",
      successMessage: "Anime added to Baru collection",
      data: {
        New: [anime],
        Baru: [anime2, anime3, anime4],
      },
    });
  });
  it("should return success when we delete 'new' collection", () => {
    expect(
      collectionReducer(initialData, deleteCollectionAction("New"))
    ).toEqual({
      errorMessage: "",
      successMessage: "Collection deleted",
      data: {
        Baru: [anime2, anime3, anime4],
      },
    });
  });
});
