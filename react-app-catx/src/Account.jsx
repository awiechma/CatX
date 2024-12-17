import React from "react";
import './Account.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AccountHandler from "./components/AccountHandler";


const Account = () => {
    return (
        <div>
            <Navbar/>
            <AccountHandler/>
            <Footer/>
        </div>
    );
};

export default Account;
