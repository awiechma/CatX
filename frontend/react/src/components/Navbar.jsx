import React from "react";
import { Link } from "react-router-dom";

// creates navbar with different subpages
const Navbar = () => {
  const handleLogoClick = () => {
    window.location.href = "/";
  };

  return (
    <nav className="navbar fixed-top navbar-expand-lg bg-bedddd">
      <div className="container-fluid bg-bedddd">
        <a className="navbar-brand" onClick={handleLogoClick} href="#" style={{ fontSize: '1.5rem', marginRight: '1rem', marginLeft: '1rem' }}>
          <img src="../../CatX_Logo.png" alt="Logo" width="35" height="35" className="d-inline-block align-text-top" style={{ fontSize: '1.5rem', marginRight: '1rem' }} />
          Cat <p style={{ fontFamily: 'Times New Roman' }}> &chi;</p>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ fontSize: '1.5rem', marginRight: '1rem' }}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/view" style={{ fontSize: '1.5rem', marginRight: '1rem' }}>View</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add" style={{ fontSize: '1.5rem', marginRight: '1rem' }}>Add</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/account" style={{ fontSize: '1.5rem', marginRight: '1rem' }}>Account</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/help" style={{ fontSize: '1.5rem', marginRight: '1rem' }}>Help</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

