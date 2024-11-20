// import all the components used in the app
import React from "react";
import "./View.css";
import Button from "./components/Button";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import FilterableListGroup from "./components/FilterableListGroup";

const View = () => {
    return (
        <div className="FilterableListGroup-container">
            <FilterableListGroup></FilterableListGroup>
        </div>
    );
};

export default View;