import { useReducer } from "react";
import {
  CollectionContext,
  CollectionDispatchContext,
  collectionReducer,
  initialState,
} from "./reducer";

export const CollectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(collectionReducer, initialState);

  return (
    <CollectionContext.Provider value={state}>
      <CollectionDispatchContext.Provider value={dispatch}>
        {children}
      </CollectionDispatchContext.Provider>
    </CollectionContext.Provider>
  );
};
