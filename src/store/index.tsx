import { useEffect, useReducer } from "react";
import {
  CollectionContext,
  CollectionDispatchContext,
  collectionReducer,
  initialData,
} from "./reducer";
import { handleShowErrorToast, handleShowSuccessToast } from "../utils/toast";

export const CollectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(collectionReducer, initialData);

  useEffect(() => {
    localStorage.setItem("collections", JSON.stringify(state.data));
  }, [state]);

  useEffect(() => {
    if (state.errorMessage) {
      handleShowErrorToast(state.errorMessage);
    }
  }, [state.errorMessage]);

  useEffect(() => {
    if (state.successMessage) {
      handleShowSuccessToast(state.successMessage);
    }
  }, [state.successMessage]);

  return (
    <CollectionContext.Provider value={state}>
      <CollectionDispatchContext.Provider value={dispatch}>
        {children}
      </CollectionDispatchContext.Provider>
    </CollectionContext.Provider>
  );
};
