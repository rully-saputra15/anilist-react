import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { css } from "@emotion/react";
import { CollectionProvider } from "./store";

const App = () => {
  return (
    <>
      <div>
        <Navbar />
        <div
          css={css({
            padding: "1rem",
          })}
        >
          <CollectionProvider>
            <Outlet />
          </CollectionProvider>
        </div>
      </div>
    </>
  );
};

export default App;
