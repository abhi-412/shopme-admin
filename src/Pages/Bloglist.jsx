import React, { useEffect, useState } from 'react'
import { Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, getBlogs } from '../features/blog/blogSlice';
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
      title: 'Blog Title',
      dataIndex: 'name',
      
    },
    {
      title: 'Blog Category',
      dataIndex: 'category',
    },
    {
      title: 'Author',
      dataIndex: 'author',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    }
    
  ];
  
const Bloglist = () => {
  
  const dispatch = useDispatch();
  const [blogId,setBlogId] = useState("")


  useEffect(()=>{
    dispatch(getBlogs());
  },[dispatch])

 

  const blogState = useSelector((state)=>state.blog.blogs);
  const deletedBlogState = useSelector((state)=>state.blog);

  const {isSuccess,isError,isLoading,deletedBlog}= deletedBlogState;


  useEffect(()=>{
    if(isSuccess && deletedBlog?._id){
      toast.success("Deleted Blog Successfully")
    }
    if(isError){
        toast.error("Error Deleting Blog, Please Try Again after some time")

    }
  },[deletedBlog,isSuccess,isError])
  
  const Tabledata = [];

  for(let i=0;i<blogState.length;i++){
    Tabledata.push({
      key:i+1,
      name:blogState[i].title,
      category:blogState[i].category,
      author:blogState[i].author,
      action: (
        <div className='text-lg flex gap-4'>
        <Link to={`/admin/blog/${blogState[i]._id}`}><FaRegEdit /></Link>
        <button onClick={()=>{showModal(blogState[i]._id)}}><MdDelete /></button>

        </div>
      )
    })
  }

  
const [open, setOpen] = useState(false);
const showModal = (id) => {
  setOpen(true);
  console.log(id);
  setBlogId(id);
};
const hideModal = () => {
  setOpen(false);
};

const perfomTask = ()=>{
        dispatch(deleteBlog(blogId))
        setOpen(false);
        setTimeout(()=>{
          dispatch(getBlogs())
        },1000)

}


  return (
    <div>
      <Table columns={columns} dataSource={Tabledata} />
      <CustomModal title="Are you sure you want to delete this blog?" open={open} perfomTask={perfomTask} showModal={showModal} hideModal={hideModal} />

    </div>
  )
}

export default Bloglist
