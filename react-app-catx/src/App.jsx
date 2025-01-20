import React from 'react';
import './App.css';
import Button from "./components/Button";
import Navbar from "./components/Navbar";
import { Link } from "react-router-dom";
import Footer from "./components/Footer";
import RecentItems from "./components/App/RecentItems";

function App() {

    return (
        <div className="app-container">
            <div className="d-flex flex-column min-vh-100">
                <Navbar />
                <main className="flex-grow-1">
                    <div className="left-aligned-container">
                        <div className="left-aligned-container-small view bg-body-tertiary">
                            <p>Specify your search?</p>
                            <Link to="/view" className="btn-view">
                                <Button text="View" />
                            </Link>
                        </div>
                        <div className="left-aligned-container-small add bg-body-tertiary">
                            <p>Add models?</p>
                            <Link to="/add" className="btn-add">
                                <Button text="Add" />
                            </Link>
                        </div>
                        <div className="left-aligned-container-small account bg-body-tertiary">
                            <p>No account?</p>
                            <Link to="/account" className="btn-account">
                                <Button text="Log in" />
                            </Link>
                        </div>
                        <div className="left-aligned-container-small help bg-body-tertiary">
                            <p>Need help?</p>
                            <Link to="/help" className="btn-help">
                                <Button text="Help" />
                            </Link>
                        </div>
                    </div>
                    <div className="right-aligned-container bg-body-tertiary">
                        <div className="mb-5"><h3>Recently Added Models</h3></div>
                        <RecentItems />
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default App;