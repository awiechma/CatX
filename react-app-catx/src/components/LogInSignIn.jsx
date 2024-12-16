import React, { useState } from "react";
import "/src/Account.css";

const LogInSignIn = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const [regUsername, setRegUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [regSuccess, setRegSuccess] = useState(null);
    const [regError, setRegError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

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
            localStorage.setItem("authToken", token);
        } catch (err) {
            console.error("Error during login", err);
            setError("Something went wrong. Please try again.");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setRegError(null);
        setRegSuccess(null);

        try {
            const response = await fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: regUsername,
                    full_name: fullName,
                    email,
                    password: regPassword,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setRegError(errorData.message || "Registration failed");
                return;
            }

            const data = await response.json();
            console.log("Registration successful:", data);
            setRegSuccess("Registration successful! You can now log in.");
        } catch (err) {
            console.error("Error during registration", err);
            setRegError("Something went wrong. Please try again.");
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
                                        type="text"
                                        id="loginUsername"
                                        className="form-control form-control-lg"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <label className="form-label" htmlFor="loginUsername">Username</label>
                                </div>
                                <div className="form-outline mb-3">
                                    <input
                                        type="password"
                                        id="loginPassword"
                                        className="form-control form-control-lg"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <label className="form-label" htmlFor="loginPassword">Password</label>
                                </div>
                                {error && <p style={{ color: "red" }}>{error}</p>}
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
                            <form onSubmit={handleRegister}>
                                <div className="divider d-flex align-items-center my-4">
                                    <p className="text-center fw-bold mx-3 mb-0">Registration</p>
                                </div>
                                <div className="form-outline mb-4">
                                    <input
                                        type="text"
                                        id="registerFullName"
                                        className="form-control form-control-lg"
                                        placeholder="Enter your full name"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                    <label className="form-label" htmlFor="registerFullName">Full Name</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input
                                        type="text"
                                        id="registerUsername"
                                        className="form-control form-control-lg"
                                        placeholder="Enter your username"
                                        value={regUsername}
                                        onChange={(e) => setRegUsername(e.target.value)}
                                    />
                                    <label className="form-label" htmlFor="registerUsername">Username</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input
                                        type="email"
                                        id="registerEmail"
                                        className="form-control form-control-lg"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <label className="form-label" htmlFor="registerEmail">Email</label>
                                </div>
                                <div className="form-outline mb-3">
                                    <input
                                        type="password"
                                        id="registerPassword"
                                        className="form-control form-control-lg"
                                        placeholder="Enter your password"
                                        value={regPassword}
                                        onChange={(e) => setRegPassword(e.target.value)}
                                    />
                                    <label className="form-label" htmlFor="registerPassword">Password</label>
                                </div>
                                {regError && <p style={{ color: "red" }}>{regError}</p>}
                                {regSuccess && (
                                    <div style={{
                                        backgroundColor: "green",
                                        color: "white",
                                        padding: "10px",
                                        borderRadius: "5px",
                                        marginBottom: "10px",
                                        textAlign: "center",
                                    }}>
                                        {regSuccess}
                                    </div>
                                )}
                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="submit" className="register-button">
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
