import React, { useState } from "react";
import UserContext from "./userContext";

function UserState(props)
{
    const [user, setUser] = useState('');
    const host = "http://localhost:5000";
    //const host = "https://inotebook-lmva.onrender.com";

    // get user
    const getuser = async () => {
        try {
            const response = await fetch(`${host}/api/auth/getuser`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                }
            });
            const data = await response.json();
            if (data.success) {
                setUser(data.user);
            }
            else {
                setUser("Unknown");
            }
        }
        catch (err) {
            console.error("Error on fetching user: " + err);
        }
    }
    const changepassword = async (oldpassword,newpassword,cnfpassword)=>{
        const response = await fetch(`${host}/api/auth/changepassword`,{
              method:"PUT",
              headers:{
                "Content-Type":"application/json",
                "auth-token":localStorage.getItem('token')
              },
              body: JSON.stringify({oldpassword:oldpassword,newpassword:newpassword,cnfpassword:cnfpassword})
        })

        const data = await response.json();
        if(data.success)
        {
            props.toast.success(data.message);
        }
        else{
            props.toast.error(data.message);
        }
    }
    const forgetpassword = async (email)=>{
        const response = await fetch(`${host}/api/auth/forgetpassword`,{
            method:"PUT",
            headers:{
              "Content-Type":"application/json"
            },
            body: JSON.stringify({email:email})
      })

      const data = await response.json();
      if(data.success)
      {
          props.toast.success(data.message);
      }
      else{
          props.toast.error(data.message);
      }
    }
   return(
    <UserContext.Provider value={{user, getuser, changepassword, forgetpassword}}>
        {props.children}
    </UserContext.Provider>
   )
}

export default UserState;