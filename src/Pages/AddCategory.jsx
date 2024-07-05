import React, { useEffect, useState } from 'react';

import CustomInput from '../Components/CustomInput'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { createProdCat, getProdCat, getprodCategories, resetState, updateProdCat } from '../features/ProductCategory/prodCatSlice';

const AddCategory = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const id = location.pathname.split("/")[3];

  const newProdCat = useSelector((state)=>state.prodCategory)
  const {isSuccess,isError,isLoading,createdProdCategory,updatedProdCategory,prodCatName }= newProdCat;

  useEffect(() => {
    
    if (id !== undefined) {
       dispatch(getProdCat(id));
      formik.setFieldValue('title',prodCatName);
    } else {
      dispatch(resetState());
    }
}, [dispatch, id,prodCatName]);


  let schema =  Yup.object({
    title: Yup.string().required('Category Name is Required'),
  })


  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema:schema, 
    onSubmit: values => {
      if(id===undefined){
        dispatch(createProdCat(values))
          setTimeout(()=>{
            dispatch(resetState());
          },3000)
        }else{
              dispatch(updateProdCat({id,values}))
              setTimeout(()=>{
                dispatch(resetState());
                dispatch(getprodCategories())
              },3000)
        }
      formik.resetForm();
    },
  });



  
  useEffect(()=>{

    if(isSuccess && createdProdCategory?._id){
        toast.success("Created Product Category Successfully")
    }
    if(isSuccess && updatedProdCategory?._id){
      toast.success("Updated Category Successfully")
      navigate("/admin/list-category")
  }
    if(isError){
        toast.error("Error Creating Product Category, Please Try Again after some time")

    }

},[isSuccess,isError,updatedProdCategory,createdProdCategory,isLoading])



  return (
    <div>
      <h3 className="mb-4 text-lg">{id===undefined ? "Add Category" : "Update Category"}</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
            <div className='flex flex-col gap-3'>
                <CustomInput 
                    type='text' 
                    name="title" 
                    label='Enter Product Category' 
                    onCh={formik.handleChange("title")}
                    // onBl={formik.handleBlur("title")}
                    val={formik.values.title}
                />
                {formik.touched.title && formik.errors.title ? (
                    <div><p className='text-sm text-red-400'>{formik.errors.title}</p></div>
                ) : null}
            </div>
            <div className='py-4'>
                  <button  type='submit' className='bg-blue-600 py-2 px-3 text-gray-200 font-semibold hover:border-green-800 hover:bg-blue-800 hover:text-white'>{id===undefined ? "Add Category" : "Update Category"}</button>
              </div>
        </form>
      </div>
    </div>
  )
}

export default AddCategory
