import React, { useState } from "react";
import adminContext from "./adminContext";
import { toast } from "react-toastify";


function AdminState(props) {
    //const host = "http://localhost:5000";
    const host = "https://inotebook-lmva.onrender.com";
    const [users, setUsers] = useState([]);
    const [userNotes, setUserNotes] = useState([]);

    // Return all the users
    const getAllUsers = async (props) => {
        try {
            const response = await fetch(`${host}/api/admin/get-all-users`, {
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
            const response = await fetch(`${host}/api/admin/get-user-notes/${userId}`, {
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
    // Make Admin Or Not
     const makeAdminOrNot = async (userId) =>{
        try {
            const response = await fetch(`${host}/api/admin/make-admin-or-not/${userId}`,{
                method: "PUT",
                headers:{
                    "Content-Type" : "application/json",
                    "auth-token": sessionStorage.getItem('token')
                }
            })
    
            const data = await response.json();
            if(data.success)
            {
               toast.success(data.message);
               return data.role;
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Error on Make user admin: " + error);
        }
     }
    // delete One user
    const deleteUser = async (id) => {
        const swalWithBootstrapButtons = props.Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success mx-2",
              cancelButton: "btn btn-danger mx-2"
            },
            buttonsStyling: false
          });
          swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
          }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`${host}/api/admin/delete-user/${id}`, {
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
                        swalWithBootstrapButtons.fire({
                            title: "Deleted!",
                            text: `${data.message}`,
                            icon: "success"
                          });
                    }
                    else{
                        swalWithBootstrapButtons.fire({
                            title: "Oops!",
                            text: `${data.message}`,
                            icon: "error"
                          });
                    }
                } catch (error) {
                    console.error("Error on delete user: " + error);
                }
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === props.Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your user is safe :)",
                icon: "error"
              });
            }
          });
    }
    return (
        <adminContext.Provider value={{ users, userNotes, getAllUsers, getUserNotes, makeAdminOrNot, deleteUser }}>
            {props.children}
        </adminContext.Provider>
    )
}
export default AdminState;