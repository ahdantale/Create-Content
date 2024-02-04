import React, { useEffect, useState } from "react";
import './home.css'
import ContentList from "../../components/contentList/contentList";
import apiURL from "../../apiURL";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { fetchAndSetDataHome } from "../../utils/utils";
const Home = () =>{

    const [contents, setContents] = useState([])

    useEffect(()=>{
        fetchAndSetDataHome(setContents)
    },[])

    return (

        <div className="container">
            <ToastContainer />
            <div className="row">
                <div className="col">
                    <h2>Your Content</h2>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <ContentList contents={contents} setContents={setContents}/>
                </div>
            </div>
        </div>

    )
}

export default Home