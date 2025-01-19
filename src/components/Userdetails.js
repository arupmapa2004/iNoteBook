import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import adminContext from "../context/admins/adminContext";
import Noteitem from "./Noteitem";

function Userdetails() {
    const location = useLocation();
    const user = location.state?.user;
    const context = useContext(adminContext);
    const { userNotes, getUserNotes } = context;
    const [regFormatedDate, setRegFormatedDate] = useState("DD/MM/YYYY");
    const [dobFormatedDate, setDobFormatedDate] = useState("DD/MM/YYYY");
    const [imagePath, setImagePath] = useState(
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726617600&semt=ais_hybrid"
    );
    const [mode, setMode] = useState("hide");

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
    
    useEffect(()=>{
        getUserNotes(user._id);
    },[userNotes]);
    
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
            <h1 className="my-3">User Details</h1>
            <div className="row">
                <div className="container col-md-4 my-2" id="img">
                    <img
                        src={imagePath || user.image}
                        className="img-thumbnail"
                        alt="user-Image"
                        style={{
                            border: "3px solid blue",
                            height: "300px",
                            width: "300px",
                            borderRadius: "100%",
                        }}
                    />
                </div>
                <div className="container col-md-6" id="details">
                    <h4>
                        Name: <strong style={{ color: "royalblue" }}>{user.name}</strong>
                    </h4>
                    <br />
                    <h4>
                        Email: <strong style={{ color: "royalblue" }}>{user.email}</strong>
                    </h4>
                    <br />
                    <h4>
                        Contact No: <strong style={{ color: "royalblue" }}>{user.contactno}</strong>
                    </h4>
                    <br />
                    <h4>
                        Date of Birth: <strong style={{ color: "royalblue" }}>{dobFormatedDate}</strong>
                    </h4>
                    <br />
                    <h4>
                        Gender: <strong style={{ color: "royalblue" }}>{user.gender}</strong>
                    </h4>
                    <br />
                    <h4>
                        City: <strong style={{ color: "royalblue" }}>{user.city}</strong>
                    </h4>
                    <br />
                    <h4>
                        State: <strong style={{ color: "royalblue" }}>{user.state}</strong>
                    </h4>
                    <br />
                    <h4>
                        Registration Date: <strong style={{ color: "rosybrown" }}>{regFormatedDate}</strong>
                    </h4>
                </div>
            </div>
            <div className="container my-3">
                {mode === "show" ? (
                    <>
                        <div className="container my-2">
                            <button className="btn btn-sm btn-info text-white" onClick={handleMode}>
                                <i className="bi bi-eye"></i> Hide Notes
                            </button>
                        </div>
                        <div className="row mx-3">
                            <h2>User Notes</h2>
                            {userNotes.length !== 0 ? (
                                userNotes.map((note) => {
                                    return (
                                        <div className="col-md-3 mb-3 note-item-container" key={note._id}>
                                            <Noteitem note={note} />
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="mx-3">No notes available!</p>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="container">
                            <button className="btn btn-sm btn-info text-white" onClick={handleMode}>
                                <i className="bi bi-eye"></i> Show Notes
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Userdetails;
