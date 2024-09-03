import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/signin');
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNoteBook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') ?
                        <form className="d-flex">
                            <Link className="btn btn-primary mx-1" to="/signin" role="button">Signin</Link>
                            <Link className="btn btn-success mx-1" to="/signup" role="button">Signup</Link>
                        </form> :
                        <form className="d-flex">
                            <button type="button" className="btn btn-warning" onClick={handleLogout}>SignOut</button>
                        </form>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar;