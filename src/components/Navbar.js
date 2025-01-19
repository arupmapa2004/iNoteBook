import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../context/user/userContext";
import { useEffect } from "react";

function Navbar() {
    const context = useContext(userContext);
    const { user, getuser } = context; // Assuming `user` is directly provided by the context
    let navigate = useNavigate();
    const [userName, setUserName] = useState("Unknown");
    const [userRole, setUserRole] = useState("user");


    useEffect(() => {
        getuser();
        if (user) {
            setUserName(user.name);
            setUserRole(user.role);
        }
    }, [getuser, user]);

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        navigate('/signin');
    };
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to={userRole === "admin" ? "/admin-dashboard" : "/"}>iNoteBook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to={userRole === "admin" ? "/admin-dashboard" : "/"}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/about">About</Link>
                        </li>
                    </ul>
                    {!sessionStorage.getItem('token') ? (
                        <form className="d-flex">
                            <Link className="btn btn-primary mx-1" to="/signin" role="button">Signin</Link>
                            <Link className="btn btn-success mx-1" to="/signup" role="button">Signup</Link>
                        </form>
                    ) : (
                        <form className="d-flex">
                            <h5 className="mx-1">Welcome, {userName}</h5>
                            <div className="dropdown mx-2">
                                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Settings
                                </button>
                                <ul className="dropdown-menu">
                                    {user.role === "admin" ? (
                                        <>
                                            <li><Link className="dropdown-item" to="/userprofile">Profile</Link></li>
                                            <li><Link className="dropdown-item" to="/changepassword">Change Password</Link></li>
                                            <li><Link className="dropdown-item" to="/allusers">Users</Link></li>
                                        </>
                                    ) : (
                                        <>
                                            <li><Link className="dropdown-item" to="/userprofile">Profile</Link></li>
                                            <li><Link className="dropdown-item" to="/changepassword">Change Password</Link></li>
                                        </>
                                    )}
                                </ul>
                            </div>
                            <button type="button" className="btn btn-warning mx-1" onClick={handleLogout}>SignOut</button>
                        </form>)
                    }
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
