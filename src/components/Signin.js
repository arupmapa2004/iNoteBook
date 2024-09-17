import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Signin(props) {
   
    const [credentials,setCredentials] = useState({email:"", password:""});
    let navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("https://inotebook-lmva.onrender.com/api/auth/signin",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        })
        const data = await response.json();
        if(data.success)
        {
             localStorage.setItem('token' , data.authToken);
             props.toast.success(data.message);
             navigate("/");
        }
        else{
            props.toast.error(data.message);
        }
    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name] : e.target.value });
    }
    return (
        <div className="container">
            <h1 className='my-2'>Please Signin | Access Your iNoteBook</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signin;