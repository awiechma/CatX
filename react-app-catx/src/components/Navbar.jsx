import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#" style={{ fontSize: '1.5rem', marginRight: '1rem', marginLeft: '1rem'}}><img src="./public/CatX_Logo.png" alt="Logo" width="35" height="35" className="d-inline-block align-text-top" style={{ fontSize: '1.5rem', marginRight: '1rem'}}></img>CatX</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#" style={{ fontSize: '1.5rem', marginRight: '1rem'}}>Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={{ fontSize: '1.5rem', marginRight: '1rem'}}>View</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={{ fontSize: '1.5rem', marginRight: '1rem'}}>Add</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={{ fontSize: '1.5rem', marginRight: '1rem'}}>Account</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={{ fontSize: '1.5rem', marginRight: '1rem'}}>Help</a>
            </li>
            {/* <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
