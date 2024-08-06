import React, { useEffect, useState } from 'react'
import { Space, Table, Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { deleteEnquiry, getEnquiry, resetState, updateEnquiry } from '../features/enquiry/enquirySlice';
import { FaRegEdit,FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomModal from '../Components/CustomModal';

const columns = [
    {
      title: 'SNo.',
      dataIndex: 'key',
    },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   render: (status ) => (
    //     <>
    //       <Tag color={status=="Completed" ? "green" : "red"} key={status}>
    //         {status.toUpperCase()}
    //       </Tag>
    //     </>
    //   ),
    // },
    {
      title: 'Customer Name',
      dataIndex: 'name',
      
    },
    {
      title: 'Email',
      dataIndex: 'email',
      
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
   
    
  ];
  
  






const Enquiries = () => {

  const dispatch = useDispatch();

  const [enqId,setEnqId] = useState("");

  useEffect(()=>{
    dispatch(getEnquiry())
  },[dispatch]);

  const enqState = useSelector((state)=>state.enquiry.enquiries)
  const Tabledata = [];

  const setEnq = (e,i)=>{
    const data = {values:e,id:i}
    dispatch(updateEnquiry(data));
  }
  
  for(let i=0;i<enqState.length;i++){
    Tabledata.push({
      key:i+1,
      name:enqState[i].name,
      email:enqState[i].email,
      mobile:enqState[i].mobile,
      // status:enqState[i].status,
      status: (
        <div className='flex gap-2 w-full items-center'>
        <div className='w-full'>
            <select onChange={(e)=>{setEnq(e.target.value,enqState[i]._id)}} defaultValue={enqState[i]?.status ? enqState[i]?.status : "Submitted"} className='w-full md:w-5/12' name="" id="">
                <option value="Submitted">Submitted</option>
                <option value="Contacted">Contacted</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
        </div>
    </div>
      ),
      action: (
        <div className='mb-5 flex items-center gap-3'>
          <Link to={`/admin/enquiry/${enqState[i]?._id}`}>
            <FaEye className='text-2xl text-green-500 cursor-pointer' />
          </Link>
          <button onClick={()=>{showModal(enqState[i]?._id)}}>
            <MdDelete className='text-2xl text-red-500 cursor-pointer' />
          </button>
        </div>
      )
    })
  }


  const enquiryState = useSelector((state)=>state.enquiry)
  const {isSuccess,isError,isLoading,deletedEnquiry}= enquiryState;

  useEffect(()=>{

    if(isSuccess && deletedEnquiry?._id){
        toast.success("Deleted Enquiry Successfully")
    }
    if(isError){
        toast.error("Error Deleting Enquiry, Please Try Again after some time")
    }

},[deletedEnquiry, isError, isSuccess])


  const [open, setOpen] = useState(false);
  const showModal = (id) => {
    setOpen(true);
    setEnqId(id)

  };
  const hideModal = () => {
    setOpen(false);
  };

  const perfomTask = ()=>{
          dispatch(deleteEnquiry(enqId))
          setOpen(false);
          setTimeout(()=>{
            dispatch(resetState())
            dispatch(getEnquiry());
          },1000)

  }

  return (
    <div>
      <h3 className="mb-4 text-center text-3xl mx-2">Enquiries</h3>
      <div>
      <div className="table-container">
        <Table columns={columns} dataSource={Tabledata} />
      </div>
      <CustomModal title="Are you sure you want to delete this enquiry?" open={open} perfomTask={perfomTask} showModal={showModal} hideModal={hideModal} />

      </div>
    </div>
  )
}

export default Enquiries
