import React from 'react';
import './App.css';
import Button from "./components/Button";
import Navbar from "./components/Navbar";
import SearchBar from "./components/App/SearchBar";
import { Link } from "react-router-dom";
import Footer from "./components/Footer";
import RecentItems from "./components/App/RecentItems";

function App() {

    return (
        <div className="app-container">
            <div className="d-flex flex-column min-vh-100">
                <Navbar />
                <main className="flex-grow-1 d-flex flex-row">
                    <div className="d-flex flex-column w-25 align-items-center">
                        <div className="custom-container w-75 m-auto">
                            <p>Specify your search?</p>
                            <Link to="/view" className="border rounded bg-white w-75">
                                <Button className="w-100" text="View " />
                            </Link>
                        </div>
                        <div className="custom-container w-75 m-auto">
                            <p>Add models?</p>
                            <Link to="/add" className="border rounded bg-white w-75">
                                <Button className="w-100" text="Add" />
                            </Link>
                        </div>
                        <div className="custom-container w-75 m-auto">
                            <p>No account?</p>
                            <Link to="/account" className="border rounded bg-white w-75">
                                <Button className="w-100" text="Login" />
                            </Link>
                        </div>
                        <div className="custom-container w-75 m-auto">
                            <p>Need help?</p>
                            <Link to="/help" className="border rounded bg-white w-75 min-vh-25">
                                <Button className="w-100" text="Help " />
                            </Link>
                        </div>
                    </div>

                    <div className="w-75 flex-grow d-flex flex-column">
                        <SearchBar className="h-25" />
                        <div className="custom-container h-75 flex-fill d-flex flex-column align-items-start">
                            <h3>Recently Added Models</h3>
                            <RecentItems className="flex-fill" />
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default App;