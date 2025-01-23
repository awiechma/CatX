import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./View.css";
import SearchBar from "./components/View/SearchBar";
import Filter from "./components/View/Filter";
import Footer from "./components/Footer";
import ItemListAndDisplay from "./components/View/ItemListAndDisplay";

const View = () => {
    const location = useLocation();
    const [searchString, setSearchString] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);

    // take the search input from router-state 
    useEffect(() => {
        if (location.state?.searchString) {
            setSearchString(location.state.searchString);
        }
        if (location.state?.selectedTags) {
            setSelectedTags(location.state.selectedTags);
        }
    }, [location.state]);

    return (
        <div className="page-div">
            <div className="view-div">
                <SearchBar
                    searchString={searchString}
                    setSearchString={setSearchString}
                />
                <Filter
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                />
                <ItemListAndDisplay
                    searchString={searchString}
                    selectedTags={selectedTags}
                />
            </div>

            <Footer />
        </div>
    );
};

export default View;
