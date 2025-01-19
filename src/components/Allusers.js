import React, { useContext, useEffect } from "react";
import adminContext from "../context/admins/adminContext";
import { useNavigate } from "react-router-dom";

function Allusers(props) {
    const context = useContext(adminContext);
    const navigate = useNavigate();
    const { users, getAllUsers, getUserDetails, deleteUser } = context;
   
    useEffect(() => {
        getAllUsers(props); // Fetch all users when the component mounts
    }, [props]);
    const handleOnClick = (user)=>{
        navigate('/allusers/userdetails', {state: {user}});
    }
    return (
        <div className="container mt-5">
            <h2 className="text-center text-dark mb-5 font-weight-bold display-4">All Users</h2>
            <div className="row">
                {users && users.length !== 0 ? (
                    users.map((user) => (
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-5" key={user._id}>
                            <div className="card shadow-lg border-0 rounded-lg custom-card">
                                <div className="card-body">
                                    <div className="text-center">
                                        <h5 className="card-title text-primary display-5">{user.name}</h5>
                                        <p className="card-subtitle text-muted">{user.email}</p>
                                        <p className="card-text mt-2">
                                            <span className="badge bg-success">{user.role}</span>
                                        </p>
                                    </div>
                                    <div className="mt-4 d-flex justify-content-between">
                                        <button className="btn btn-sm btn-info text-white" onClick={ ()=> { handleOnClick(user)}}>
                                            View Profile
                                        </button>
                                        <button className="btn btn-sm btn-danger text-white" onClick={() => deleteUser(user._id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <p className="text-muted fs-4">No users found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Allusers;
