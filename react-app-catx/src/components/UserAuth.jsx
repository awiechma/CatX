import { useState, useEffect } from "react";

const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = localStorage.getItem("catx-user-session-token");
            const username = localStorage.getItem("catx-user-session-username");
            if (token && username) {
                try {
                    const response = await fetch("http://localhost:3000/api/validatetoken", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + token,
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
    }, []);

    return isLoggedIn;
};

export default useAuth;