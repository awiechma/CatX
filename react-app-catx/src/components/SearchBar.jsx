import React, { useState } from "react";

// Creates a search bar with a search button
const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value); // Real time search
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm); // sending
    };

    return (
        <div className="SearchBar-container">
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <input
                    className="searchbar-whitespace"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <button className="btn btn-outline-searchbar" type="submit">
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
