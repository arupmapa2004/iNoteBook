import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup(props) {
    const [credentials, setCredentials] = useState({
        name: "", email: "", password: "", contactno: "", dob: "", gender: "", city: "", state: ""
    });

    let navigate = useNavigate();
    //const host = "http://localhost:5000";
    const host = "https://inotebook-lmva.onrender.com";

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${host}/api/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        });
        const data = await response.json();

        if (data.success) {
            props.toast.success(data.message);
            navigate("/signin");
        } else {
            props.toast.error(data.message);
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", paddingTop: "70px", background: "linear-gradient(to right, #e3f2fd, #bbdefb)" }}>
            <div className="card p-4 shadow-lg" style={{ width: "550px", borderRadius: "12px", backgroundColor: "rgba(255, 255, 255, 0.95)" }}>
                <h2 className="text-center mb-3" style={{ color: "#0d6efd" }}>Join iNoteBook</h2>
                <h5 className="text-center text-muted mb-4">Create your account</h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-bold">Name</label>
                        <input type="text" className="form-control" id="name" name="name" onChange={onChange} value={credentials.name} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-bold">Email Address</label>
                        <input type="email" className="form-control" id="email" name="email" onChange={onChange} value={credentials.email} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label fw-bold">Password</label>
                        <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={credentials.password} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contactno" className="form-label fw-bold">Contact No</label>
                        <input type="text" className="form-control" id="contactno" name="contactno" pattern="\d{10}" onChange={onChange} value={credentials.contactno} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dob" className="form-label fw-bold">Date of Birth</label>
                        <input type="date" className="form-control" id="dob" name="dob" onChange={onChange} value={credentials.dob} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Gender</label>
                        <div className="d-flex">
                            <div className="form-check me-3">
                                <input className="form-check-input" type="radio" name="gender" id="male" value="Male" onChange={onChange} required />
                                <label className="form-check-label" htmlFor="male">Male</label>
                            </div>
                            <div className="form-check me-3">
                                <input className="form-check-input" type="radio" name="gender" id="female" value="Female" onChange={onChange} required />
                                <label className="form-check-label" htmlFor="female">Female</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gender" id="other" value="Other" onChange={onChange} required />
                                <label className="form-check-label" htmlFor="other">Other</label>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="city" className="form-label fw-bold">City</label>
                        <input type="text" className="form-control" id="city" name="city" onChange={onChange} value={credentials.city} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="state" className="form-label fw-bold">State</label>
                        <input type="text" className="form-control" id="state" name="state" onChange={onChange} value={credentials.state} required />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary mt-3">Signup</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
