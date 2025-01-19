import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userContext from '../context/user/userContext';

function Signin(props) {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();
    const context = useContext(userContext);
    const { signin } = context;

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signin(credentials.email, credentials.password);
        const token = sessionStorage.getItem('token');

        if (token) {
            // Decode the token to extract payload
            const base64Payload = token.split('.')[1];
            const decodedPayload = JSON.parse(atob(base64Payload)); // Decode and parse    
            // Access the role from the nested user object
            const userRole = decodedPayload.user?.role; // Use optional chaining for safety

            setTimeout(() => {
                if(userRole === "admin")
                navigate("/admin-dashboard");
               else{
                navigate("/");
               }
            }, 1000);
        } else {
            navigate("/signin");
        }
    }

    const handleForgetPassword = (e) => {
        e.preventDefault();
        navigate('/forgetpassword', { state: { userEmail: credentials.email } });
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-gradient-primary" style={{ background: "linear-gradient(to right, #e0f7fa, #b2ebf2)" }}>
            <div className="card p-4 shadow-lg" style={{ width: "400px", borderRadius: "12px", backgroundColor: "rgba(255, 255, 255, 0.95)" }}>
                <h2 className="text-center mb-4" style={{ color: "#0d6efd" }}>Welcome Back</h2>
                <h5 className="text-center text-muted mb-4">Access Your iNoteBook</h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-bold">Email Address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            aria-describedby="emailHelp"
                            onChange={onChange}
                            required
                        />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label fw-bold">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            onChange={onChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
                    <button type="button" className="btn btn-link d-block text-center text-danger fw-bold" onClick={handleForgetPassword}>
                        Forgot password?
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signin;
