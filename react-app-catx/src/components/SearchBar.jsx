import React from "react";

// creates searchbar with a searchbutton
const SearchBar = () => {
    return (
        <div className="SearchBar-container">
            <form className="d-flex" role="search">
                <input className="searchbar-whitespace me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-searchbar" type="submit">Search</button>
            </form>
        </div>
    );
};

export default SearchBar;
