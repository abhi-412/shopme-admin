import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/config";


const getProducts = async ()=>{
    const response = await axios.get(`${base_url}product/`);
    return response.data;
}

const createProduct = async (product)=>{
    console.log(product)
    const response = await axios.post(`${base_url}product/`,product,config);
    return response.data;
}

const deleteProduct = async(id)=>{
    const response = await axios.delete(`${base_url}product/${id}`,config);
    return response.data;
}

const getOneProduct = async(id)=>{
    const response = await axios.get(`${base_url}product/${id}`,config);
    return response.data;
}


const productService = {
    getProducts,
    createProduct,
    deleteProduct,
    getOneProduct,
}

export default productService