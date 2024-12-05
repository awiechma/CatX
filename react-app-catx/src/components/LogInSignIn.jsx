import React, { useState } from "react";
import "/src/Account.css";

const LogInSignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault(); // Verhindert das automatische Neuladen der Seite
        setError(null); // Zurücksetzen von Fehlern
        setSuccess(null); // Zurücksetzen von Erfolgsmeldungen

        try {
            const response = await fetch("http://localhost:3000/api/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || "Login failed");
                return;
            }

            const data = await response.json();
            console.log("Login successful");
            const token = data.token;
            setSuccess("Login successful!");
        } catch (err) {
            console.error("Error during login", err);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div>
            <section className="vh-100" style={{ marginTop: '3rem' }}>
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        {/* Login Fields */}
                        <div className="col-md-8 col-lg-6 col-xl-4">
                            <form onSubmit={handleLogin}>
                                <div className="divider d-flex align-items-center my-4">
                                    <p className="text-center fw-bold mx-3 mb-0">Login</p>
                                </div>
                                <div className="form-outline mb-4">
                                    <input
                                        type="username"
                                        id="form3Example3"
                                        className="form-control form-control-lg"
                                        placeholder="Enter a valid username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <label className="form-label" htmlFor="form3Example3">Username</label>
                                </div>
                                <div className="form-outline mb-3">
                                    <input
                                        type="password"
                                        id="form3Example4"
                                        className="form-control form-control-lg"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <label className="form-label" htmlFor="form3Example4">Password</label>
                                </div>
                                {/* Fehlernachricht */}
                                {error && <p style={{ color: "red" }}>{error}</p>}

                                {/* Erfolgsmeldung */}
                                {success && (
                                    <div style={{
                                        backgroundColor: "green",
                                        color: "white",
                                        padding: "10px",
                                        borderRadius: "5px",
                                        marginBottom: "10px",
                                        textAlign: "center",
                                    }}>
                                        {success}
                                    </div>
                                )}
                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="submit" className="log-in-button">
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Registration Fields */}
                        <div className="col-md-9 col-lg-6 col-xl-5 offset-xl-1" style={{ marginTop: '10rem' }}>
                            <form>
                                <div className="divider d-flex align-items-center my-4">
                                    <p className="text-center fw-bold mx-3 mb-0">Registration</p>
                                </div>
                                <div className="form-outline mb-4">
                                    <input
                                        type="text"
                                        id="form3Example1"
                                        className="form-control form-control-lg"
                                        placeholder="Enter your full name"
                                    />
                                    <label className="form-label" htmlFor="form3Example1">Name</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input
                                        type="text"
                                        id="form3Example5"
                                        className="form-control form-control-lg"
                                        placeholder="Enter your username"
                                    />
                                    <label className="form-label" htmlFor="form3Example5">Username</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input
                                        type="email"
                                        id="form3Example6"
                                        className="form-control form-control-lg"
                                        placeholder="Enter your email"
                                    />
                                    <label className="form-label" htmlFor="form3Example6">Email</label>
                                </div>
                                <div className="form-outline mb-3">
                                    <input
                                        type="password"
                                        id="form3Example7"
                                        className="form-control form-control-lg"
                                        placeholder="Enter your password"
                                    />
                                    <label className="form-label" htmlFor="form3Example7">Password</label>
                                </div>
                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="button" className="register-button">
                                        Register
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LogInSignIn;
