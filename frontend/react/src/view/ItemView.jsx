import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ItemView.css";
import "../global.css";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import ItemList from "./components/ItemList";

// React component for the item view page
const ItemView = () => {
  const location = useLocation();
  const [searchString, setSearchString] = useState(
    localStorage.getItem("searchTerm") || ""
  );
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    localStorage.removeItem("searchTerm");
  }, [searchString]);

  // take the search input from router-state
  useEffect(() => {
    if (location.state?.searchString) {
      setSearchString(location.state.searchString);
    }
    if (location.state?.selectedTags) {
      setSelectedTags(location.state.selectedTags);
    }
  }, [location.state]);

  return (
    <div className="content-div">
      <SearchBar
        searchString={searchString}
        setSearchString={setSearchString}
      />
      <Filter selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
      <ItemList searchString={searchString} selectedTags={selectedTags} />
    </div>
  );
};

export default ItemView;
