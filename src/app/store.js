import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice"
import productReducer from "../features/product/productSlice"
import brandReducer from "../features/brand/brandSlice"
import prodCatReducer from "../features/ProductCategory/prodCatSlice"
import colorReducer from "../features/color/colorSlice"
import blogReducer from "../features/blog/blogSlice"
import blCatReducer from "../features/blogCategory/blCatSlice"
import enquiryReducer from "../features/enquiry/enquirySlice"
import uploadReducer from "../features/upload/uploadSlice"
import couponReducer from "../features/coupon/couponSlice"


export const store = configureStore({
    reducer:{
        auth:authReducer,
        customer:customerReducer,
        product:productReducer,
        brand:brandReducer,
        prodCategory:prodCatReducer,
        color:colorReducer,
        blog:blogReducer,
        blCat:blCatReducer,
        enquiry:enquiryReducer,
        upload:uploadReducer,
        coupon:couponReducer,
    },
})