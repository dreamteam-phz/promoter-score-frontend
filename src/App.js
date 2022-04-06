import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./Home/Welcome";
import Home from "./Home/Home";
import Form from "./Home/Form";
import { createStore } from "redux";
import reducer from './Store/reducer';
import { Provider } from "react-redux";


const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />}/>
        <Route path="home" element={<Home />}/>
        <Route path=":id" element={<Form />}/>
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
