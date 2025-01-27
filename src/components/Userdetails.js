import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import adminContext from "../context/admins/adminContext";
import Noteitem from "./Noteitem";

function Userdetails() {
    const location = useLocation();
    const user = location.state?.user;
    const context = useContext(adminContext);
    const { userNotes, getUserNotes, makeAdminOrNot } = context;
    const [regFormatedDate, setRegFormatedDate] = useState("DD/MM/YYYY");
    const [dobFormatedDate, setDobFormatedDate] = useState("DD/MM/YYYY");
    const [imagePath, setImagePath] = useState(
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726617600&semt=ais_hybrid"
    );
    const [mode, setMode] = useState("hide");
    const [userRole, setUserRole] = useState(user.role);

    const formateDate = (d) => {
        const dateString = d;
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const handleMode = () => {
        setMode((prevMode) => (prevMode === "show" ? "hide" : "show"));
    };

    useEffect(() => {
        getUserNotes(user._id);
    }, [getUserNotes, user]);

    useEffect(() => {
        if (user?.date) {
            const formateReg = formateDate(user.date);
            setRegFormatedDate(formateReg);
        }
        if (user?.dob) {
            const formateDob = formateDate(user.dob);
            setDobFormatedDate(formateDob);
        }
        if (user?.image && user.image !== "https://img.freepik.com/…") {
            setImagePath(`https://inotebook-lmva.onrender.com/public/images/${user.image}`);
        }
    }, [user]);

    if (!user) {
        return <p>No user data available. Please navigate to this page from the All Users list.</p>;
    }

    return (
        <>
            <div className="container my-5">
                <div className="row">
                    {/* User Card */}
                    <div className="col-lg-4 col-md-6 text-center">
                        <div className="card shadow-lg border-0">
                            <img
                                src={imagePath || user.image}
                                className="card-img-top mx-auto my-4 rounded-circle"
                                alt="user-Image"
                                style={{
                                    height: "200px",
                                    width: "200px",
                                    objectFit: "cover",
                                }}
                            />
                            <div className="card-body">
                                <h3 className="card-title">{user.name}</h3>
                                <p className="text-muted">{user.email}</p>
                                <h5 className="text-info">Contact: {user.contactno}</h5>
                                <button
                                    className="btn btn-primary mt-3 mx-2"
                                    onClick={handleMode}
                                >
                                    {mode === "show" ? "Hide Notes" : "Show Notes"}
                                </button>
                                <button
                                    className="btn btn-danger mt-3 mx-2"
                                    onClick={async () => {
                                        const updatedRole = await makeAdminOrNot(user._id);
                                        setUserRole(updatedRole);
                                    }}
                                >
                                    {userRole === "user" ? "Make Admin" : "Dismiss Admin"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* User Details */}
                    <div className="col-lg-8 col-md-6">
                        <div
                            className="card shadow-lg border-0 p-5"
                            style={{ borderRadius: "12px", backgroundColor: "#f9f9f9" }}
                        >
                            <h4
                                className="text-uppercase mb-4"
                                style={{ fontWeight: "bold", fontSize: "1.5rem" }}
                            >
                                User Details
                            </h4>
                            <ul
                                className="list-unstyled"
                                style={{ fontSize: "1.2rem", lineHeight: "2" }}
                            >
                                <li>
                                    <strong>Date of Birth:</strong>{" "}
                                    <span
                                        className="text-primary"
                                        style={{ fontWeight: "500" }}
                                    >
                                        {dobFormatedDate}
                                    </span>
                                </li>
                                <li>
                                    <strong>Gender:</strong>{" "}
                                    <span
                                        className="text-primary"
                                        style={{ fontWeight: "500" }}
                                    >
                                        {user.gender}
                                    </span>
                                </li>
                                <li>
                                    <strong>City:</strong>{" "}
                                    <span
                                        className="text-primary"
                                        style={{ fontWeight: "500" }}
                                    >
                                        {user.city}
                                    </span>
                                </li>
                                <li>
                                    <strong>State:</strong>{" "}
                                    <span
                                        className="text-primary"
                                        style={{ fontWeight: "500" }}
                                    >
                                        {user.state}
                                    </span>
                                </li>
                                <li>
                                    <strong>Registration Date:</strong>{" "}
                                    <span
                                        className="text-success"
                                        style={{ fontWeight: "500" }}
                                    >
                                        {regFormatedDate}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Notes Section */}
                {mode === "show" && (
                    <div className="mt-5">
                        <h3>User Notes</h3>
                        <div className="row mx-3">
                            {userNotes.length !== 0 ? (
                                userNotes.map((note) => (
                                    <div
                                        className="col-md-3 mb-3 note-item-container"
                                        key={note._id}
                                    >
                                        <Noteitem note={note} userId={user._id} />
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted">No notes available!</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Userdetails;
