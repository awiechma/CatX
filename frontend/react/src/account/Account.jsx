import React from "react";
import "./Account.css";
import "../global.css";
import LogInSignIn from "./components/LogInSignIn";
import AccountPage from "./components/AccountPage";
import useAuth from "../shared/UserAuth";

/*
* React component that renders the Account page.
*/
const Account = () => {
  const isLoggedIn = useAuth();

  return (
    <div className="content-div">
      {isLoggedIn === null ? (
        <p>Checking login status...</p>
      ) : isLoggedIn ? (
        <AccountPage />
      ) : (
        <LogInSignIn />
      )}
    </div>
  );
};

export default Account;
