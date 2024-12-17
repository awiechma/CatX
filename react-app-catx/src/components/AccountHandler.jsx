import React, { useState, useEffect } from "react";
import AccountPage from "./AccountPage";
import LogInSignIn from "./LogInSignIn";

const AccountHandler = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);  // Zustand für den Login-Status

    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = localStorage.getItem("catx-user-session-token");
            console.log("Token aus localStorage:", token); // Token anzeigen
            const username = localStorage.getItem("catx-user-session-username");
            console.log("Username aus localStorage:", username); // Username anzeigen
            if (token && username) {
                try {
                    const response = await fetch("http://localhost:3000/api/validatetoken", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "bearer " + token,
                        },
                    });
                    if (response.ok) {
                        setIsLoggedIn(true);
                    } else {
                        setIsLoggedIn(false);
                    }
                } catch (err) {
                    console.error(err);
                    setIsLoggedIn(false);
                }
            } else {
                setIsLoggedIn(false);
            }
        };

        checkLoginStatus();
    }, []);  // Der Effekt läuft nur beim ersten Rendern

    if (isLoggedIn === null) {
        return <div>Loading...</div>;  // Falls der Status noch nicht überprüft wurde
    }

    if (!isLoggedIn) {
        localStorage.removeItem("catx-user-session-token");
        localStorage.removeItem("catx-user-session-username");
    }

    return isLoggedIn ? <AccountPage /> : <LogInSignIn />;
};

export default AccountHandler;
