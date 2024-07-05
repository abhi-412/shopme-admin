import React, { useEffect, useState } from 'react';

import CustomInput from '../Components/CustomInput'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { createBrand, getBrand, getBrands, resetState, updateBrand } from '../features/brand/brandSlice';


const AddBrand = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 



  const location = useLocation();
  const id = location.pathname.split("/")[3];


  const newBrand = useSelector((state)=>state.brand)
  const {isSuccess,isError,isLoading,createdBrand,updatedBrand,brandName}= newBrand;


  useEffect(() => {
    
      if (id !== undefined) {
         dispatch(getBrand(id));
        formik.setFieldValue('title', brandName);
      } else {
        dispatch(resetState());
      }
    
  
  }, [dispatch, id, brandName]);

  let schema =  Yup.object({
    title: Yup.string().required('Title is Required'),
  })

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema:schema,
    onSubmit: values => {
          if(id !== undefined){
            const data={id,values}
            dispatch(updateBrand(data))
            setTimeout(()=>{
              dispatch(resetState())
              dispatch(getBrands())
            },1000)
          }else{
            dispatch(createBrand(values))
            setTimeout(()=>{ 
              dispatch(resetState());
            },1000)
          }
            formik.resetForm();
    },
  });


  

  
  useEffect(()=>{

    if(isSuccess && createdBrand){
        toast.success("Created Brand Successfully")
    }
    if(isSuccess && updatedBrand?._id){
      toast.success("Updated Brand Successfully")
      navigate("/admin/brands-list")
  }
    if(isError){
        toast.error("Error Creating Brand, Please Try Again after some time")

    }

},[isSuccess,isError,isLoading,updatedBrand,createdBrand])




  return (
    <div>
      <h3 className="mb-4 text-lg">{id === undefined ? "Add a new Brand" : "Update Brand"}</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
        <div className='flex flex-col gap-3'>
                <CustomInput 
                    type='text' 
                    name="title" 
                    label='Enter Brand Name' 
                    onCh={formik.handleChange("title")}
                    // onBl={formik.handleBlur("title")}
                    val={formik.values.title}
                />
                {formik.touched.title && formik.errors.title ? (
                    <div><p className='text-sm text-red-400'>{formik.errors.title}</p></div>
                ) : null}
            </div>
            <div className='py-4'>
                  <button  type='submit' className='bg-blue-600 py-2 px-3 text-gray-200 font-semibold hover:border-green-800 hover:bg-blue-800 hover:text-white'>{id === undefined ? "Add Brand" : "Update Brand"}</button>
              </div>
        </form>
      </div>
    </div>
  )
}

export default AddBrand
