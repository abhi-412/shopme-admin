import React, { useEffect, useState } from 'react';

import CustomInput from '../Components/CustomInput'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { createBlogCat, getBlogCat, getblCategories, resetState, updateBlogCat } from '../features/blogCategory/blCatSlice';

const AddBlogCat = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const id = location.pathname.split("/")[3];

  const newBlogCat = useSelector((state)=>state.blCat)
  const {isSuccess,isError,isLoading,createdBlogCat,updatedBlogCat,blogCatName } = newBlogCat;

  useEffect(() => {
    
    if (id !== undefined) {
       dispatch(getBlogCat(id));
      formik.setFieldValue('title',blogCatName);
    } else {
      dispatch(resetState());
    }
}, [dispatch, id,blogCatName]);


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
        dispatch(createBlogCat(values))
          setTimeout(()=>{
            dispatch(resetState());
          },3000)
        }else{
              dispatch(updateBlogCat({id,values}))
              setTimeout(()=>{
                dispatch(resetState());
                dispatch(getblCategories())
              },3000)
        }
      formik.resetForm();
    },
  });



  
  useEffect(()=>{

    if(isSuccess && createdBlogCat?._id){
        toast.success("Created Blog Category Successfully")
    }
    if(isSuccess && updatedBlogCat?._id){
      toast.success("Updated Blog Category Successfully")
      navigate("/admin/blog-cat-list")
  }
    if(isError){
        toast.error("Error Creating Blog Category, Please Try Again after some time")

    }

},[isSuccess,isError,updatedBlogCat,createdBlogCat,isLoading])



  return (
    <div>
      <h3 className="mb-4 text-lg">{id===undefined ? "Add Blog Category" : "Update Blog Category"}</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
            <div className='flex flex-col gap-3'>
                <CustomInput 
                    type='text' 
                    name="title" 
                    label='Enter Blog Category' 
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

export default AddBlogCat
