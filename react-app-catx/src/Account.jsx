import React from "react";
import './Account.css';
import Button from "./components/Button";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import LogInSignIn from "./components/LogInSignIn";
import Footer from "./components/Footer";

const Account = () => {
    return (
        <div>
            <Navbar />
            <SearchBar />
            <LogInSignIn />
            <Footer />
        </div>
    );
};

export default Account;
