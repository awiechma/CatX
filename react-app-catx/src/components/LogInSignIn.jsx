import React from "react";
import "/src/Account.css";

const LogInSignIn = () => {
    return (
        <div>
            <div className="container">
            </div>
            <section className="vh-100"
            style={{ marginTop: '3rem' }}>
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        {/* Login Fields on the Left */}
                        <div className="col-md-8 col-lg-6 col-xl-4"
                        >
                            <form>
                                <div className="divider d-flex align-items-center my-4"
                                >
                                    <p className="text-center fw-bold mx-3 mb-0">Login</p>
                                </div>
                                <div className="form-outline mb-4" > 
                                    <input
                                        type="email"
                                        id="form3Example3"
                                        className="form-control form-control-lg"
                                        placeholder="Enter a valid email address"
                                    />
                                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                                </div>
                                <div className="form-outline mb-3">
                                    <input
                                        type="password"
                                        id="form3Example4"
                                        className="form-control form-control-lg"
                                        placeholder="Enter password"
                                    />
                                    <label className="form-label" htmlFor="form3Example4">Password</label>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="form-check mb-0">
                                        <input className="form-check-input me-2" type="checkbox" id="form2Example3" />
                                        <label className="form-check-label" htmlFor="form2Example3">
                                            Remember me
                                        </label>
                                    </div>
                                    <a href="#!" className="text-body">Forgot password?</a>
                                </div>
                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button
                                        type="button"
                                        className="log-in-button"
                                        
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                        {/* Registration Fields on the Right */}
                        <div className="col-md-9 col-lg-6 col-xl-5 offset-xl-1"
                        style={{ marginTop: '10rem' }}>
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
                                    <button
                                        type="button"
                                        className="register-button"
                                       
                                    >
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
