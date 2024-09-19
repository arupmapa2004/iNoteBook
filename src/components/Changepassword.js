import React, { useState } from "react";

function Changepassword() {
    const [password, setPassword] = useState({ newPass: "", cnfPass: "" });
    const onChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value });
    }
    const onChangeClick = (e) => {
        e.preventDefault();
        console.log("click");
        setPassword({ newPass: "", cnfPass: "" });
    }
    const onResetClick = (e) => {
        e.preventDefault();
        console.log("click");
        setPassword({ newPass: "", cnfPass: "" });
    }
    return (
        <>
            <h1>Change Password</h1>
            <div className="container my-5">
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label"><strong>Current Password</strong></label>
                    <input type="password" className="form-control custom-input" id="currentPass" name="currentPass" placeholder="Enter current password" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label"><strong>New Password</strong></label>
                    <input type="password" className="form-control custom-input" id="newpass" name="newPass" placeholder="Enter new password" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label"><strong>Confrim Password</strong></label>
                    <input type="text" className="form-control custom-input" id="cnfPass" name="cnfPass" placeholder="Enter confrim password" onChange={onChange}/>
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