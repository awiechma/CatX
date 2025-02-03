import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ItemDetail from "./components/View/ItemDetail";
import App from "./App";
import View from "./View";
import Add from "./Add";
import Account from "./Account";
import Help from "./Help";
import About from "./About";

// linking betweeen pages react-style 😎
const Join = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/view" element={<View />} />
        <Route path="/view/:itemId" element={<ItemDetail />} />
        <Route path="/add" element={<Add />} />
        <Route path="/account" element={<Account />} />
        <Route path="/help" element={<Help />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default Join;
