import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const navigate = useNavigate();
    // Local state to manage the input field value
    const [searchTerm, setSearchTerm] = useState('');

    // Handles changes in the search input field
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    }

    // Handles form submission to update the search string in parent component
    const handleSubmit = (e) => {
        e.preventDefault() // Prevents page reload
        localStorage.setItem("searchTerm", searchTerm)
        navigate(`/view/items`) // Passes updated search term to parent component
    }

    return (
        <div className="custom-container search-filter-container d-flex">
            <h3 className="me-3">Search for models</h3>
            <form className="d-flex flex-grow-1" role="search" onSubmit={handleSubmit}>
                <input
                    className="form-control me-3"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchTerm} // Binds input value to state
                    onChange={handleInputChange} // Updates state on user input
                    style={{ width: '100%' }}
                />
                <button className="btn small-button" type="submit">
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
