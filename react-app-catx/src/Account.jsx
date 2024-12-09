import React from "react";
import './Account.css';
import Button from "./components/Button";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import AccountHandler from "./components/AccountHandler";

const Account = () => {
    return (
        <div>
            <Navbar />
            <SearchBar />
            <AccountHandler/>
        </div>
    );
};

export default Account;
