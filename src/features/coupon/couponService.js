import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/config";


const createCoupon = async(data)=>{
    const response = await axios.post(`${base_url}coupon`,data,config);
    return response.data;
}

const getCoupons = async ()=>{
    const response = await axios.get(`${base_url}coupon`,config)
    return response.data;
}

const deleteCoupon = async (id)=>{
    const response = await axios.delete(`${base_url}coupon/${id}`,config)
    return response.data;
}

const getCoupon = async(id)=>{
    const response = await axios.get(`${base_url}coupon/${id}`,config);
    return response.data;
}

const updateCoupon = async(id,values)=>{
    const response = await axios.put(`${base_url}coupon/${id}`,values,config);
    return response.data;
}

export const couponService = {
    createCoupon,
    getCoupons,
    deleteCoupon,
    updateCoupon,
    getCoupon
}