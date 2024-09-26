import React, { useContext, useEffect, useState } from "react";
import userContext from "../context/user/userContext";

function Userprofile() {
    const context = useContext(userContext);
    const { user } = context;
    const [regFormatedDate, setRegFormatedDate] = useState("DD/MM/YYYY");
    const [dobFormatedDate, setDobFormatedDate] = useState("DD/MM/YYYY");
    
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
        if(user.date)
        {
           const formateReg = formateDate(user.date);
           setRegFormatedDate(formateReg);
        }
        if (user.dob) {
            const formateDob = formateDate(user.dob);
           setDobFormatedDate(formateDob);
        }
    },[user.date,user.dob])
    return (
        <>
            <h1 className="my-5">User Details</h1>
            <div className="row mb-5">
                <div className="container col-md-4" id="img">
                    <img src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726617600&semt=ais_hybrid" className="img-thumbnail" alt="user-Image"/>
                </div>
                <div className="container col-md-4" id="details">
                    <h4>Name:  <strong style={{color:"royalblue"}}>{user.name}</strong></h4>
                    <h4>Email:  <strong style={{color:"royalblue"}}>{user.email}</strong></h4>
                    <h4>Contact No:  <strong style={{color:"royalblue"}}>{user.contactno}</strong></h4>
                    <h4>Date of Birth:  <strong style={{color:"royalblue"}}>{dobFormatedDate}</strong></h4>
                    <h4>Gender:  <strong style={{color:"royalblue"}}>{user.gender}</strong></h4>
                    <h4>City:  <strong style={{color:"royalblue"}}>{user.city}</strong></h4>
                    <h4>State:  <strong style={{color:"royalblue"}}>{user.state}</strong></h4>
                    <h4>Registration Date:  <strong style={{color:"rosybrown"}}>{regFormatedDate}</strong></h4>
                </div>
            </div>
        </>
    )
}

export default Userprofile;