import { createContext } from "react";
import { Anime, State } from "../interfaces";
import { removeSpecialCharacters } from "../utils/utils";

export const initialState: State = {
  errorMessage: "",
  successMessage: "",
  data: {},
};
export const CollectionContext = createContext<State>(initialState);
export const CollectionDispatchContext = createContext<React.Dispatch<any>>(
  () => {}
);

export const initialData =
  Object.keys(JSON.parse(localStorage.getItem("collections") || "{}")).length >
  0
    ? {
        errorMessage: "",
        successMessage: "",
        data: JSON.parse(localStorage.getItem("collections") || "{}"),
      }
    : initialState;

export const collectionReducer = (
  state: State = initialData,
  action: Record<string, any>
) => {
  let errorMessage = "";
  let successMessage = "";
  switch (action.type) {
    case "ADD_ANIME_TO_COLLECTION": {
      const anime: Anime = {
        id: action.payload.anime.id,
        title: action.payload.anime.title,
        coverImage: action.payload.anime.coverImage,
      };

      if (!action.payload.collectionName) {
        state.data["New"] = [anime];
      } else {
        if (state.data[action.payload.collectionName]) {
          const collectionName = action.payload.collectionName;
          const isAnimeExistedInCollection = state.data[
            collectionName
          ].findIndex((anm) => anm.id === anime.id);

          if (isAnimeExistedInCollection === -1) {
            state.data[collectionName] = [...state.data[collectionName], anime];
          } else {
            errorMessage = "Anime already existed in collection";
          }
        }

        if (errorMessage === "") successMessage = "Anime added to collection";
      }
      return { ...state, errorMessage, successMessage };
    }

    case "ADD_NEW_COLLECTION": {
      const collections = Object.keys(state.data);
      const isCollectionExisted =
        collections.length > 0
          ? collections.find((collection) => collection === action.payload)
          : false;

      if (!isCollectionExisted) {
        state.data[removeSpecialCharacters(action.payload)] = [];
        successMessage = "Collection created";
      } else {
        errorMessage = "Collection name must be unique";
      }
      return { ...state, errorMessage, successMessage };
    }

    case "BULK_ADD_ANIME_TO_COLLECTION": {
      const collectionName = action.payload.collectionName;
      const animes = action.payload.animes;
      if (!state.data[collectionName]) {
        state.data[collectionName] = [...animes];
      } else {
        const animeCollectionId = state.data[collectionName].map(
          (animCol) => animCol.id
        );
        const newAnimes = animes.filter(
          (elAnime: Anime) => !animeCollectionId.includes(elAnime.id)
        );
        state.data[collectionName] = [
          ...state.data[collectionName],
          ...newAnimes,
        ];
      }

      successMessage = `Anime added to ${collectionName} collection`;
      return { ...state, errorMessage, successMessage };
    }

    case "UPDATE_COLLECTION_NAME": {
      const prevCollectionName = action.payload.prevCollectionName;
      const newCollectionName = removeSpecialCharacters(action.payload.newCollectionName);
      const prevCollection = state.data[prevCollectionName];
      const collectionNames = Object.keys(state.data);
      const isCollectionUnique =
        collectionNames.findIndex(
          (collection: string) =>
            collection === newCollectionName
        ) === -1;
      if (isCollectionUnique) {
        state.data[newCollectionName] = prevCollection;
        delete state.data[prevCollectionName];
        successMessage = "Collection name updated";
      } else {
        errorMessage = "Collection name must be unique";
      }
      return { ...state, errorMessage, successMessage };
    }

    case "DELETE_ANIME": {
      const newState = { ...state };
      const collection = newState.data[action.payload.collectionName];
      const newCollection = collection.findIndex(
        (anime: Anime) => anime.id === action.payload.animeId
      );
      if (collection.length === 0 && newCollection === 0) {
        newState.data[action.payload.collectionName] = [];
        return { ...newState, errorMessage };
      }
      newState.data[action.payload.collectionName] = [
        ...newState.data[action.payload.collectionName].slice(0, newCollection),
        ...newState.data[action.payload.collectionName].slice(
          newCollection + 1
        ),
      ];
      successMessage = "Anime deleted from collection";
      return { ...newState, errorMessage, successMessage };
    }

    case "DELETE_COLLECTION": {
      const newState = { ...state };
      delete newState.data[action.payload];
      successMessage = "Collection deleted";
      return { ...newState, errorMessage, successMessage };
    }

    case "CLEAR_ERROR_MESSAGE": {
      errorMessage = "";
      return { ...state, errorMessage: "", successMessage };
    }

    case "CLEAR_SUCCESS_MESSAGE": {
      successMessage = "";
      return { ...state, errorMessage, successMessage: "" };
    }

    default: {
      throw Error("Unknown action: " + action);
    }
  }
  return state;
};

export const addNewAnimeToCollectionAction = (
  anime: Anime,
  collectionName: string
) => ({
  type: "ADD_ANIME_TO_COLLECTION",
  payload: {
    anime,
    collectionName,
  },
});

export const clearErrorMessageAction = () => ({
  type: "CLEAR_ERROR_MESSAGE",
});

export const clearSuccessMessageAction = () => ({
  type: "CLEAR_SUCCESS_MESSAGE",
});

export const deleteCollectionAction = (prevCollectionName: string) => ({
  type: "DELETE_COLLECTION",
  payload: prevCollectionName,
});

export const deleteAnimeAction = (collectionName: string, animeId: number) => ({
  type: "DELETE_ANIME",
  payload: {
    collectionName,
    animeId,
  },
});

export const bulkAddAnimeToCollectionAction = (
  collectionName: string,
  animes: Anime[]
) => ({
  type: "BULK_ADD_ANIME_TO_COLLECTION",
  payload: {
    collectionName: collectionName,
    animes: animes,
  },
});

export const editCollectionNameAction = (
  prevCollectionName: string,
  newCollectionName: string
) => ({
  type: "UPDATE_COLLECTION_NAME",
  payload: {
    prevCollectionName,
    newCollectionName,
  },
});

export const addNewCollectionAction = (collectionName: string) => ({
  type: "ADD_NEW_COLLECTION",
  payload: collectionName,
});
