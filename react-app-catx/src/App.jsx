import React, { useEffect, useState } from "react";
import './App.css';
import Button from "./components/Button";
import Navbar from "./components/Navbar";
import { Link } from "react-router-dom";
import Footer from "./components/Footer";

function App() {

    const [recentItems, setRecentItems] = useState([]);

    useEffect(() => {
        const fetchRecentItems = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/recent-items');
                const data = await response.json();
                setRecentItems(data);
            } catch (error) {
                console.error('Error fetching recent items:', error);
            }
        };
        fetchRecentItems();
    }, []);

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
                        <div className="recent-items-list">
                            {recentItems.map((item) => (
                                //TODO /view/${item.id}
                                <Link to={`/view/`} key={item.id} className="recent-item-box mb-3">
                                    <div className="recent-item-content center-vertical">
                                        <strong>{item.properties['mlm:name']}</strong>
                                        <p>{item.properties.description}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default App;