import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import App from "./App";
import View from "./View";
import Add from "./Add";
import Account from "./Account";
import Help from "./Help";
import About from "./About";

const Join = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/view" element={<View />} />
        <Route path="/add" element={<Add />} />
        <Route path="/account" element={<Account />} />
        <Route path="/help" element={<Help />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default Join;
