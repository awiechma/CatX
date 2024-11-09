// import all the components used in the app
import React from "react";
import './App.css';
import Button from "./components/Button";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import ListGroup from "./components/ListGroup";

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
                   <Button text="View" className="btn-view" onClick={() => alert("Submit clicked")} /> 
                  </div> 
                  }
                   {                
                <div className="left-aligned-container-add">
                  <p>Add models?</p>
                  <Button text="Add" className="btn-add" onClick={() => alert("Submit clicked")} /> 
                  </div> 
                  }
                   {                
                <div className="left-aligned-container-account">
                  <p>No account?</p>
                  <Button text="Log in / Sign in" className="btn-account" onClick={() => alert("Submit clicked")} /> 
                  </div> 
                  }
                   {                
                <div className="left-aligned-container-help">
                  <p>Need help?</p>
                  <Button text="Help" className="btn-help" onClick={() => alert("Submit clicked")} /> 
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
