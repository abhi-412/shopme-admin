import React, { useEffect } from 'react'
import CustomInput from '../Components/CustomInput'
import {Link, useNavigate} from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {login} from '../features/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux';

const Login = () => {

  const dispatch = useDispatch();
  const navigate =useNavigate();

  let schema =  Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is Required'),
    password: Yup.string().required('Password is Required')
    .min(8, 'Password must contain 8 characters or more')
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password:'',
    },
    validationSchema:schema,
    onSubmit: values => {
      dispatch(login(values));
    },
  });

  const {user,isLoading,isError,isSuccess,message} = useSelector((state)=>state.auth)
  useEffect(()=>{
    if(isSuccess){
      navigate('admin')
    }else{
      navigate("");
    }
  },[user,isLoading,isError,isSuccess,message,navigate]);
  return (
    <div className='bg-gray-800 w-full h-screen flex items-center py-5'>
      <div className="my-5 lg:w-1/3 md:w-2/3 bg-white  mx-auto p-5">
        <h3 className='text-center text-xl'>Login</h3>
        <p className='text-center'>Login to Continue to your Account</p>

          <div className='error text-center'>
              <p className='text-red-400 mt-3'>{message.message == "Rejected" ? "You are not an Admin" : null}</p>
          </div>

        <form onSubmit={formik.handleSubmit} className='flex flex-col gap-5'>
          <CustomInput
            type="text" 
            name="email" 
            label="Email Address" 
            id="email" 
            onCh={formik.handleChange("email")}
            val={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div><p className='text-sm text-red-400'>{formik.errors.email}</p></div>
          ) : null}
          <CustomInput 
          type="password" 
          name="password" 
          label="Password"
          id="pass"
          onCh={formik.handleChange("password")}
          val={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div><p className='text-sm text-red-400'>{formik.errors.password}</p></div>
          ) : null}
          <div className='flex py-4 gap-10 mb-3'>
            <button type='submit' className='border-0 text-center bg-gray-800 text-white w-full font-bold px-3'>Login</button>
            <Link to={'/forgot-password'} className=' text-blue-500 text-center w-full px-3 py-2'>Forgot Password</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
