import React, { useEffect, useRef } from 'react';

import CustomInput from '../Components/CustomInput'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';
import PriceInput from '../Components/PriceInput';
import { CiDiscount1 } from "react-icons/ci";
import { createCoupon, getCoupon, getCoupons, resetState, updateCoupon } from '../features/coupon/couponSlice';


const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const id = location.pathname.split("/")[3];


  const newCoupon = useSelector((state)=>state.coupon)
  const {isSuccess,isError,isLoading,createdCoupon,updatedCoupon } = newCoupon;



  let schema =  Yup.object({
    name: Yup.string().required('Title is Required'),
    expiry: Yup.date().required('Expiry is Required'),
    discount: Yup.number().required('Discount is Required').max(100,'Discount should not be greater than 100').min(1,'Discount should not be less than 1'),
  })

  const formik = useFormik({
    initialValues: {
      name: "",
      expiry:  "",
      discount: "",
    },
    validationSchema:schema,
    onSubmit: values => {
          if(id !== undefined){
            const data={id,values}
            dispatch(updateCoupon(data))
            setTimeout(()=>{
              dispatch(resetState())
              dispatch(getCoupons())
            },1000)
          }else{
            dispatch(createCoupon(values))
            setTimeout(()=>{ 
              dispatch(resetState());
            },1000)
          }
          formik.resetForm();
    },
  });

  const shouldFetchCoupon = useRef(true);
  useEffect(() => {
    if (shouldFetchCoupon.current && id !== undefined) {
      shouldFetchCoupon.current = false;
      dispatch(getCoupon(id))
        .then((response) => {
          if (response.payload) {
            const { name, expiry, discount } = response.payload;
            formik.setFieldValue('name', name);
            formik.setFieldValue('expiry', expiry?.slice(0,10));
            formik.setFieldValue('discount', discount);
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          shouldFetchCoupon.current = true;
        });
    } else {
      formik.resetForm();
      dispatch(resetState());
    }
  }, [dispatch, id]);



  useEffect(()=>{

    if(isSuccess && createdCoupon?._id){
        toast.success("Created Coupon Successfully")
    }
    if(isSuccess && updatedCoupon?._id){
      toast.success("Updated Coupon Successfully")
      navigate("/admin/coupon-list")
  }
    if(isError){
        toast.error("Error Creating Coupon, Please Try Again after some time")

    }

},[isSuccess, isError, isLoading, createdCoupon, updatedCoupon])


  return (
    <div>
      <h3 className="mb-4 text-lg">{id === undefined ? "Add a new Coupon" : "Update Coupon"}</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
        <div className='flex flex-col gap-3'>
                <CustomInput 
                    type='text' 
                    name="name" 
                    label='Enter Coupon Code' 
                    onCh={formik.handleChange("name")}
                    onBl={formik.handleBlur("name")}
                    val={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                    <div><p className='text-sm text-red-400'>{formik.errors.name}</p></div>
                ) : null}
            </div>
            <div className='flex flex-col mt-5 md:flex-row gap-5 items-center'>
            <div className='mb-4 flex gap-3 items-center'>
            <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Expiry:</label>
            <input
              type="date"
              name="expiry"
              onChange={formik.handleChange("expiry")}
              value={formik.values.expiry}
              className="border rounded w-full py-2 px-3 text-gray-700 "
            />
             {formik.touched.expiry && formik.errors.expiry ? (
                    <div><p className='text-sm text-red-400'>{formik.errors.expiry}</p></div>
                ) : null}
          </div>
          <div>
                    <PriceInput
                    id='discount'
                    label="Discount:"
                    placeholder="Discount Percentage"
                    name="discount" 
                    icon={<CiDiscount1 className='text-lg' />}
                    onCh={formik.handleChange("discount")}
                    val={formik.values.discount}
                    onBl={formik.handleBlur("discount")}
                    />
                    {formik.touched.discount && formik.errors.discount ? (
                    <div><p className='text-sm text-red-400'>{formik.errors.discount}</p></div>
                     ) : null}
            </div>
            </div>
            <div className='py-4'>
                  <button  type='submit' className='bg-blue-600 py-2 px-3 text-gray-200 font-semibold hover:border-green-800 hover:bg-blue-800 hover:text-white'>{id === undefined ? "Add Coupon" : "Update Coupon"}</button>
              </div>
        </form>
      </div>
    </div>
  )
}

export default AddCoupon
