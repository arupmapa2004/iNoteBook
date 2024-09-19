import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/noteContext";

function Userprofile() {
    const context = useContext(noteContext);
    const { user } = context;
    const [formatedDate, setFormatedDate] = useState("DD/MM/YYYY");
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
           const formate = formateDate(user.date);
           setFormatedDate(formate);
        }
    },[user.date])
    return (
        <>
            <h1 className="my-5">User Details</h1>
            <div className="container mb-5 d-flex">
                <div className="container " id="img">
                    <img src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726617600&semt=ais_hybrid" className="img-thumbnail" alt="user image" />
                </div>
                <div className="container " id="details">
                    <h4>Name:  <strong style={{color:"royalblue"}}>{user.name}</strong></h4>
                    <h4>Email:  <strong style={{color:"royalblue"}}>{user.email}</strong></h4>
                    <h4>Registration Date:  <strong style={{color:"rosybrown"}}>{formatedDate}</strong></h4>
                </div>
            </div>
        </>
    )
}

export default Userprofile;