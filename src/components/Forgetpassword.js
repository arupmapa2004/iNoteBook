import React, { useState, useEffect, useContext } from "react";
import userContext from "../context/user/userContext";
import { useLocation } from "react-router-dom";

function Forgetpassword(props) {
    const [email, setEmail] = useState({ email: ""});
    const context = useContext(userContext);
    const location = useLocation();
    const { forgetpassword } = context;
    
    useEffect(() => {
        if (location.state && location.state.userEmail) {
            setEmail({ email: location.state.userEmail });
        }
    }, [location.state]);

    const handleForgetPassword = (e)=>{
        e.preventDefault();
        forgetpassword(email.email);
   }
    const onChange = (e) => {
        setEmail({ ...email, [e.target.name]: e.target.value });
    }
    return (
        <>
           <div className="container">
            <h1>Reset Your Password</h1>
            <strong>To reset your password, enter your email below and submit.</strong>
            <br/>
            <strong> An email will be sent to you with instructions about how to complete the process.</strong>
            </div>
            <div className="container my-4">
                <form onSubmit={handleForgetPassword}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label"><strong>Email address</strong></label>
                        <input type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" style={{ width: "600px" }} value={email.email} onChange={onChange}/>
                        <div id="emailMessage" className="form-text"></div>
                    </div>
                    <button type="submit" className="btn btn-primary">Reset Password</button>
                </form>
            </div>
        </>
    )
}

export default Forgetpassword;