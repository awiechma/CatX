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
        <div>
            {/* Container for the h1 */}
            <div className="heading-add-page">
                <h1>Form for metadata</h1>
            </div>

            <Formular />
            <Footer />
        </div>
    );


};

export default Add;



