import React, { useEffect, useState } from 'react'
import { Space, Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteColor, getColors } from '../features/color/colorSlice';
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
      title: 'Color',
      dataIndex: 'name',
      
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];

const ColorList = () => {

  const dispatch = useDispatch();
  const [colId,setColId] = useState("")

  useEffect(()=>{
    dispatch(getColors());
  },[dispatch]);

  const colorState = useSelector((state)=>state.color.colors);
  const Tabledata = [];
  for(let i=0;i<colorState.length;i++){
    Tabledata.push({
      key:i+1,
      name:colorState[i].color,
      action: (
        <div className='text-lg flex gap-4'>
        <Link to={`/admin/color/${colorState[i]._id}`}><FaRegEdit /></Link>
          <button onClick={()=>{showModal(colorState[i]._id)}}><MdDelete /></button>
        </div>
      )
    })
  }

  const colState = useSelector((state)=>state.color)
  const {isSuccess,isError,isLoading,deletedColor}= colState;


  const [open, setOpen] = useState(false);
  const showModal = (id) => {
    setOpen(true);
    console.log(id);
    setColId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const perfomTask = ()=>{
          dispatch(deleteColor(colId))
          setOpen(false);
          setTimeout(()=>{
            dispatch(getColors())
          },1000)

  }





  useEffect(()=>{

    if(isSuccess && deletedColor?._id){
        toast.success("Deleted Color Successfully")
    }
    if(isError){
        toast.error("Error Deleting Color, Please Try Again after some time")
    }

},[deletedColor])

  return (
    <div>
            <h3 className="mb-4 text-center text-3xl mx-2">Colors</h3>

      <div>
      <Table columns={columns} dataSource={Tabledata} />
      <CustomModal title="Are you sure you want to delete this color?" open={open} perfomTask={perfomTask} showModal={showModal} hideModal={hideModal} />

      </div>
    </div>
  )
}

export default ColorList
