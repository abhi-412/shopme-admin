import React, { useEffect, useState } from 'react'
import { Space, Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBrand, getBrands } from '../features/brand/brandSlice'
import { FaRegEdit } from "react-icons/fa";
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
    {
      title: 'Brand Name',
      dataIndex: 'name',
      
    },
    {
      title: 'Action',
      dataIndex: 'action',
    }
    
  ];
  
  

const BrandList = () => {
const dispatch = useDispatch();
const [brandId,setBrandId] = useState("")

  useEffect(()=>{
    dispatch(getBrands());
  },[dispatch])
  
  const brands = useSelector((state)=>state.brand.brands)
  const Tabledata = [];
  for(let i=0;i<brands.length;i++){
      Tabledata.push({
        key:i+1,
        name:brands[i].title,
        action: (
          <div className='text-lg flex gap-4'>
          <Link to={`/admin/brand/${brands[i]?._id}`}><FaRegEdit /></Link>
          <button onClick={()=>{showModal(brands[i]?._id)}}><MdDelete /></button>
          </div>
        )
      })
  }
  

  const brandState = useSelector((state)=>state.brand)
  const {isSuccess,isError,isLoading,deletedBrand}= brandState;

  useEffect(()=>{

    if(isSuccess && deletedBrand?._id){
        toast.success("Deleted Brand Successfully")
    }
    if(isError){
        toast.error("Error Deleting Brand, Please Try Again after some time")
    }

},[deletedBrand, isError, isSuccess])


const [open, setOpen] = useState(false);
  const showModal = (id) => {
    setOpen(true);
    setBrandId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const perfomTask = ()=>{
          dispatch(deleteBrand(brandId))
          setOpen(false);
          setTimeout(()=>{
            dispatch(getBrands())
          },1000)

  }

  return (
    <div>
      <h3 className="mp-4">Brand List</h3>
      <div>
      <Table columns={columns} dataSource={Tabledata} />
      <CustomModal title="Are you sure you want to delete this brand?" open={open} perfomTask={perfomTask} showModal={showModal} hideModal={hideModal} />

      </div>
    </div>
  )
}

export default BrandList
