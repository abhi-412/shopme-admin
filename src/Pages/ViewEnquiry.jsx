import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { getEnquiry, getOneEnquiry, resetState, updateEnquiry } from '../features/enquiry/enquirySlice';

const ViewEnquiry = () => {

    const location = useLocation();
    const enqId = location.pathname.split("/")[3];

    const dispatch = useDispatch();

    useEffect(() => {
        console.log(enqId);
        dispatch(getOneEnquiry(enqId));
    }, [enqId])

    const enqState = useSelector((state)=>state.enquiry?.enquiry)
    console.log(enqState);

    const setEnq = (e,i)=>{
        console.log(e,i);
        const data = {values:e,id:i}
        dispatch(updateEnquiry(data));
        dispatch(resetState());
        setTimeout(()=>{
            dispatch(getOneEnquiry(enqId));
        },300)
      }
    
  return (
    <div>
      <div className='flex mb-4 justify-between items-center'>
      <h3 className="mb-4 text-2xl">View Enquiry</h3>
      <button className='bg-yellow-500 px-4 py-2' onClick={()=>{window.history.back()}}>Go Back</button>
      </div>
      <div className='bg-white rounded-md w-full p-4'>
            <div className='flex flex-col gap-4 text-lg justify-start'>
                <div className='flex gap-2'>
                    <p className='font-semibold'>Name:</p>
                    <p>{enqState?.name}</p>
                </div>

                <div className='flex gap-2'>
                    <p className='font-semibold'>Email:</p>
                    <p><a className='text-gray-600' href={`mailto:${enqState?.email}`}>{enqState?.email}</a></p>
                </div>

                <div className='flex gap-2'>
                    <p className='font-semibold'>Mobile:</p>
                    <p><a className='text-blue-400 underline hover:underline' href={`tel:+91${enqState?.mobile}`}>{enqState?.mobile}</a></p>
                </div>

                <div className='flex gap-2'>
                    <p className='font-semibold'>Message:</p>
                    <p>{enqState?.comment}</p>
                </div>
                
                <div className='flex gap-2'>
                    <p className='font-semibold'>Status:</p>
                    <p className={enqState?.status === "In Progress"  ? "text-red-500" : "text-green-500"}>{enqState?.status}</p>
                </div>

                <div className='flex gap-2 w-full items-center'>
            <h3>Update Status:</h3>

        <div className='w-full'>
            <select onChange={(e)=>{setEnq(e.target.value,enqState?._id)}} defaultValue={enqState?.status ? enqState?.status : "Submitted"} className='w-full md:w-5/12' name="" id="">
                <option value="Submitted">Submitted</option>
                <option value="Contacted">Contacted</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
        </div>
    </div>
            </div>
      </div>
    </div>
  )
}
export default ViewEnquiry
