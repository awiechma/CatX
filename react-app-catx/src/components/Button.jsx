import React from "react";

const Button = ({ children, color}) => {
    return (
        <button className={"btn btn-" + color}>
            {children}
        </button>
    );
};

export default Button;