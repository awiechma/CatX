import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import App from "./App";
import View from "./View";
import Add from "./Add";
import Account from "./Account";
import Help from "./Help";
import About from "./About";
import ItemDetail from "./components/View/ItemDetail.jsx";

const Join = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/items?limit=100");
        const data = await response.json();
        setItems(data);  
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);  

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/view" element={<View />} />
        <Route path="/view/:itemId" element={<ItemDetail items={items} />} />
        <Route path="/add" element={<Add />} />
        <Route path="/account" element={<Account />} />
        <Route path="/help" element={<Help />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default Join;
