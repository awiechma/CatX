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
                    {/* container for buttons on left side */}
                    <div className="left-aligned-container">
                        <div className="left-aligned-container-small view ">
                            <p>Specify your search?</p>
                            <Link to="/view" className="btn-view">
                                <Button text="View " />
                            </Link>
                        </div>
                        <div className="left-aligned-container-small add">
                            <p>Add models?</p>
                            <Link to="/add" className="btn-add">
                                <Button text="Add" />
                            </Link>
                        </div>
                        <div className="left-aligned-container-small account">
                            <p>No account?</p>
                            <Link to="/account" className="btn-account">
                                <Button text="Login" />
                            </Link>
                        </div>
                        <div className="left-aligned-container-small help">
                            <p>Need help?</p>
                            <Link to="/help" className="btn-help">
                                <Button text="Help " />
                            </Link>
                        </div>
                    </div>
                    {/* recently added on right side */}
                    <div className="right-aligned-container">
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