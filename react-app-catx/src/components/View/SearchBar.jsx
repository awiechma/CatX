import React, { useState, useEffect } from "react";

const SearchBar = ({ searchString, setSearchString }) => {

    // Local state to manage the input field value
    const [searchTerm, setSearchTerm] = useState(searchString);

    // Handles changes in the search input field
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    }

    // Handles form submission to update the search string in parent component
    const handleSubmit = (e) => {
        e.preventDefault() // Prevents page reload
        setSearchString(searchTerm); // Passes updated search term to parent component
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
                    value={searchTerm} // Binds input value to state
                    onChange={handleInputChange} // Updates state on user input
                    style={{ width: '100%' }}
                />
                <button className="btn-outline-searchbar" type="submit">
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
