import React from "react";
import "./ItemView.css";
import "../global.css";
import CollectionList from "./components/CollectionList";

const CollectionView = () => {
  return (
    <div className="content-div">
      <div className="custom-container h-95">
        <h3>Collections</h3>
        <CollectionList />
      </div>
    </div>
  );
};

export default CollectionView;
