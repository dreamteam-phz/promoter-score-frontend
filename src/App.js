import React from "react";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/home/Home";
import Form from "./components/form/Form";
import Header from "./components/header/Header";
import Instructions from "./pages/instructions/Instructions";
import Settings from "./pages/userSettings/Settings";
import Survey from "./pages/survey/Survey";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/form" element={<Form />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Survey" element={<Survey />}></Route>
        <Route path="/Settings" element={<Settings />}></Route>
        <Route path="/Dashboard" element={<Dashboard />}></Route>
        <Route path="/Instructions" element={<Instructions />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
