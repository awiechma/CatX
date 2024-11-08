import React from "react";
import Button from "./components/Button";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import './App.css';
import ListGroup from "./components/ListGroup";


function App() {
    return (
        <div>
            <Navbar />
            {<div className="start-search">
                <p>Looking for something?
                    <br></br>START SEARCH HERE ►
                </p>
            </div>}

            <SearchBar />
            <h1>Welcome to the catalog for EO ML models! <br></br>Have fun!</h1>
            {
                <div className="left-aligned-container">

                </div>}
            {<div className="right-aligned-container">
                <h3>Recently added:</h3>
                <ListGroup />
            </div>
            }
        </div>

    );
}

export default App;
