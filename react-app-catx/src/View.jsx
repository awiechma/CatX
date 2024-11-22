import React, { useState } from "react";
import "./View.css";
import SearchBar from "./components/SearchBar";
import FilterableListGroup from "./components/FilterableListGroup";

const View = () => {
    // state for searching
    const [searchQuery, setSearchQuery] = useState(""); 

    return (
        <div className="search-filter-container">
            {/* SearchBar */}
            <SearchBar onSearch={(query) => setSearchQuery(query)} />

            {/* FilterableListGroup */}
            <div className="FilterableListGroup-container">
                <FilterableListGroup searchQuery={searchQuery} />
            </div>
        </div>
    );
};

export default View;

