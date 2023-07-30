import { createContext } from "react";
import { Collection, State } from "../interfaces";

export const CollectionContext = createContext({});
export const CollectionDispatchContext = createContext({});

export const collectionReducer = (
  state: Record<string, Collection[]> = initialState,
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
            id: action.payload.id,
            title: action.payload.title.english,
            coverImage: action.payload.coverImage.large,
          },
        ];
      } else {
        if (state[action.payload.title.english]) {
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
