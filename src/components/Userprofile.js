import React, { useContext, useEffect, useRef, useState } from "react";
import userContext from "../context/user/userContext";

function Userprofile() {
    const context = useContext(userContext);
    const { user, imageupload,getuser } = context;
    const [regFormatedDate, setRegFormatedDate] = useState("DD/MM/YYYY");
    const [dobFormatedDate, setDobFormatedDate] = useState("DD/MM/YYYY");
    const [imagePath, setImagePath] = useState(null);
    const imageRef = useRef(null);

    const imageUpload = async () => {
        if (imageRef.current) {
            imageRef.current.click()
        }
    }
    const handleImageChange = async (e) => {
        const file = e.target.files[0]; // Get the selected file
        if (file) {
            await imageupload(file);
            await getuser()
        }
        
    }
    
    const formateDate = (d) => {
        const dateString = d;
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
        return formattedDate;
    }

    useEffect(()=>{
     getuser()
    },[])
    useEffect(() => {
        if (user.date) {
            const formateReg = formateDate(user.date);
            setRegFormatedDate(formateReg);
        }
        if (user.dob) {
            const formateDob = formateDate(user.dob);
            setDobFormatedDate(formateDob);
        }
        if (user.image) {
            setImagePath(`https://inotebook-lmva.onrender.com/public/images/${user.image}`);
            //setImagePath(`http://localhost:5000/public/images/${user.image}`);
        } 
        else{
            setImagePath("https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726617600&semt=ais_hybrid")
        }
    }, [user])
    return (
        <>
            <h1 className="my-3">User Details</h1>
            <div className="row">
                <div className="container col-md-4 my-2" id="img" >
                    <img src={imagePath || user.image} className="img-thumbnail" alt="user-Image" style={{ border: "3px solid blue", height:"300px", width:"300px", borderRadius:"100%"}} onClick={imageUpload} />
                    <input ref={imageRef} type="file" style={{ display: "none" }} accept="image/*" onChange={handleImageChange} />
                </div>
                <div className="container col-md-6" id="details">
                    <h4>Name:  <strong style={{ color: "royalblue" }}>{user.name}</strong></h4>
                    <br />
                    <h4>Email:  <strong style={{ color: "royalblue" }}>{user.email}</strong></h4>
                    <br />
                    <h4>Contact No:  <strong style={{ color: "royalblue" }}>{user.contactno}</strong></h4>
                    <br />
                    <h4>Date of Birth:  <strong style={{ color: "royalblue" }}>{dobFormatedDate}</strong></h4>
                    <br />
                    <h4>Gender:  <strong style={{ color: "royalblue" }}>{user.gender}</strong></h4>
                    <br />
                    <h4>City:  <strong style={{ color: "royalblue" }}>{user.city}</strong></h4>
                    <br />
                    <h4>State:  <strong style={{ color: "royalblue" }}>{user.state}</strong></h4>
                    <br />
                    <h4>Registration Date:  <strong style={{ color: "rosybrown" }}>{regFormatedDate}</strong></h4>
                </div>
            </div>
        </>
    )
}

export default Userprofile;