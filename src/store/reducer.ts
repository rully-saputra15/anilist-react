import { createContext } from "react";
import { Anime, State } from "../interfaces";

export const initialState: State = {
  errorMessage: "",
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
        data: JSON.parse(localStorage.getItem("collections") || "{}"),
      }
    : initialState;

export const collectionReducer = (
  state: State = initialData,
  action: Record<string, any>
) => {
  let errorMessage = "";
  switch (action.type) {
    case "ADD_ANIME_TO_COLLECTION": {
      const anime: Anime = {
        id: action.payload.anime.id,
        title:
          action.payload.anime.title.english ??
          action.payload.anime.title.native,
        coverImage: action.payload.anime.coverImage.large,
      };

      if (!action.payload.collectionName) {
        state.data["New"] = [anime];
      } else {
        if (state.data[action.payload.collectionName]) {
          const collectionName = action.payload.collectionName;
          const isAnimeExistedInCollection = state.data[collectionName].find(
            (anime) => anime.id === action.payload.anime.id
          );

          if (!isAnimeExistedInCollection) {
            state.data[collectionName] = [...state.data[collectionName], anime];
          } else {
            errorMessage = "Anime already existed in collection";
          }
        }
      }
      return { ...state, errorMessage };
    }

    case "ADD_NEW_COLLECTION": {
      const collections = Object.keys(state.data);
      const isCollectionExisted =
        collections.length > 0
          ? collections.find((collection) => collection === action.payload)
          : false;
      console.log(isCollectionExisted);
      console.log(collections);
      if (!isCollectionExisted) {
        state.data[action.payload] = [];
      } else {
        errorMessage = "Collection name must be unique";
      }
      return { ...state, errorMessage };
    }

    case "BULK_ADD_ANIME_TO_COLLECTION": {
      const collectionName = action.payload.collectionName;
      const animes = action.payload.animes;
      state.data[collectionName] = [...state.data[collectionName], ...animes];
      return { ...state, errorMessage };
    }

    case "UPDATE_COLLECTION_NAME": {
      const prevCollectionName = action.payload.prevCollectionName;
      const prevCollection = state.data[prevCollectionName];
      const collectionNames = Object.keys(state.data);
      const isCollectionUnique =
        collectionNames.findIndex(
          (collection: string) =>
            collection === action.payload.newCollectionName
        ) === -1;

      if (isCollectionUnique) {
        state.data[action.payload.newCollectionName] = prevCollection;
        delete state.data[prevCollectionName];
      } else {
        errorMessage = "Collection name must be unique";
      }
      return { ...state, errorMessage };
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
      return { ...newState, errorMessage };
    }

    case "DELETE_COLLECTION": {
      const newState = { ...state };
      delete newState.data[action.payload];
      return { ...newState, errorMessage };
    }

    case "CLEAR_ERROR_MESSAGE": {
      errorMessage = "";
      return { ...state, errorMessage: "" };
    }

    default: {
      throw Error("Unknown action: " + action.type);
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
