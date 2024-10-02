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

        // Send signup data to backend
        const response = await fetch(`${host}/api/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                contactno: credentials.contactno,
                dob: credentials.dob,
                gender: credentials.gender,
                city: credentials.city,
                state: credentials.state
            })
        });
        const data = await response.json();

        if (data.success) {
            // Show success toast and navigate to signin page
            props.toast.success(data.message);
            navigate("/signin");
        } else {
            // Show error toast
            props.toast.error(data.message);
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="container d-flex justify-content-center">
            <div className="mx-auto">
                <h1 className="my-2">Please Signup | Become a member of iNoteBook</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name" onChange={onChange} value={credentials.name} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" onChange={onChange} value={credentials.email} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={credentials.password} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contactno" className="form-label">Contact No</label>
                        <input type="text" className="form-control" id="contactno" name="contactno" pattern="\d{10}" onChange={onChange} value={credentials.contactno} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dob" className="form-label">Date of Birth</label>
                        <input type="date" className="form-control" id="dob" name="dob" onChange={onChange} value={credentials.dob} required />
                    </div>
                    <div className="mb-3">
                        <fieldset className="row">
                            <legend className="col-form-label col-sm-2 pt-0">Gender</legend>
                            <div className="col-sm-10">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="gender" id="male" value="Male" onChange={onChange} required />
                                    <label className="form-check-label" htmlFor="male">Male</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="gender" id="female" value="Female" onChange={onChange} required />
                                    <label className="form-check-label" htmlFor="female">Female</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="gender" id="other" value="Other" onChange={onChange} required />
                                    <label className="form-check-label" htmlFor="other">Other</label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="city" className="form-label">City</label>
                        <input type="text" className="form-control" id="city" name="city" onChange={onChange} value={credentials.city} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="state" className="form-label">State</label>
                        <input type="text" className="form-control" id="state" name="state" onChange={onChange} value={credentials.state} required />
                    </div>
                    <div className="container mb-3">
                        <button type="submit" className="btn btn-primary d-flex mx-auto">Signup</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
