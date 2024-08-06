import React, { useEffect, useState } from 'react'
import { Space, Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { deleteCoupon, getCoupons, resetState } from '../features/coupon/couponSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomModal from '../Components/CustomModal';

const columns = [
    {
      title: 'SNo.',
      dataIndex: 'key',
    },
    {
      title: 'Coupon',
      dataIndex: 'name',
      
    },
    {
        title: 'Discount',
        dataIndex: 'discount',
        
    },
    {
        title: 'Expiry',
        dataIndex: 'expiry',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];

const CouponList = () => {

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getCoupons());
  },[dispatch]);




const [couponId,setCouponId] = useState("")


  const couponState = useSelector((state)=>state.coupon.coupons);
  const Tabledata = [];
  for(let i=0;i<couponState.length;i++){
    Tabledata.push({
      key:i+1,
      name:couponState[i].name,
      discount:couponState[i].discount,
      expiry:couponState[i].expiry?.slice(0,10),
      action: (
        <div className='text-lg flex gap-4'>
        <Link to={`/admin/coupon/${couponState[i]._id}`}><FaRegEdit /></Link>
          <button onClick={()=>{showModal(couponState[i]._id)}}><MdDelete /></button>
          </div>
      )
    })
  }




  
  const deletedCouponState = useSelector((state)=>state.coupon);

  const {isSuccess,isError,isLoading,deletedCoupon }= deletedCouponState;


  const [open, setOpen] = useState(false);
  const showModal = (id) => {
    setOpen(true);
    setCouponId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const perfomTask = ()=>{
          dispatch(deleteCoupon(couponId))
          setOpen(false);
          setTimeout(()=>{
            dispatch(getCoupons())
          },1000)
  }


  useEffect(()=>{
    if(isSuccess && deletedCoupon?._id){
      toast.success("Deleted Coupon Successfully")
    }
    if(isError){
        toast.error("Error Deleting Coupon, Please Try Again after some time")

    }
  })

  return (
    <div>
      <div className='flex mb-4 items-center justify-between'>
        <h3 className="lg:text-4xl md:text-3xl text-xl lg:10/12 w-1/2 md:w-10/12 text-center">Coupon List</h3>
        <div className='flex justify-end'>
        <Link to={'/admin/add-coupon'} className='bg-yellow-600 lg:px-3 px-2 md:text-md lg:text-md text-xs rounded-none text-white font-semibold py-2 hover:bg-yellow-400 border-0 hover:text-gray-600'>Add Coupon</Link>
        </div>
      </div>
      <div>
      <div className="table-container">
        <Table columns={columns} dataSource={Tabledata} />
      </div>
      <CustomModal title="Are you sure you want to delete this coupon?" open={open} perfomTask={perfomTask} showModal={showModal} hideModal={hideModal} />

      </div>
    </div>
  )
}

export default CouponList
