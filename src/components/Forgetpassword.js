import React, { useState, useEffect, useContext } from "react";
import userContext from "../context/user/userContext";
import { useLocation } from "react-router-dom";

function Forgetpassword(props) {
    const [email, setEmail] = useState({ email: "" });
    const [response, setResponse] = useState('');
    const context = useContext(userContext);
    const location = useLocation();
    const { forgetpassword } = context;

    useEffect(() => {
        setResponse("");
        if (location.state && location.state.userEmail) {
            setEmail({ email: location.state.userEmail });
        }
    }, [location.state]);

    const handleForgetPassword = async(e) => {
        e.preventDefault();
        await forgetpassword(email.email);
    }
    const onChange = (e) => {
        setEmail({ ...email, [e.target.name]: e.target.value });
    }
    return (
        <>
             <div className="forget-password-container mt-5">
                <h1>Reset Your Password</h1>
                <p>
                    <strong>To reset your password, enter your email below and submit.</strong><br />
                    <strong>An email will be sent to you with instructions about how to complete the process.</strong>
                </p>
            </div>
            <div className="forget-password-container my-5">
                <form onSubmit={handleForgetPassword} className="forget-password-form d-flex flex-column align-items-center">
                    <div className="mb-3 w-75">
                        <label htmlFor="email" className="form-label"><strong>Email address</strong></label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            value={email.email}
                            onChange={onChange}
                            placeholder="Enter your email"
                        />
                        <div id="emailMessage" className="form-text text-danger mt-2">{response}</div>
                    </div>
                    <button type="submit" className="btn btn-primary w-75 mt-3">
                        Reset Password
                    </button>
                </form>
            </div>
        </>
    )
}

export default Forgetpassword;