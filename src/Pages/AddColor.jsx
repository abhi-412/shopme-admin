import React, { useEffect, useState } from 'react';

import CustomInput from '../Components/CustomInput'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { createColor, getColor, getColors, resetState, updateColor } from '../features/color/colorSlice';

const AddColor = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const id = location.pathname.split("/")[3];

  const newColor = useSelector((state)=>state.color)
  const {isSuccess,isError,isLoading,createdColor,updatedColor,colorName }= newColor;

  let schema =  Yup.object({
    color: Yup.string().required('Color is Required'),
  })

  useEffect(() => {
    
    if (id !== undefined) {
       dispatch(getColor(id));
      formik.setFieldValue('color', colorName);
    } else {
      dispatch(resetState());
    }
  

}, [dispatch, id, colorName]);

  const formik = useFormik({
    initialValues: {
      color: "",
    },
    validationSchema:schema,
    onSubmit: values => {
          if(id !== undefined){
            dispatch(updateColor({id,values}))
              setTimeout(()=>{
                dispatch(resetState())
                dispatch(getColors())
              }, 1000)
          }else{
            dispatch(createColor(values))
            setTimeout(()=>{ 
              dispatch(resetState());
            },300)
          }
            formik.resetForm();
            
    },
  });



  
  useEffect(()=>{

    if(isSuccess && createdColor?._id){
        toast.success("Added Color Successfully")
    }
    if(isSuccess && updatedColor?._id){
      toast.success("Updated Color Successfully")
      navigate("/admin/list-colors")
  }
    if(isError){
        toast.error("Error adding Color, Please Try Again after some time")

    }

},[isSuccess, isError, isLoading,updatedColor, createdColor])


  return (
    <div>
      <h3 className="mb-4 text-lg">{id === undefined ? "Add a new Color" : "Update Color"}</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
        <div className='flex flex-col gap-3'>
                <CustomInput 
                    type='text' 
                    name="color" 
                    label='Enter Color' 
                    onCh={formik.handleChange("color")}
                    // onBl={formik.handleBlur("color")}
                    val={formik.values.color}
                />
                {formik.touched.color && formik.errors.color ? (
                    <div><p className='text-sm text-red-400'>{formik.errors.color}</p></div>
                ) : null}
            </div>
            <div className='py-4'>
                  <button  type='submit' className='bg-blue-600 py-2 px-3 text-gray-200 font-semibold hover:border-green-800 hover:bg-blue-800 hover:text-white'>{id === undefined ? "Add Color" : "Update Color"}</button>
              </div>
        </form>
      </div>
    </div>
  )
}

export default AddColor
