import React, { useState, useEffect } from "react";

const SearchBar = ({ searchString, setSearchString }) => {

    const [searchTerm, setSearchTerm] = useState(searchString);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSearchString(searchTerm);
    }

    return (
        <div className="custom-container bg-body-tertiary">
            <h3>Search for models</h3>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={handleInputChange}
                    style={{ width: '100%' }}
                />
                <button className="btn btn-outline-searchbar" type="submit">
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
