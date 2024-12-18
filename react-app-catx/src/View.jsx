import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./View.css";
import SearchBar from "./components/SearchBar";
import FilterableListGroup from "./components/FilterableListGroup";
import Footer from "./components/Footer";

const View = () => {
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState("");

    // take the search input from router-state 
    useEffect(() => {
        if (location.state?.searchQuery) {
            setSearchQuery(location.state.searchQuery);
        }
    }, [location.state]);

    return (
        <div className="d-flex flex-column min-vh-100">
            <main className="flex-grow-1">
                {/* SearchBar: "searchQuery" state stays */}
                <SearchBar
                    onSearch={(query) => setSearchQuery(query)}
                    initialSearchTerm={searchQuery}
                />

                <div className="FilterableListGroup-container">
                    <FilterableListGroup searchQuery={searchQuery} />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default View;
