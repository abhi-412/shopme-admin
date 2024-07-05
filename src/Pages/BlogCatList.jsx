import React, { useEffect, useState } from 'react'
import { Space, Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlogCat, getblCategories, resetState } from '../features/blogCategory/blCatSlice';
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
      title: 'Blog Category',
      dataIndex: 'name',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
    
  ];
  
  
  





const BlogCatList = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getblCategories());
  },[dispatch]);

  const blogCats = useSelector((state)=>state.blCat.blCategories);
  const Tabledata = [];
  for(let i=0;i<blogCats.length;i++){
    Tabledata.push({
      key:i+1,
      name:blogCats[i].title,
      action: (
        <div className='text-lg flex gap-4'>
        <Link to={`/admin/blog-category/${blogCats[i]._id}`}><FaRegEdit /></Link>
        <button onClick={()=>{showModal(blogCats[i]._id)}}><MdDelete /></button>
        </div>
      )
    })
  }

  const blogCatState = useSelector((state)=>state.blCat)
  const {isSuccess,isError,isLoading,deletedBlogCat}= blogCatState;

const [catId,setCatId] = useState("")
  
  useEffect(()=>{ 

    if(isSuccess && deletedBlogCat?._id){
        toast.success("Deleted Category Successfully")
    }
    
    if(isError){
        toast.error("Error Deleting Category, Please Try Again after some time")
    }

},[deletedBlogCat])



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
          dispatch(deleteBlogCat(catId))
          dispatch(resetState())
          setOpen(false);
          setTimeout(()=>{
            dispatch(getblCategories())
          },1000)

  }



  return (
    <div>
      <h3 className="mp-4">Blog Categories</h3>
      <div>
      <Table columns={columns} dataSource={Tabledata} />
      <CustomModal title="Are you sure you want to delete this Blog Category?" open={open} perfomTask={perfomTask} showModal={showModal} hideModal={hideModal} />

      </div>
    </div>
  )
}

export default BlogCatList
