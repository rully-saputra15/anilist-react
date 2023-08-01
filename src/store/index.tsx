import { useEffect, useReducer } from "react";
import {
  CollectionContext,
  CollectionDispatchContext,
  collectionReducer,
  initialData,
} from "./reducer";

export const CollectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(collectionReducer, initialData);

  useEffect(() => {
    localStorage.setItem("collections", JSON.stringify(state.data));
  }, [state]);

  return (
    <CollectionContext.Provider value={state}>
      <CollectionDispatchContext.Provider value={dispatch}>
        {children}
      </CollectionDispatchContext.Provider>
    </CollectionContext.Provider>
  );
};
