import { Link } from 'react-router-dom'
import './contentPreview.css'
import { useEffect, useState } from 'react'

const ContentPreview = (props) => {


    const [document, setDocument] = useState({
        title: "",
        description: "",
        links: []
    })

    useEffect(() => {
        console.log(window.localStorage.getItem('links'))
        setDocument({
            title: window.localStorage.getItem('title'),
            description: window.localStorage.getItem('description'),
            links: window.localStorage.getItem('links').trim() !== "" ? window.localStorage.getItem('links').trim().split(',').map((val) => val.trim()) : []
        })
        return()=>{
            setDocument({
                title: "",
                description: "",
                links: []
            })
        }
    }, [])


    return (
        <div className='container-fluid h-100 p-3'>
            <div className='row h-100'>
                <div className='col h-100'>
                    <div className='card'>
                        <h1 className="card-header content-font">{document.title}</h1>
                        <div className='card-body'>
                            <pre className='card-text content-preview-text content-font' readOnly>{document.description}</pre>
                            <h4 className='card-title content-font'>Useful Links</h4>
                            <div className='card-text'>
                                {
                                    document.links.map((val)=>{
                                        return (
                                        <p><a href={val} target="_blank" className='link-dark link-offset-2 link-underline-opacity-0 link-underline-opacity-75-hover'>{val}</a></p>
                                        )
                                    })
                                }
                               

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ContentPreview