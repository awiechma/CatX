import React from "react";
import "./Account.css";
import "./global.css";
import LogInSignIn from "./components/Account/LogInSignIn";
import AccountPage from "./components/Account/AccountPage";
import useAuth from "./components/UserAuth";

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
