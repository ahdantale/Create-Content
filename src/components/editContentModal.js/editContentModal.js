import './editContentModal.css'
import { useRef } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FormData from 'form-data'
import axios from 'axios'
import apiURL from '../../apiURL'
import { ToastContainer, toast } from 'react-toastify'
import { fetchAndSetDataHome } from '../../utils/utils'
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

const EditContentModal = (props) => {

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
        if(title !== ""  && title.length < 50) {
            if(title.length < 5) {
                toast.warn("Please select a longer title")
            }
            if(title.length > 50) {
                toast.warn("Please select a shorter title")
            }
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
        formData.append("content_id",props.content._id)
        formData.append('title',title)
        formData.append('description',description)
        links.forEach((val)=>formData.append('links[]',val))

        axios.put(apiURL + `/api/contents/edit`,formData,{headers:"Content-Type : multipart/form-data", withCredentials:true})
            .then((response)=>{
                toast.success("Content updated successfully")
            })
            .catch((err)=>{
                console.log(err)
                toast.warn(err.response.data.error?err.response.data.error.detail:err.response.data.message)
            })

    }

    const handleCloseButton = (e) => {
        props.setTrigger(!props)
        fetchAndSetDataHome(props.setContents)
    }
    return (
        <>  {
            props.trigger && props.content ?
                <div className='edit-content-modal'>
                    <Button type="button" className='btn btn-secondary' onClick={(e)=>handleCloseButton(e)}>Close</Button>
                    <div className='edit-content-modal-container'>
                        <form className='d-flex flex-column g-1' onSubmit={(e)=>handleFormSubmit(e)} method='post'>
                            <h2 className="card-header">Edit Content</h2>
                            <div className="card-body">
                                <div className="mb-3">
                                    <h5 for="title" className="form-label">Title</h5>
                                    <input id="title" type="text" className="form-control" defaultValue={props.content.title} name="title" />
                                </div>
                                <div className="mb-3">
                                    <h5 for="description" className="form-label">Description</h5>
                                    <textarea id="description" className="form-control edit-content-modal-textarea" name="description" defaultValue={props.content.description}></textarea>
                                </div>
                                <div className="mb-3">
                                    <div className="d-flex align-items-center">
                                        <h5 for="link" className="form-label">Links</h5>
                                        <small className="text-muted">Optional, Separate multiple links by comma</small>
                                    </div>
                                    <input id="link" type="text" className="form-control" placeholder="example.com, example2.com" name="links" defaultValue={props.content.links.join(', ')}/>
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
                                <Button type="submit" className="btn btn-success mx-2">Save</Button>
                            </div>
                            <ToastContainer />
                        </form>
                    </div>

                </div> :
                null
        }



        </>
    )
}

export default EditContentModal