import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Signup(props) {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", contactno: "", dob: "", gender: "", city: "", state: "" });
    let navigate = useNavigate();
    const host = "http://localhost:5000";
    //const host = "https://inotebook-lmva.onrender.com";
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, contactno: credentials.contactno, dob: credentials.dob, gender: credentials.genger, city: credentials.city, state: credentials.state })
        })
        const data = await response.json();
        if (data.success) {
            props.toast.success(data.message);
            navigate("/signin");
        }
        else {
            props.toast.error(data.message);
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <div className="container d-flex justify-content-center">
            <div className='mx-auto'>
                <h1 className='my-2'>Please Signup | Become a member of iNoteBook</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name='password' onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contactno" className="form-label">Contact No</label>
                        <input type="text+" className="form-control" placeholder="Enter contact no." id="contactno" name='contactno' onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dob" className="form-label">Date of Birth</label>
                        <input type="date" className="form-control" id="dob" name='dob' onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <fieldset className="row">
                            <legend className="col-form-label col-sm-2 pt-0">Genger</legend>
                            <div className="col-sm-10">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="gender" id="male" value="male" onChange={onChange}/>
                                        <label className="form-check-label" htmlFor="male">
                                            Male
                                        </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="gender" id="female" value="female" onChange={onChange}/>
                                        <label className="form-check-label" htmlFor="female">
                                            Female
                                        </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="gender" id="other" value="other" onChange={onChange}/>
                                        <label className="form-check-label" htmlFor="other">
                                            Other
                                        </label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="city" className="form-label">City</label>
                        <input type="text" className="form-control" placeholder="Enter city name" id="city" name="city" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="state" className="form-label">State</label>
                        <input type="text" className="form-control" placeholder="Enter state name" id="state" name="state" onChange={onChange} />
                    </div>
                    <div className='container mb-3'>
                        <button type="submit" className="btn btn-primary d-flex mx-auto">Signup</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;