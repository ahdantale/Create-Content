import {useEffect} from "react";
import './stage.css'
import Sidebar from "../../components/sidebar/sidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import axios from "axios";
import apiURL from "../../apiURL";


const Stage = ()=>{
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get(apiURL + '/api/creators/me',{withCredentials:true})
            .catch((err)=>{
                console.log(err)
                if(err.response.status === 401){
                    navigate('/login')
                } else {
                    toast.warn("oops error setting up.")
                }
            })
    },[])

    return(
        <>
        <ToastContainer />
        <div className="stage-container">
            <div className="sidebar-container">
                <Sidebar />
            </div>
            <div className="outlet-container">
                <Outlet />
            </div>
        </div>
        </>
    )
}

export default Stage