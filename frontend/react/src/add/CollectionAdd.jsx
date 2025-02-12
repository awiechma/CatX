import React from "react";
import "./ItemAdd.css";
import "../global.css";
import ItemFormular from "./components/CollectionFormular";
import useAuthStatus from "../shared/UserAuth";
import { useNavigate } from "react-router-dom";

/*
* React component that renders the Add Collection page.
*/
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
      <div className="custom-container">
        <h3>Add a new Collection</h3>
      </div>
      <div className="formular-form">
        <ItemFormular />
      </div>
    </div>
  );
};

export default CollectionAdd;
