import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AnimeListPageContainer from "../pages/animeListPage/animeListPageContainer";
import AnimeDetailPageContainer from "../pages/animeDetailPage/animeDetailPageContainer";
import CollectionListPageContainer from "../pages/collectionListPage/collectionListPageContainer";
import CollectionDetailPageContainer from "../pages/collectionDetailPage/collectionDetailPageContainer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Oops! There was an error.</div>,
    children: [
      {
        path: "",
        element: <AnimeListPageContainer />,
      },
      {
        path: "anime/:id",
        element: <AnimeDetailPageContainer />,
      },
      {
        path: "collection",
        element: <CollectionListPageContainer />,
      },
      {
        path: "collection/:id",
        element: <CollectionDetailPageContainer />,
      },
    ],
  },
]);

export default router;
