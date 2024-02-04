import { useState } from 'react'
import './publish.css'
import { useParams } from 'react-router-dom'
import apiURL from '../../apiURL'
import axios from 'axios'

const Publish = () =>{

    const { publish_url } = useParams()

    const [document, setDocument] = useState({
        author : "",
        title : "",
        description : "",
        links : []
    })

    useState(()=>{
        axios.get(apiURL + '/api/contents' +`/${publish_url}`)
            .then((response)=>{
                setDocument({
                    author : publish_url.split("_")[0],
                    title : response.data.data.content.title,
                    description : response.data.data.content.description,
                    links : response.data.data.content.links
                })
            })
    },[])

    return (
        <div className='container-fluid h-100 p-3'>
        <div className='row h-100'>
            <div className='col h-100'>
                <div className='card'>
                    <div className="card-header content-publish-font">
                        <h1>{document.title}</h1>
                        <h6 className='content-publish-author-font'>@{document.author}</h6>
                    </div>
                    <div className='card-body'>
                        <pre className='card-text content-publish-text content-font' readOnly>{document.description}</pre>
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

export default Publish