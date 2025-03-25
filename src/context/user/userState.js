import React, { useState } from "react";
import UserContext from "./userContext";

function UserState(props) {
    const [user, setUser] = useState(null);


    const host = "http://localhost:5000";
    //const host = "https://inotebook-lmva.onrender.com";

    // login method
    const signin = async (email, password) => {
        const response = await fetch(`${host}/api/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, password: password })
        })
        const data = await response.json();
        if (data.success) {
            sessionStorage.setItem('token', data.authToken);
            props.toast.success(data.message);
        }
        else {
            props.toast.error(data.message);
        }
    }
    // get user
    const getuser = async () => {
        try {
            const response = await fetch(`${host}/api/auth/getuser`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": sessionStorage.getItem('token')
                }
            });
            const data = await response.json();
            if (data.success) {
                setUser(data.user);
            }
            else {
                setUser("Unknown");
            }
        }
        catch (err) {
            console.error("Error on fetching user: " + err);
        }
    }
    //change password
    const changepassword = async (oldpassword, newpassword, cnfpassword) => {
        const response = await fetch(`${host}/api/auth/changepassword`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": sessionStorage.getItem('token')
            },
            body: JSON.stringify({ oldPass: oldpassword, newPass: newpassword, cnfPass: cnfpassword })
        })

        const data = await response.json();
        if (data.success) {
            props.Swal.fire({
                title: "Success!",
                text: `${data.message}`,
                icon: "success"
            });
        }
        else {
            props.Swal.fire({
                title: "Oops!",
                text: `${data.message}`,
                icon: "error"
            });
        }
    }
    //forget password
    const forgetpassword = async (email) => {
        const response = await fetch(`${host}/api/auth/forgetpassword`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email })
        })

        const data = await response.json();
        if (data.success) {
            props.Swal.fire({
                title: "Send!",
                text: `${data.message}`,
                icon: "success"
            });
        }
        else {
            props.Swal.fire({
                title: "Oops!",
                text: `${data.message}`,
                icon: "error"
            });
        }
    }
    const resetpassword = async (newPass, cnfPass, token) => {
        const response = await fetch(`${host}/api/auth/reset-password/${token}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ newPass: newPass, cnfPass: cnfPass })
        })
        const data = await response.json();
        if (data.success) {
            props.Swal.fire({
                title: "Success!",
                text: `${data.message}`,
                icon: "success"
            }).then(()=>{
                window.location.href = '/';
            });
        }
        else {
            props.Swal.fire({
                title: "Oops!",
                text: `${data.message}`,
                icon: "error"
            });
        }
    }
    // image upload
    const imageupload = async (imageurl) => {
        try {
            const formData = new FormData();
            formData.append('image', imageurl);
            const response = await fetch(`${host}/api/auth/imageupload`, {
                method: "PUT",
                headers: {
                    "auth-token": sessionStorage.getItem('token')
                },
                body: formData
            });
            const data = await response.json();
            if (data.success) {
                props.toast.success(data.message)
            }
            else {
                props.toast.error(data.message)
            }
        }
        catch (err) {
            console.error("Error on uploading image: " + err);
        }
    }
    return (
        <UserContext.Provider value={{ user, signin, getuser, changepassword, forgetpassword, resetpassword, imageupload }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;