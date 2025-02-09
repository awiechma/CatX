import React from "react";
import "./ItemView.css";
import "../global.css";
import CollectionList from "./components/CollectionList";

const CollectionView = () => {
  return (
    <div className="content-div">
      <CollectionList />
    </div>
  );
};

export default CollectionView;
