import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

function Changepassword() {
    const context = useContext(noteContext);
    const { changepassword } = context;
    const [password, setPassword] = useState({ oldPass: "", newPass: "", cnfPass: "" });
    const onChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value });
    }
    const onChangeClick = (e) => {
        e.preventDefault();
        changepassword(password.oldPass, password.newPass, password.cnfPass);
        setPassword({ oldPass: "", newPass: "", cnfPass: "" });
    }
    const onResetClick = (e) => {
        e.preventDefault();
        console.log("click");
        setPassword({ oldPass: "", newPass: "", cnfPass: "" });
    }
    return (
        <>
            <h1>Change Password</h1>
            <div className="container my-5">
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label"><strong>Current Password</strong></label>
                    <input type="password" className="form-control custom-input" id="currentPass" name="oldPass" placeholder="Enter current password" onChange={onChange} value={password.oldPass}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label"><strong>New Password</strong></label>
                    <input type="password" className="form-control custom-input" id="newpass" name="newPass" placeholder="Enter new password" onChange={onChange} value={password.newPass}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label"><strong>Confrim Password</strong></label>
                    <input type="text" className="form-control custom-input" id="cnfPass" name="cnfPass" placeholder="Enter confrim password" onChange={onChange} value={password.cnfPass}/>
                </div>
                <div className="d-flex mb-3">
                    <button type="submit" className="btn btn-danger mx-2" onClick={onChangeClick}>Change</button>
                    <button type="submit" className="btn btn-warning mx-2" onClick={onResetClick}>Reset</button>
                </div>
            </div>
        </>
    )
}

export default Changepassword;