import React from "react";
import Dashboard from "./pages/dashboard/Dashboard";
import LandingPage from "./pages/landingPage/LandingPage";
import Header from "./components/header/Header";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/Dashboard" element={<Dashboard />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
