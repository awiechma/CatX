import React, { useState, useEffect } from "react";

const AccountPage = () => {
  const [userData, setUserData] = useState({ username: null, email: null }); // State to hold user data

  async function getUserData() {
    const token = localStorage.getItem("catx-user-session-token"); // Get session token
    const username = localStorage.getItem("catx-user-session-username"); // Get session username

    try {
      const response = await fetch(
        "http://localhost:3000/api/user/" + username,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      ); // Fetch user data with token

      if (response.ok) {
        const data = await response.json();
        setUserData({
          username: username || "Username not available",
          email: data.email || "Email not available",
        }); // Update state with user data
      } else {
        console.error("Fehler beim Abrufen der Daten."); // Log fetch error
      }
    } catch (err) {
      console.error("Fehler:", err); // Log request failure
    }
  }

  useEffect(() => {
    getUserData(); // Fetch user data on component mount
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("catx-user-session-token"); // Clear session token
    localStorage.removeItem("catx-user-session-username"); // Clear session username
    console.log("Logged out successfully!"); // Log logout
    window.location.href = "/"; // Redirect to home
  };

  return (
    <div className="w-100 h-100 d-flex align-items-center justify-content-center">
      <div className="w-25 text-center custom-container">
        <ul className="user-data">
          <li>
            <strong>Username:</strong> {userData.username}
          </li>{" "}
          {/* Display username */}
          <li>
            <strong>Email:</strong> {userData.email}
          </li>{" "}
          {/* Display email */}
        </ul>
        <button onClick={handleLogout} className="logout-button">
          Logout {/* Logout button */}
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
