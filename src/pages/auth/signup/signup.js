import React, { useState } from "react";
import './signup.css'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import apiURL from "../../../apiURL";
import { useNavigate } from "react-router-dom";
const Signup = () =>{

    const [password, setPassword] = useState(null)
    const navigate = useNavigate()

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)    
    }
    
    const handleFormSubmit = (e) =>{
        e.preventDefault()
        if(password){
            if(/[^a-zA-Z0-9]/.test(password) && /[0-9]/.test(password) && /[A-Z]/.test(password) && password.length >= 8){
                axios.post(apiURL + '/api/creators/register',{
                    username : e.target.username.value.trim(),
                    password : e.target.password.value,
                    email : e.target.email.value.trim()
                })
                    .then((response)=>{
                        toast.success("Signup successfull")
                        navigate('/login')
                    })
                    .catch((err)=>{
                        toast.warn("Signup failed. With Error " + err.response.data.message)
                    })
            }
        }
    }




    return(
        <div className="container-fluid h-100">
            <ToastContainer />
            <div className="row h-100">
                <div className="col d-flex justify-content-center align-items-center p-3 h-100">
                    <div className="card" style={{width : "25rem"}}>
                        <img src="/signupheader.avif" alt="signup header image" className="img-card-top"/>
                        <div className="card-body">
                            <h4 className="card-title">Signup to Content Maker</h4>
                            <form onSubmit={(e)=>handleFormSubmit(e)} method="POST">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">@</span>
                                    <input type="text" className="form-control" placeholder="Username" name="username"/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">📭</span>
                                    <input type="email" className="form-control" placeholder="Email" name="email"/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">#</span>
                                    <input type="password" className="form-control" placeholder="Password" name="password" onChange={(e)=>handlePasswordChange(e)}/>
                                </div>
                                <div className="form-text mb-3">
                                    Password should've
                                        <ul>
                                            <li>1 special character {/[^a-zA-Z0-9]/.test(password) ? <CheckCircleIcon />:null} </li>
                                            <li>1 digit {/[0-9]/.test(password) ? <CheckCircleIcon />:null}</li>
                                            <li>1 capital letter {/[A-Z]/.test(password) ? <CheckCircleIcon />:null}</li>
                                            <li>at least 8 characters {password && password.length >= 8 ? <CheckCircleIcon />:null}</li>
                                        </ul>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Signup As Creator</button>
                                <a href="/login" className="btn btn-primary mt-3 w-100">Already have an account ? Login</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup