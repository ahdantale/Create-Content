import { useState, useRef } from "react";
import './contentList.css'
import apiURL from "../../apiURL";
import MoreIcon from '@mui/icons-material/More';
import { Button, ButtonGroup } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { fetchAndSetDataHome } from "../../utils/utils";
import EditContentModal from "../editContentModal.js/editContentModal";
import reactAppDomain from "../../reactAppDomain";

const ContentList = (props) => {


    const [presentEditForm, setPresentEditFrom] = useState(false)
    const [selectedContent, setSelectedContent] = useState(null)

    const handleEditClick = (e) => {
        console.log("test")
        setSelectedContent(props.contents[e.target.id])
        setPresentEditFrom(!presentEditForm)
    }

    const handleDeleteClick = (e) => {
        console.log("delete")
        axios.delete(apiURL + '/api/contents', {
            data: {
                content_id: e.target.id
            },
            withCredentials : true
        })
            .then((response) => {
                toast.success("Deletion successfull")
                fetchAndSetDataHome(props.setContents)
            })
            .catch((err) => {
                toast.warn(err.response.data.message)
                toast.warn(err.response.data.error.detail)
            })
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="table-responsive">
                            <table className="table table-light table-striped">
                                <thead>
                                    <tr>
                                        <th>Sr No</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Publish URL</th>
                                        <th>More</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.contents && props.contents.length > 0 ?
                                            props.contents.map((val, idx) => {
                                                const publish_url = reactAppDomain + '/publish' + `/${val.publish_url}`
                                                return (
                                                    <tr>
                                                        <td>{idx + 1}</td>
                                                        <td>{val.title}</td>
                                                        <td>{val.description.slice(0, 100)} ...</td>
                                                        <td>
                                                            <a href={publish_url} target="_blank" className="link-info link-offset-2 link-underline-opacity-10 link-underline-opacity-100-hover">
                                                                View here
                                                            </a>
                                                        </td>
                                                        <td>
                                                            <div className="d-flex justify-content-between flex-column justify-content-center align-items-center">
                                                                <Button type="button" className="btn btn-primary" id={idx} onClick={(e) => handleEditClick(e)}>Edit</Button>
                                                                <Button type="button" className="btn btn-danger" id={val._id} onClick={(e) => handleDeleteClick(e)}>Delete</Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            : null
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {
                <EditContentModal trigger={presentEditForm} setTrigger={setPresentEditFrom} content={selectedContent} setContents={props.setContents} />
            }

        </>
    )
}

export default ContentList