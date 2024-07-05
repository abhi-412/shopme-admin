import { base_url } from "../../utils/base_url";
import axios from "axios";
import config from "../../utils/config";

const getprodCategories  = async()=>{
    const response = await axios.get(`${base_url}category`);
    return response.data;
}

const createProdCategory = async (category)=>{
    const response = await axios.post(`${base_url}category/`,category,config);
    return response.data;
}

const getproductCategory = async(id)=>{
    const response = await axios.get(`${base_url}category/${id}`,config);
    return response.data;
}

const updateproductCategory = async(id,values)=>{
    const response = await axios.put(`${base_url}category/${id}`,values,config);
    return response.data;
}

const deleteproductCategory = async(id)=>{
    const response = await axios.delete(`${base_url}category/${id}`,config);
    return response.data;
}

const prodCatService = {
    getprodCategories, 
    createProdCategory,
    getproductCategory,
    deleteproductCategory,
    updateproductCategory
}

export default prodCatService;