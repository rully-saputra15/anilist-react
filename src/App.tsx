import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { css } from "@emotion/react";
import { CollectionProvider } from "./store";
import { Suspense } from "react";
import Loading from "./components/Loading";

const App = () => {
  return (
    <>
      <Navbar />
      <div
        css={css({
          margin: "1rem",
        })}
      >
        <CollectionProvider>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </CollectionProvider>
      </div>
    </>
  );
};

export default App;
