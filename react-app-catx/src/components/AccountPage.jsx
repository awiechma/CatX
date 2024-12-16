import React, { useState, useEffect } from "react";
import "/src/Account.css";

const AccountPage = () => {
    const [userData, setUserData] = useState({ username: null, email: null });

    async function getUserData() {
        const token = localStorage.getItem("catx-user-session-token");
        const username = localStorage.getItem("catx-user-session-username");
        try {
            const response = await fetch("http://localhost:3000/api/user/" + username, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUserData({
                    username: username || "Username not available",
                    email: data.email || "Email not available"
                });
            } else {
                console.error("Fehler beim Abrufen der Daten.");
            }
        } catch (err) {
            console.error("Fehler:", err);
        }
    }

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <ul className="list-disc pl-4">
            <li><strong>Username:</strong> {userData.username}</li>
            <li><strong>Email:</strong> {userData.email}</li>
        </ul>
    );
};

export default AccountPage;
