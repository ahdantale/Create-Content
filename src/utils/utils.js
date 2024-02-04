import axios from "axios";
import apiURL from "../apiURL";
import {toast} from 'react-toastify'

async function fetchAndSetDataHome(setContents){
    axios.get(apiURL + `/api/contents/for_user`,{
        withCredentials : true
    })
    .then((response)=>{
        setContents(response.data.data.contents)
    })
    .catch((err)=>{
        toast.warn(err.response.data.message)
    })
}

export {
    fetchAndSetDataHome
}