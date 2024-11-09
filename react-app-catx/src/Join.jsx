import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import App from './App';
import View from './View';

const Join = () => {
    return (
        <Router>
            <Navbar />
                <Routes>
                    <Route path="/" element={<App/>} />
                    <Route path="/view" element={<View/>} />
                </Routes>
        </Router>
    );
};

export default Join;