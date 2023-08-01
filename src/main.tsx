import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import router from "./routes/index.tsx";
import { Toaster } from "react-hot-toast";

const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache: new InMemoryCache(),
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Toaster position="bottom-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
