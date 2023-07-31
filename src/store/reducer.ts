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
    case "UPDATE_COLLECTION_NAME":
        const prevCollectionName = action.payload.prevCollectionName
        const prevCollection = [...state[prevCollectionName]]
        const collectionNames = Object.keys(state)
        
        const isCollectionUnique = collectionNames.findIndex((collection: string) => collection === action.payload.newCollectionName)

        console.log(state[prevCollectionName])
        console.log(action.payload.newCollectionName)

        if(isCollectionUnique){
          // const {[prevCollectionName]: remove, ...rest} = state
          // console.log("rest",rest)
          // console.log("removed",remove)
          // delete state[prevCollectionName]
          Object.assign(state, {
       
            [action.payload.newCollectionName]: prevCollection
          })[prevCollectionName]
          delete state[prevCollectionName]
        }
        return state
    case "DELETE_ANIME":
      const newState = JSON.parse(JSON.stringify(state))
      const collection = newState[action.payload.collectionName]
      const newCollection = collection.findIndex((anime : Anime) => anime.id === action.payload.animeId)
  
      newState[action.payload.collectionName] = [
        ...newState[action.payload.collectionName].slice(0, newCollection),
        ...newState[action.payload.collectionName].slice(newCollection + 1)
      ]
      return newState
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
  return state
};

export const initialState: Record<string, Anime[]> = {};
