import { Router } from "@reach/router";
import Main from "components/Main";
import MediaDetails from "components/MediaDetails";
import store from "configureStore";
import { ROUTES } from "constants/urls";
import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <ToastContainer newestOnTop={true} autoClose={2000} />
      <Router>
        <Main path={ROUTES.home} />
        <MediaDetails
          path={ROUTES.mediaDetails}
          medias={store.getState().medias}
        />
      </Router>
    </Provider>
  );
}

export default App;
