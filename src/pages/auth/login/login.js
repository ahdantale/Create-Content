import React, { useEffect } from "react";
import './login.css'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import apiURL from "../../../apiURL";
import { useNavigate } from "react-router-dom";

const Login = () =>{
    const navigate = useNavigate()
    useEffect(()=>{
        //Change to jwt
        // if(window.localStorage.getItem('creator_id')){
        //     navigate("/app/home")
        //     return
        // }
    },[])

    const handleFormSubmit =(e)=>{
        e.preventDefault()
        if(e.target.password.value && e.target.username && e.target.username.value.trim() !== "") {
            axios.post(apiURL + '/api/creators/login',{
                username : e.target.username.value,
                password : e.target.password.value
            },{
                withCredentials : true
            })
            .then((response)=>{
                window.localStorage.setItem("creator_id",response.data.data.creator._id)
                toast.success("Logged in successfully")
                navigate("/app/home")
            })
            .catch((err)=>{
                toast.warn("Login failed. "+err.response.data.message)
            }) 
        }
    }

    return (
        <div className="container-fluid h-100">
            <ToastContainer />
            <div className="row h-100">
                <div className="col  h-100 d-flex justify-content-center align-items-center p-3">
                    <div className="card" style={{width:"25rem"}}>
                        <img src="/loginImage.webp" alt="login image" className="img-card-top border-bottom" />
                        <div className="card-body">
                            <h4 className="card-title">
                                Creator Login
                            </h4>
                            <form onSubmit={(e)=>handleFormSubmit(e)} method="POST">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">@</span>
                                    <input type="text" className="form-control" name="username" placeholder="Username"/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">#</span>
                                    <input type="password" className="form-control" name="password" placeholder="password"/>
                                </div>
                                <button type="submit" className="btn btn-primary w-100 fw-bold">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login