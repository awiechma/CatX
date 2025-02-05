import React from "react";
import "./ItemAdd.css";
import "../global.css";
import Formular from "./components/Formular";
import useAuthStatus from "../shared/UserAuth";
import { useNavigate } from "react-router-dom";

const CollectionAdd = () => {
  const isLoggedIn = useAuthStatus();
  const navigate = useNavigate();

  if (isLoggedIn === null) {
    return <div>Checking login status...</div>;
  }

  if (isLoggedIn === false) {
    return (
      <div className="add-page-container center-content">
        <div className="alert alert-warning">
          <div className="alert-message">
            You are not logged in. Please log in.
          </div>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/account")}
          >
            To Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="content-div ">
      <div className="heading-add-page custom-container">
        <h3>Form for metadata</h3>
      </div>
      <div className="formular-form">
        <Formular />
      </div>
    </div>
  );
};

export default CollectionAdd;
