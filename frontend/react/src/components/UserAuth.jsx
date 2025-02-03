import { useState, useEffect } from "react";

const useAuth = () => {
    // State to track the user's authentication status
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        // Function to check if the user is logged in by validating the token
        const checkLoginStatus = async () => {
            const token = localStorage.getItem("catx-user-session-token");
            const username = localStorage.getItem("catx-user-session-username");
            // Check if both token and username exist in localStorage
            if (token && username) {
                try {
                    // Send a request to the server to validate the stored token
                    const response = await fetch("http://localhost:3000/api/validatetoken", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + token, // Include token in Authorization header
                        },
                    });

                    // If the response is OK, set user as logged in
                    if (response.ok) {
                        setIsLoggedIn(true);
                    } else {
                        setIsLoggedIn(false); // Token is invalid or expired
                    }
                } catch (err) {
                    console.error(err);
                    setIsLoggedIn(false); // Error occurred while verifying token
                }
            } else {
                setIsLoggedIn(false); // No token or username found in localStorage
            }
        };

        checkLoginStatus();
    }, []); // Run this effect only once on component mount

    // Return the authentication status to be used by the consuming component
    return isLoggedIn;
};

export default useAuth;