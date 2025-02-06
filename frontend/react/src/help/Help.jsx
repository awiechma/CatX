// import all the components used in the app
import React from "react";
import "./Help.css";
import ScrollSpy from "./components/Scrollspy";

const Help = () => {
  return (
    <div className="content-div d-flex flex-column overflow-auto h-18">
      <div className="p-2">
        <h3>User Guide for STAC Metadata Integration</h3>
        <p>
          This guide introduces what STAC is and how to work with STAC clients
          in R and Python, enabling you to query STAC catalogs, retrieve
          metadata, and download datasets. Whether you’re using R’s RSTAC
          package or Python’s PySTAC library, this guide will help you integrate
          STAC functionality into your workflows.
        </p>
      </div>

      <ScrollSpy className="h-80" />
    </div>
  );
};

export default Help;
