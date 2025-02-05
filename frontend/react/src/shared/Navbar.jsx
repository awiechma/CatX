import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min";

// creates navbar with different subpages
const Navbar = () => {
  const handleLogoClick = () => {
    window.location.href = "/";
  };

  return (
    <nav className="navbar fixed-top navbar-expand-lg bg-bedddd">
      <div className="container-fluid bg-bedddd">
        <a
          className="navbar-brand"
          onClick={handleLogoClick}
          href="#"
          style={{
            fontSize: "1.5rem",
            marginRight: "1rem",
            marginLeft: "1rem",
          }}
        >
          <img
            src="../../CatX_Logo.png"
            alt="Logo"
            width="35"
            height="35"
            className="d-inline-block align-text-top"
          />
          Cat <p style={{ fontFamily: "Times New Roman" }}> &chi;</p>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                id="navbarDropdown"
              >
                View
              </Link>
              <div className="dropdown-menu bg-bedddd" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/view/collections">
                  Collections
                </Link>
                <Link className="dropdown-item" to="/view/items">
                  Items
                </Link>
              </div>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                id="navbarDropdown"
              >
                Add
              </Link>
              <div className="dropdown-menu bg-bedddd" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/add/collection">
                  Collection
                </Link>
                <Link className="dropdown-item" to="/add/item">
                  Item
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/account">
                Account
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/help">
                Help
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
