import React from "react";
import { BrowserRouter } from "react-router-dom";
import Main2 from "./Main2";
import store from "./redux/store.js";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Main2 />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
