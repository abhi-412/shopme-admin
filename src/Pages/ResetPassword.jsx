import React from 'react'
import CustomInput from '../Components/CustomInput'
import {Link} from 'react-router-dom';

const ResetPassword = () => {
  return (
    <div className='bg-gray-800 w-full h-screen flex items-center py-5'>
    <div className="my-5 lg:w-1/3 md:w-2/3 bg-white  mx-auto p-5">
      <h3 className='text-center text-xl'>Reset Password</h3>
      <p className='text-center'>Reset your password by entering your Old Password.</p>
      <form action="" className='mt-3'>
        <CustomInput type="password" label="Old Password" id="pass" />
        <CustomInput type="password" label="New Password" id="new-pass" />
        <CustomInput type="password" label="Confirm New Password" id="confirm-pass" />
        <div className='flex gap-10'>
            <button type='submit' className='border-0 text-center bg-gray-800 text-white w-full font-bold px-3 py-2'>Change</button>
            <Link to={'/'} className=' text-blue-500 text-center w-full px-3 py-2'>Cancel</Link>
        </div>
      </form>
    </div>
  </div>
  )
}

export default ResetPassword
