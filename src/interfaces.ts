export interface State {
  errorMessage: string;
  successMessage: string;
  data: CollectionState;
}

export interface CollectionState {
  [key: string]: Anime[];
}

export interface Anime {
  id: number;
  title: string;
  coverImage: string;
}

export interface SelectedAnime {
  id: number;
  title: string;
}

export interface PaginationProps {
  totalPage: number;
}

export enum CollectionActions {
  ADD_ANIME_TO_COLLECTION = "ADD_ANIME_TO_COLLECTION",
  CLEAR_ERROR_MESSAGE = "CLEAR_ERROR_MESSAGE",
  CLEAR_SUCCESS_MESSAGE = "CLEAR_SUCCESS_MESSAGE",
  DELETE_COLLECTION = "DELETE_COLLECTION",
  DELETE_ANIME = "DELETE_ANIME",
  BULK_ADD_ANIME_TO_COLLECTION = "BULK_ADD_ANIME_TO_COLLECTION",
  UPDATE_COLLECTION_NAME = "UPDATE_COLLECTION_NAME",
  ADD_NEW_COLLECTION = "ADD_NEW_COLLECTION"
}

export interface AddAnimeToCollectionAction {
  type: "ADD_ANIME_TO_COLLECTION";
  payload: {
    anime: Anime,
    collectionName: string
  }
}

export interface ClearErrorMessageAction {
  type: "CLEAR_ERROR_MESSAGE";
}

export interface ClearSuccessMessageAction {
  type: "CLEAR_SUCCESS_MESSAGE"
}

export interface DeleteCollectionAction {
  type: "DELETE_COLLECTION";
  payload: string;
}

export interface BulkAddAnimeToCollectionAction {
  type: "BULK_ADD_ANIME_TO_COLLECTION";
  payload: {
    collectionName: string;
    animes: Anime[];
  };
}

export interface UpdateCollectionNameAction {
  type: "UPDATE_COLLECTION_NAME";
  payload: {
    prevCollectionName: string;
    newCollectionName: string;
  }
}

export interface AddNewCollectionAction {
  type: "ADD_NEW_COLLECTION";
  payload: string;
}

export interface DeleteAnimeAction {
  type: "DELETE_ANIME";
  payload:{
    collectionName: string,
    animeId: number
  }
}

export type DispatchActions = AddAnimeToCollectionAction | ClearErrorMessageAction | ClearSuccessMessageAction | DeleteCollectionAction | BulkAddAnimeToCollectionAction | UpdateCollectionNameAction | AddNewCollectionAction | DeleteAnimeAction