import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./Home/Welcome";
import Home from "./Home/Home";
import Form from "./Home/Form";
import { createStore } from "redux";
import reducer from './Store/reducer';
import { Provider } from "react-redux";

import FormMobile from "./Home/FormMobile"


const store = createStore(reducer);

function App() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => window.addEventListener('resize', () => setWidth(window.innerWidth)), []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="home" element={<Home />} />
          <Route path=":id" element={(width > 721) ? <Form /> : <FormMobile />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
