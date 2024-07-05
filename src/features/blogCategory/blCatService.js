import { base_url } from "../../utils/base_url";
import axios from "axios";
import config from "../../utils/config";

const getblCategories  = async()=>{
    const response = await axios.get(`${base_url}blogCat`);
    return response.data;
}

const createBlCategory = async (category)=>{
    const response = await axios.post(`${base_url}blogCat/`,category,config);
    return response.data;
}

const getBlogCategory = async(id)=>{
    const response = await axios.get(`${base_url}blogCat/${id}`,config);
    return response.data;
}

const updateBlogCategory = async(id,values)=>{
    const response = await axios.put(`${base_url}blogCat/${id}`,values,config);
    return response.data;
}

const deleteBlogCategory = async(id)=>{
    const response = await axios.delete(`${base_url}blogCat/${id}`,config);
    return response.data;
}

const blCatService = {
getblCategories,
createBlCategory,
 getBlogCategory,
updateBlogCategory,
deleteBlogCategory
}

export default blCatService;