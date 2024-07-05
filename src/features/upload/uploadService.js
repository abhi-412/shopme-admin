import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/config";

console.log(config);
const upload = async (data)=>{
    const response = await axios.post(`${base_url}upload/`,data,config)
    return response.data;
}

const deleteImg = async(id)=>{
    const response = await axios.delete(`${base_url}upload/delete-img/${id}`,config)
    console.log(response.data);
    return response.data;
}

const uploadService = {
    upload,
    deleteImg,
}

export default uploadService;