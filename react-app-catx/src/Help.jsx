// import all the components used in the app
import React from "react";
import './Help.css';
import Button from "./components/Button";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import ScrollSpy from "./components/Scrollspy";
import Footer from "./components/Footer";



const Help = () => {
    return (
        <div>
            <Navbar />
            <SearchBar />
            <ScrollSpy />
            <Footer />
        </div>
    );
};

export default Help;