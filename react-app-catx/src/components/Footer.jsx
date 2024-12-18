import React from "react";
import "../App.css"; // Importiere die CSS-Datei

const Footer = () => {
    return (
        <footer className="bg-body-tertiary fixed-bottom text-center shadow-lg text-black py-3 mt-4">
            <div className="footer-container">
                <p>&copy; {new Date().getFullYear()} CatX. All rights reserved.</p>
                <nav className="footer-nav">
                    <a href="/about" className="footer-link">About us</a>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
