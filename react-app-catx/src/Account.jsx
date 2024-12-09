import React from "react";
import './Account.css';
import Button from "./components/Button";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import LogInSignIn from "./components/LogInSignIn";

const Account = () => {
    return (
        <div>
            <Navbar />
            <SearchBar />
            <LogInSignIn/>
            </div>
    );
};

export default Account;
