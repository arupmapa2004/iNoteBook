import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import userContext from '../context/user/userContext';

function Signin(props) {

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();
    const context = useContext(userContext);
    const { signin } = context;
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await signin(credentials.email, credentials.password);
        const token = sessionStorage.getItem('token');
        if(token)
        {
            setTimeout(() => {  
                navigate("/");
            }, 1000);
        }
        else{
            navigate("/signin");
        }
    }
    const handleForgetPassword = (e)=>{
         e.preventDefault();
         navigate('/forgetpassword',{ state: { userEmail: credentials.email } });
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <div className="container d-flex jusify-content-center">
            <div className='mx-auto'>
                <h1 className='my-2 text-center'>Please Signin | Access Your iNoteBook</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} style={{ width: "700px" }} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name='password' onChange={onChange} style={{ width: "700px" }} />
                    </div>
                    <div className='container'>
                        <button type="submit" className="btn btn-primary">Login</button>
                        <button type="button" className="btn btn-link" style={{ color: "red" }} onClick={handleForgetPassword} userEmail={credentials.email}>forget password?</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signin;