import React, { useContext, useEffect, useRef, useState } from "react";
import userContext from "../context/user/userContext";

function Userprofile() {
    const { user, imageupload, getuser } = useContext(userContext);
    const [regFormatedDate, setRegFormatedDate] = useState("DD/MM/YYYY");
    const [dobFormatedDate, setDobFormatedDate] = useState("DD/MM/YYYY");
    const [imagePath, setImagePath] = useState(null);
    const [loading, setLoading] = useState(false);
    const imageRef = useRef(null);

    const imageUploadClick = () => {
        if (imageRef.current) imageRef.current.click();
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setLoading(true);
            await imageupload(file);
            setLoading(false);
        }
        e.target.value = ""; // reset input so same file can be reselected
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    useEffect(() => {
        getuser();
    }, []);

    useEffect(() => {
        if (!user) return;

        if (user.date) setRegFormatedDate(formatDate(user.date));
        if (user.dob) setDobFormatedDate(formatDate(user.dob));

        setImagePath(
            user.image ||
            "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
        );
    }, [user]);

    return (
        <div>
            <h1 className="my-3">User Details</h1>
            <div className="row">
                <div className="container col-md-4 my-2" id="img">
                    {!loading ? <img
                        src={imagePath}
                        className="img-thumbnail"
                        alt="user"
                        style={{
                            border: "3px solid blue",
                            height: "300px",
                            width: "300px",
                            borderRadius: "100%"
                        }}
                        onClick={imageUploadClick}
                    /> : <h4>Uploading...</h4>}
                    <input
                        ref={imageRef}
                        type="file"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                <div className="container col-md-6" id="details">
                    <h4>Name: <strong style={{ color: "royalblue" }}>{user?.name || "—"}</strong></h4>
                    <br/>
                    <h4>Email: <strong style={{ color: "royalblue" }}>{user?.email || "—"}</strong></h4>
                    <br/>
                    <h4>Contact No: <strong style={{ color: "royalblue" }}>{user?.contactno || "—"}</strong></h4>
                    <br/>
                    <h4>Date of Birth: <strong style={{ color: "royalblue" }}>{dobFormatedDate}</strong></h4>
                    <br/>
                    <h4>Gender: <strong style={{ color: "royalblue" }}>{user?.gender || "—"}</strong></h4>
                    <br/>
                    <h4>City: <strong style={{ color: "royalblue" }}>{user?.city || "—"}</strong></h4>
                    <br/>
                    <h4>State: <strong style={{ color: "royalblue" }}>{user?.state || "—"}</strong></h4>
                    <br/>
                    <h4>Registration Date: <strong style={{ color: "rosybrown" }}>{regFormatedDate}</strong></h4>
                    <br/>
                </div>
            </div>
        </div>
    );
}

export default Userprofile;
