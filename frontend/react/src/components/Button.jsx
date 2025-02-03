import React from "react";

// creates default button with name variable given in App.jsx
const Button = ({ text = "", className = "", onClick }) => {
    return (
        <button type="button" className={`btn ${className}`} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
