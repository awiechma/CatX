import React from "react";

const SearchBar = () => {
    return (
        <div className="SearchBar-container">
            <form className="d-flex" role="search">
                <input className="searchbar-whitespace form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
    );
};

export default SearchBar;
