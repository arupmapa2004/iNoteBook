import React, { useState } from "react";
import "./Contactus.css"; // Separate CSS file for heavy styles
import Loader from "./Loader";

function Contactus(props) {
    //const host = "http://localhost:5000";
    const host = "https://inotebook-lmva.onrender.com"; 
    const [credentials, setCredentials] = useState({
        name: "", email: "", contactno: "", description: ""
    });
    const [loading, setLoading] = useState(false);
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${host}/api/admin/contact-us`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });
            const data = await response.json();
            setLoading(false);
            setCredentials({ name: "", email: "", contactno: "", description: "" });
            if (data.success) {
                props.Swal.fire({
                    title: `${data.message}`,
                    icon: "success",
                    draggable: true
                });
            } else {
                props.Swal.fire({
                    title: `${data.message}`,
                    icon: "error",
                    draggable: true
                });
            }
        } catch (error) {
            console.error("Error to Contact us: " + error);
        }
    };

    return (
        <>
        {loading ? <Loader/> : null}
        <div className="contactus-container">
            <div className="form-wrapper">
                <h2 className="form-title">How can we assist you?</h2>
                <p className="form-subtitle">Describe your issue and we'll get back to you as soon as possible.</p>
                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Your Name</label>
                        <input
                            type="text"
                            className="form-input"
                            id="name"
                            name="name"
                            onChange={onChange}
                            value={credentials.name}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input
                            type="email"
                            className="form-input"
                            id="email"
                            name="email"
                            onChange={onChange}
                            value={credentials.email}
                            placeholder="Enter your email address"
                            required
                        />
                        <div className="form-help-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="contactno" className="form-label">Contact Number</label>
                        <input
                            type="text"
                            className="form-input"
                            id="contactno"
                            name="contactno"
                            pattern="\d{10}"
                            onChange={onChange}
                            value={credentials.contactno}
                            placeholder="Enter your 10-digit contact number"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            className="form-textarea"
                            id="description"
                            name="description"
                            onChange={onChange}
                            value={credentials.description}
                            placeholder="Provide a detailed description of the issue"
                            required
                            rows="5"
                        ></textarea>
                    </div>
                    <button type="submit" className="form-button">Submit</button>
                </form>
            </div>
        </div>
        </>
    );
}

export default Contactus;
