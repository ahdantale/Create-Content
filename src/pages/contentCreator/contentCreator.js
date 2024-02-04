import { useEffect, useRef, useState } from "react";
import './contentCreator.css'
import { Button } from "react-bootstrap";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FormData from 'form-data'
import axios from "axios";
import { Link } from "react-router-dom";
import {ToastContainer, toast} from "react-toastify"
import apiURL from "../../apiURL";
const {isURL} = require('validator')
const options = {
    protocols: [
        'http',
        'https',
        'ftp'
    ],
    require_tld: true,
    require_protocol: true,
    require_host: true,
    require_valid_protocol: true,
    allow_underscores: true,
    host_whitelist: false,
    host_blacklist: false,
    allow_trailing_dot: false,
    allow_protocol_relative_urls: false,
    disallow_auth: false
}


const ContentCreator = () => {

    const textAreaRef = useRef(null)
    const [description, setDescription] = useState("")
    const [previewURL,setPreviewURL] = useState(null)

    useEffect(()=>{
        setPreviewURL('preview'+`/${window.localStorage.getItem("creator_id")}`)
    },[])

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "160px"
            const scrollHeight = textAreaRef.current.scrollHeight
            textAreaRef.current.style.height = scrollHeight + "px"
        }
    }, [description])


    const handleFormSubmit = (e) => {
        e.preventDefault()
        const title = e.target.title.value.trim()
        const description = e.target.description.value.trim()
        const links = e.target.links.value.trim() !== "" ? e.target.links.value.split(',').map((val,idx)=>{return (val.trim())}) : []
        console.log(links)
        if(title === "" || description ==="") {
            toast.warn("Title and description cannot be empty")
            return
        }
        if(title !== "" && title.length < 5) {
            toast.warn("Please select a longer title")
            return
        }
        if(description !== "" && description.length < 20) {
            toast.warn("Please select a longer description")
            return
        }
        if(links.length > 5) {
            toast.warn("Total 5 links allowed")
            return
        } else {
            for(const link of links){
                if(!isURL(link,options)){
                    toast.warn("Please enter valid urls.")
                    return 
                }
            }
        }

        const formData = new FormData()
        formData.append('title',title)
        formData.append('description',description)
        links.forEach((val)=>formData.append('links[]',val))

        axios.post(apiURL + `/api/contents/create`,formData,{headers:"Content-Type : multipart/form-data", withCredentials:true})
            .then((response)=>{
                toast.success("Content published successfully")
            })
            .catch((err)=>{
                toast.warn(err.response.data.message)
            })

    }

    const handleFormChange = (e)=>{
        const value = e.target.value.trim()
        switch(e.target.name){
            case "title" : window.localStorage.setItem("title",value); break;
            case "description" : setDescription(value);window.localStorage.setItem("description",value); break;
            case "links" :  window.localStorage.setItem("links",value); break;
        }
    }



    return (
        <div className="container-fluid p-2">
            <ToastContainer />
            <div className="row w-100">
                <div className="col w-100">
                    <form className="card" method="post" onSubmit={(e)=>handleFormSubmit(e)} onChange={(e)=>handleFormChange(e)}>
                        <h2 className="card-header">Create Something</h2>
                        <div className="card-body">
                            <div className="mb-3">
                                <h5 for="title" className="form-label">Title</h5>
                                <input id="title" type="text" className="form-control" placeholder="Title" name="title" />
                            </div>
                            <div className="mb-3">
                                <h5 for="description" className="form-label">Description</h5>
                                <textarea ref={textAreaRef} id="description" className="form-control" name="description" placeholder="Description"></textarea>
                            </div>
                            <div className="mb-3">
                                <div className="d-flex align-items-center"> 
                                    <h5 for="link" className="form-label">Links</h5>
                                    <small className="text-muted">Optional, Separate multiple links by comma</small>
                                </div>
                                <input id="link" type="text" className="form-control" placeholder="example.com, example2.com" name="links" />
                            </div>
                            {/* <div className="mb-3">
                                <div className="d-flex align-items-center">
                                    <h5 for="file" className="form-label">Select a file</h5>
                                    <small className="text-muted">Optional</small>
                                </div>
                                <input id="file" type="file" className="form-control" />
                            </div> */}
                        </div>
                        <div className="card-footer">
                            <Button type="submit" className="btn btn-primary mx-2">Publish</Button>
                            <Link className="btn btn-secondary mx-2" to='/app/preview' target="_blank">Preview</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ContentCreator