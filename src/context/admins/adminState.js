import React, { useState } from "react";
import adminContext from "./adminContext";
import { toast } from "react-toastify";


function AdminState(props) {
    const host = "http://localhost:5000";
    //const host = "https://inotebook-lmva.onrender.com";
    const [users, setUsers] = useState([]);
    const [userNotes, setUserNotes] = useState([]);

    // Return all the users
    const getAllUsers = async (props) => {
        try {
            const response = await fetch(`${host}/api/admin/getallusers`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": sessionStorage.getItem('token')
                }
            });

            const data = await response.json();
            if (data.success) {
                setUsers(data.users);
            }
            else {
                props.toast.error(data.message);
            }
        } catch (error) {
            console.error("Error on fetching all users: " + error);
        }
    }
    // Return One users all details
    const getUserNotes = async (userId) => {
        try {
            const response = await fetch(`${host}/api/admin/getusernotes/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": sessionStorage.getItem("token")
                }
            })
            const data = await response.json();

            if (data.success) {
                setUserNotes(data.notes);
            }
            else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error("Error on getting user details: " + error);
        }
    }
    // delete One user
    const deleteUser = async (id) => {
        try {
            const response = await fetch(`${host}/api/admin/deleteuser/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": sessionStorage.getItem("token")
                }
            })
            const data = await response.json();

            if (data.success) {
                const newUsers = users.filter((user)=>user._id !== id);
                setUsers(newUsers);
                toast.success(data.message);
            }
            else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error("Error on delete user: " + error);
        }
    }
    return (
        <adminContext.Provider value={{ users, userNotes, getAllUsers, getUserNotes, deleteUser }}>
            {props.children}
        </adminContext.Provider>
    )
}
export default AdminState;