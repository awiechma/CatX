// import all the components used in the app
import React from "react";
import "./Help.css";
import Button from "./components/Button";
import Navbar from "./components/Navbar";
import ScrollSpy from "./components/Scrollspy";
import Footer from "./components/Footer";

const Help = () => {
  return (
    <div>
      <Navbar />
      <div className="intro-to-help">
        <h3>User Guide for STAC Metadata Integration</h3>
        <p>
          This guide introduces what STAC is and how to work with STAC clients
          in R and Python, enabling you to query STAC catalogs, retrieve
          metadata, and download datasets. Whether you’re using R’s RSTAC
          package or Python’s PySTAC library, this guide will help you integrate
          STAC functionality into your workflows.
        </p>
      </div>

      <ScrollSpy />
      <Footer />
    </div>
  );
};

export default Help;
