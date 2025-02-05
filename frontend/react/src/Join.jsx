import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import ItemDetail from "./detail/ItemDetail";
import App from "./start/App";
import ItemView from "./view/ItemView";
import CollectionView from "./view/CollectionView";
import CollectionDetail from "./detail/CollectionDetail";
import Add from "./add/Add";
import Account from "./account/Account";
import Help from "./help/Help";
import About from "./about/About";

// linking betweeen pages react-style 😎
const Join = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/view/items" element={<ItemView />} />
        <Route path="/view/items/:itemId" element={<ItemDetail />} />
        <Route path="/view/collections" element={<CollectionView />} />
        <Route path="/view/collections/:collectionId" element={<CollectionDetail />} />
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
