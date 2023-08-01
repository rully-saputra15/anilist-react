import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { css } from "@emotion/react";
import { CollectionProvider } from "./store";

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
          <Outlet />
        </CollectionProvider>
      </div>
    </>
  );
};

export default App;
