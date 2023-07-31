import { createContext } from "react";
import { Anime } from "../interfaces";

export const CollectionContext = createContext({});
export const CollectionDispatchContext = createContext({});

export const collectionReducer = (
  state: Record<string, Anime[]> = initialState,
  action: Record<string, any>
) => {
  switch (action.type) {
    case "ADD_ANIME_TO_COLLECTION":  
      const anime: Anime =  {
        id: action.payload.anime.id,
        title: action.payload.anime.title.english,
        coverImage: action.payload.anime.coverImage.large,
      }

      if (!action.payload.collectionName) {
        console.log("masuk sini lagi")
        state["New"] = [
          anime,
        ];
      } else {
        if (state[action.payload.collectionName]) {
          const collectionName = action.payload.collectionName;
          const isAnimeExistedInCollection = state[collectionName].find(
            (anime) => anime.id === action.payload.anime.id
          );
          console.log(anime.id)
          console.log(!isAnimeExistedInCollection)
          if (!isAnimeExistedInCollection)
            state[collectionName].push(anime);
        }
      }
      console.log(state)
      return state;
    case "ADD_NEW_COLLECTION":
      const collections = Object.keys(state)
      const isCollectionExisted = collections.find((collection) => collection === action.payload)
      if(!isCollectionExisted) {
        state[action.payload] = []
      }
      return state
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

export const initialState: Record<string, Anime[]> = {};
