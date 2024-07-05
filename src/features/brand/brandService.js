import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/config";
 
const getBrands = async ()=>{
    const response = await axios.get(`${base_url}brands`)
    return response.data;
}

const createBrand = async (brand)=>{
    const response = await axios.post(`${base_url}brands/`,brand,config);
    return response.data;
}

const getBrand = async(id)=>{
    const response = await axios.get(`${base_url}brands/${id}`,config);
    return response.data;
}

const updateBrand = async(id,values)=>{
    const response = await axios.put(`${base_url}brands/${id}`,values,config);
    return response.data;
}

const deleteBrand = async(id)=>{
    const response = await axios.delete(`${base_url}brands/${id}`,config);
    return response.data;
}

const brandService = {
    getBrands,
    createBrand,
    getBrand,
    updateBrand,
    deleteBrand
};

export default brandService;