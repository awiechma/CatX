// import all the components used in the app
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Add.css";
import SearchBar from "./components/SearchBar";
import Formular from "./components/Formular";
import Footer from "./components/Footer";



const Add = () => {
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState("");
    // take the search input from router-state 
    useEffect(() => {
        if (location.state?.searchQuery) {
            setSearchQuery(location.state.searchQuery);
        }
    }, [location.state]);
    return (
      <div className="add-page-container">
            <div className="content">
                <div className="search-filter-container">
                    <SearchBar
                        onSearch={(query) => setSearchQuery(query)}
                        initialSearchTerm={searchQuery}
                    />
                </div>

                <div className="heading-add-page">
                    <h1>Form for metadata</h1>
                </div>

                <div className="formular-form">
                    <Formular />
                </div>
            </div>
            <Footer />
        </div>

    );


};

export default Add;



