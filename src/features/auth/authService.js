import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/config";



const login = async (userData)=>{
    const response = await axios.post(`${base_url}user/admin-login`,userData);
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data));
        return response.data;
    }else{
        console.log("Error Occured");
    }
}


export const getOrders = async ()=>{
    const response = await axios.get(`${base_url}user/orders`,config);
    return response.data;
}

export const getOrdersByUserId = async (id)=>{
    const response = await axios.get(`${base_url}user/orders/${id}`,config);
    return response.data;
}

const authService = {
    login,
    getOrders,
    getOrdersByUserId
}

export default authService