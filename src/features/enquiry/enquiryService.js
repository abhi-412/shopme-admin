import { base_url } from "../../utils/base_url";
import axios from "axios";
import config from "../../utils/config";

const getEnquiries = async()=>{
    const response = await axios.get(`${base_url}enquiry`)
    return response.data;
}

const getEnquiry = async(id)=>{
    const response = await axios.get(`${base_url}enquiry/${id}`,config);
    return response.data;
}

const updateEnquiry = async(id,values)=>{
    const response = await axios.put(`${base_url}enquiry/${id}`,{status:values},config);
    return response.data;
}

const deleteEnquiry = async(id,values)=>{
    const response = await axios.delete(`${base_url}enquiry/${id}`,values,config);
    return response.data;
}


const enquiryService={
    getEnquiries,
    updateEnquiry,
    getEnquiry,
    deleteEnquiry
}

export default enquiryService;