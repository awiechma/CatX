import React, { useState } from "react";
import './App.css';
import Button from "./components/Button";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import ListGroup from "./components/ListGroup";
import { Link } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (term) => {
        console.log("Search term submitted:", term);
        setSearchTerm(term);
    };

    return (
        <div className="app-container">
            <Navbar />

            <div className="start-search">
                <p>
                    Looking for something?
                    <br />START SEARCH HERE ►
                </p>
            </div>
            <SearchBar onSearch={handleSearch} />
            <div className="left-aligned-container">
                <div className="left-aligned-container-view">
                    <p>Specify your search?</p>
                    <Link to="/view" className="btn-view">
                        <Button text="View" />
                    </Link>
                </div>
                <div className="left-aligned-container-add">
                    <p>Add models?</p>
                    <Link to="/add" className="btn-add">
                        <Button text="Add" />
                    </Link>
                </div>
                <div className="left-aligned-container-account">
                    <p>No account?</p>
                    <Link to="/account" className="btn-account">
                        <Button text="Log in" />
                    </Link>
                </div>
                <div className="left-aligned-container-help">
                    <p>Need help?</p>
                    <Link to="/help" className="btn-help">
                        <Button text="Help" />
                    </Link>
                </div>
                <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
            </div>
            <div className="right-aligned-container">
                <h3>Recently added:</h3>
                <ListGroup className="list-recently-added" />
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>
            <Footer />   
        </div>

    );
}

export default App;
