import React from "react";
import "./Add.css";
import Formular from "./components/Add/Formular";
import Footer from "./components/Footer";
import useAuth from "./UserAuth";
import { useNavigate } from "react-router-dom";

const Add = () => {
    const isLoggedIn = useAuth();
    const navigate = useNavigate();

    if (isLoggedIn === null) {
        return <div>Überprüfe Anmeldestatus...</div>;
    }

    if (isLoggedIn === false) {
        return (
            <div className="add-page-container center-content">
                <div className="alert alert-warning">
                    <div className="alert-message">Du bist nicht angemeldet. Bitte melde dich an.</div>
                    <button className="btn btn-primary" onClick={() => navigate("/account")}>
                        Zum Account
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="add-page-container">
            <div className="content">
                <div className="heading-add-page">
                    <h3>Form for metadata</h3>
                </div>
                <div className="formular-form">
                    <Formular />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Add;