import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ onSearch, initialSearchTerm = "" }) => {
    // Create a state variable to hold the search term, with an optional initial value
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const navigate = useNavigate();

    // Create a state variable to hold the search term, with an optional initial value
    useEffect(() => {
        setSearchTerm(initialSearchTerm);
    }, [initialSearchTerm]);

    // This function handles the change in the input field
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (onSearch) {
            onSearch(value); 
        }
    };

    // This function handles the form submission (when the user clicks "Search")
    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== "") {
            if (onSearch) {
                onSearch(searchTerm);
            }
            navigate("/view", { state: { searchQuery: searchTerm } });
        } else {
            alert("Please enter a search term.");
        }
    };

    return (
        <div className="SearchBar-container">
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
