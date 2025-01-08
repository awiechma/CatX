// import all the components used in the app
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Add.css";
import Formular from "./components/Formular";
import Footer from "./components/Footer";



const Add = () => {
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



