import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Items from "./pages/items";
import Details from "./pages/details";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/desserts" element={<Items />} />
        <Route path="/desserts/:id" element={<Details />} />
      </Routes>
    </Router>
  );
};

export default App;
