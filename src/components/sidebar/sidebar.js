import React from "react";
import './sidebar.css'
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import PostAddIcon from '@mui/icons-material/PostAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from "axios";
import apiURL from "../../apiURL";
import { ToastContainer, toast } from "react-toastify";

const Sidebar = () =>{
    
    const navigate = useNavigate()

    const handleLogoutClick = (e) =>{
        axios.post(apiURL + '/api/creators/logout',null,{withCredentials : true})
            .then((response)=>{
                toast.success("Logged out.")
                navigate('/login')
            })
            .catch((err)=>{
                toast.warn("Log out failed.")
            })
    }

    return (
        <>
        <ToastContainer />
        <div className="navbar navbar-dark bg-dark px-2  d-flex flex-column align-items-start h-100">
            <ul className="navbar-nav px-xs-3 px-sm-1 px-md-2 px-lg-3 d-flex flex-column h-100">
                <li className="nav-item mb-3">
                    <Link to="/app/home" className="nav-link d-flex justify-content-center align-items-center">
                        <img src='/cc_logo.png' alt="company logo" height={"160px"} className="nav-image"/>
                    </Link> 
                    <Link to="/app/home" className="nav-link">
                        <span className="d-flex align-items-center flex-grow-1"><HomeIcon /> <span>Home</span></span>
                    </Link>
                </li>
                <li className="nav-item mb-3">
                    <Link to="/app/content" className="nav-link">
                        <span className="d-flex align-items-center"><PostAddIcon /> <span>Create Content</span></span>
                    </Link>
                </li>
                <li className="nav-item mb-3">
                    <Link to='/login' className="nav-link" onClick={(e)=>handleLogoutClick(e)}>
                        <span className="d-flex align-items-center"><LogoutIcon /> <span>Logout</span></span>
                    </Link>
                </li>
            </ul>
        </div>
        </>
    )
}

export default Sidebar