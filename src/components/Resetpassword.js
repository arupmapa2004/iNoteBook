import React, { useContext, useEffect, useState } from "react";
import userContext from "../context/user/userContext";
import { useSearchParams } from "react-router-dom";

function Resetpassword() {
    const context = useContext(userContext);
    const { resetpassword } = context;
    const [token, setToken] = useState(null);
    const [ params ]= useSearchParams();
    const authtoken = params.get('token');
  useEffect(()=>{
    setToken(authtoken);
  },[authtoken]);

          

    const [password, setPassword] = useState({ newPass: "", cnfPass: "" });
    const onChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value });
    }
    const onChangeClick = (e) => {
        e.preventDefault();
        resetpassword(password.newPass, password.cnfPass, token);
        setPassword({ newPass: "", cnfPass: "" });
    }
    const onResetClick = (e) => {
        e.preventDefault();
        setPassword({ newPass: "", cnfPass: "" });
    }
    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="card p-4 shadow-lg" style={{ width: "400px", borderRadius: "10px", backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
                    <h2 className="text-center mb-4" style={{ color: "#0d6efd" }}>Reset Password</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="newPass" className="form-label fw-bold">New Password</label>
                            <input type="password" className="form-control" id="newPass" name="newPass" placeholder="Enter new password" onChange={onChange} value={password.newPass} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cnfPass" className="form-label fw-bold">Confirm Password</label>
                            <input type="password" className="form-control" id="cnfPass" name="cnfPass" placeholder="Confirm new password" onChange={onChange} value={password.cnfPass} required />
                        </div>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary" onClick={onChangeClick}>Reset Password</button>
                            <button type="reset" className="btn btn-secondary" onClick={onResetClick}>Clear</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Resetpassword;