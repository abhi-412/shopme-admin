import React, { useEffect, useState } from 'react'
import { Space, Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProdCat, getprodCategories, resetState } from '../features/ProductCategory/prodCatSlice';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import CustomModal from '../Components/CustomModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const columns = [
  {
    title: 'SNo.',
    dataIndex: 'key',
  },
  {
    title: 'Category Name',
    dataIndex: 'name',
    
  },
  {
    title: 'Action',
    dataIndex: 'action',
  }
];
  

const CategoryList = () => {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getprodCategories());
  },[dispatch]);

  const prodCategories = useSelector((state)=>state.prodCategory.prodCategories);
  const Tabledata = [];
  for(let i=0;i<prodCategories.length;i++){
    Tabledata.push({
      key:i+1,
      name:prodCategories[i].title,
      action: (
        <div className='text-lg flex gap-4'>
        <Link to={`/admin/category/${prodCategories[i]._id}`}><FaRegEdit /></Link>
        <button onClick={()=>{showModal(prodCategories[i]._id)}}><MdDelete /></button>

        
        </div>
      )
    })
  }


  const prodCatState = useSelector((state)=>state.prodCategory)
  const {isSuccess,isError,isLoading,deletedProdCategory}= prodCatState;

const [catId,setCatId] = useState("")
  
  useEffect(()=>{ 

    if(isSuccess && deletedProdCategory?._id){
        toast.success("Deleted Category Successfully")

    }
    
    if(isError){
        toast.error("Error Deleting Category, Please Try Again after some time")
    }

},[deletedProdCategory])


const [open, setOpen] = useState(false);
  const showModal = (id) => {
    setOpen(true);
    console.log(id);
    setCatId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const perfomTask = ()=>{
          dispatch(deleteProdCat(catId))
          dispatch(resetState())
          setOpen(false);
          setTimeout(()=>{
            dispatch(getprodCategories())
          },1000)

  }

  return (
    <div>
      <h3 className="mp-4"> Product Categories </h3>
      <div>
      <Table columns={columns} dataSource={Tabledata} />
      <CustomModal title="Are you sure you want to delete this Product Category?" open={open} perfomTask={perfomTask} showModal={showModal} hideModal={hideModal} />

      </div>
    </div>
  )
}

export default CategoryList
