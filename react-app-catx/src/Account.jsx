import React from "react";
import './Account.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LogInSignIn from "./components/Account/LogInSignIn";
import AccountPage from "./components/Account/AccountPage";
import useAuth from "./components/UserAuth";


const Account = () => {
    const isLoggedIn = useAuth();

    if (isLoggedIn === null) {
        return <div>Überprüfe Anmeldestatus...</div>;
    }

    if (isLoggedIn === false) {
        return (
            <div>
                <Navbar />
                <LogInSignIn />
                <Footer />
            </div>
        );
    } else {
        return (
            <div>
                <Navbar />
                <AccountPage />
                <Footer />
            </div>
        );
    };

};

export default Account;
