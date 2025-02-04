import React from "react";
import "./App.css";
import "./global.css"
import Button from "./components/Button";
import SearchBar from "./components/App/SearchBar";
import { Link } from "react-router-dom";
import RecentItems from "./components/App/RecentItems";

function App() {
  return (
    <div className="content-div">
      <div className="d-flex flex-row h-100">
        <div className="flex-column align-items-center left-aligned-container">
          <div className="custom-container w-75 m-auto">
            <p>Specify your search?</p>
            <Link to="/view" className="border rounded bg-white w-75">
              <Button className="small-button w-100" text="View " />
            </Link>
          </div>
          <div className="custom-container w-75 m-auto">
            <p>Add models?</p>
            <Link to="/add" className="border rounded bg-white w-75">
              <Button className="small-button w-100" text="Add" />
            </Link>
          </div>
          <div className="custom-container w-75 m-auto">
            <p>No account?</p>
            <Link to="/account" className="border rounded bg-white w-75">
              <Button className="small-button w-100" text="Login" />
            </Link>
          </div>
          <div className="custom-container w-75 m-auto">
            <p>Need help?</p>
            <Link to="/help" className="border rounded bg-white w-75 min-vh-25">
              <Button className="small-button w-100" text="Help " />
            </Link>
          </div>
        </div>

        <div className="flex-grow d-flex flex-column right-aligned-container">
          <SearchBar className="h-25" />
          <div className="custom-container h-75 flex-fill align-items-start">
            <h3 className="mb-1">Recently Added Models</h3>
            <RecentItems />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
