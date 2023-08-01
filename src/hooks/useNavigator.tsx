import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useNavigator = () => {
  const navigate = useNavigate();

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return { handleGoBack };
};

export default useNavigator;
