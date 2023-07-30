import { createContext } from "react";
import { Anime, State } from "../interfaces";

export const CollectionContext = createContext({});
export const CollectionDispatchContext = createContext({});

export const collectionReducer = (
  state: Record<string, Anime[]> = initialState,
  action: Record<string, any>
) => {
  switch (action.type) {
    case "ADD_COLLECTION":
      // eslint-disable-next-line no-case-declarations
      const isExisted = Object.keys(state).length > 0;
      console.log(action.payload);
      if (!isExisted) {
        state["New"] = [
          {
            id: action.payload.anime.id,
            title: action.payload.anime.title.english,
            coverImage: action.payload.anime.coverImage.large,
          },
        ];
      } else {
        if (state[action.payload.collectionName]) {
          const collectionName = action.payload.collectionName;
          const isAnimeExistedInCollection = state[collectionName].find(
            (anime) => anime.id === action.payload.anime.id
          );
          if (!isAnimeExistedInCollection)
            state[action.payload.title.english].push(action.payload);
        }
      }
      return state;
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

export const initialState: Record<string, Collection[]> = {};
