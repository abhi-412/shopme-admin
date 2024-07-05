import React from 'react'
import CustomInput from '../Components/CustomInput'

const ForgotPassword = () => {
  return (
    <div className='bg-gray-800 w-full h-screen flex items-center py-5'>
    <div className="my-5 lg:w-1/3 md:w-2/3 bg-white  mx-auto p-5">
      <h3 className='text-center text-xl'>Forgot Password</h3>
      <p className='text-center'>Reset your password through mail.</p>
      <form action="" className='mt-3'>
        <CustomInput  type="text" label="Email Address" id="email" />
        <CustomInput type="password" label="Password" id="pass" />
        <button type='submit' className='border-0 bg-gray-800 text-white w-full font-bold p-10 px-3 py-2'>Get Link</button>
      </form>
    </div>
  </div>
  )
}

export default ForgotPassword
