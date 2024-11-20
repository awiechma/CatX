// import all the components used in the app
import React from "react";
import './App.css';
import Button from "./components/Button";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import ListGroup from "./components/ListGroup";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";


// homepage layout
function App() {
    return (
        <div>
            <Navbar />
            {<div className="start-search">
                <p>Looking for something?
                    <br></br>START SEARCH HERE ►
                </p>
            </div>}
            <SearchBar />
            {    
            <div className="left-aligned-container">      
               { <div className="left-aligned-container-view">
                  <p>Specify your search?</p>
                  <Link to="/view" className="btn-view">
                   <Button text="View" /> 
                   </Link>
                  </div> 
                  }
                   {                
                <div className="left-aligned-container-add">
                  <p>Add models?</p>
                  <Link to="/add" className="btn-add">
                  <Button text="Add"/> 
                  </Link>
                  </div> 
                  }
                   {                
                <div className="left-aligned-container-account">
                  <p>No account?</p>
                  <Link to="/account" className="btn-account">
                  <Button text="Log in"/> 
                  </Link>
                  </div> 
                  }
                   {                
                <div className="left-aligned-container-help">
                  <p>Need help?</p>
                  <Link to="/help" className="btn-help">
                  <Button text="Help" /> 
                  </Link>
                  </div> 
                  }
                </div>}
            {<div className="right-aligned-container">
                <h3>Recently added:</h3>
                <ListGroup className="list-recently-added"/>
            </div>
            }
        </div>

    );
}

export default App;
