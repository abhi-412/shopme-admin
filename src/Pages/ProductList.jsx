import React, { useEffect } from 'react'
import { Space, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProducts, resetState } from '../features/product/productSlice';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const columns = [
    {
      title: 'SNo.',
      dataIndex: 'key',
    },
    {
      title: 'Product',
      dataIndex: 'name',
      defaultSortOrder:"descend",
      sorter:(a,b)=>a.name?.slice(0,1)?.charCodeAt() - b.name?.slice(0,1)?.charCodeAt()
    },
    {
      title: 'Price($)',
      dataIndex: 'price',
      defaultSortOrder:"ascend",
      sorter:(a,b)=>a.price - b.price
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      defaultSortOrder:"descend",
      sorter:(a,b)=>a.brand?.slice(0,1)?.charCodeAt() - b.brand?.slice(0,1)?.charCodeAt()
    },
    {
      title: 'Color',
      dataIndex: 'color',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      defaultSortOrder:"descend",
      sorter:(a,b)=>a.category?.slice(0,1)?.charCodeAt() - b.category?.slice(0,1)?.charCodeAt()
    },
    {
      title: 'Action',
      dataIndex: 'action',
    }
    
  ];
  
  


const ProductList = () => {

const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getProducts());
  },[]);
const products = useSelector((state)=>state.product?.products?.products);
const Tabledata = [];


const handleDelete = (id)=>{
  dispatch(deleteProduct(id));
}

  
for(let i=0;i<products?.length;i++){
  Tabledata.push({
    key:i+1,
    name:products[i].title?.length > 20 ? products[i].title.slice(0,20) + "..." : products[i].title,
    price: products[i].price,
    category:products[i].category,
    brand:products[i].brand,
    color:products[i].color.length > 0 ? (products[i].color[0].color):  " All",
    action: (
      <div className='text-lg flex gap-4'>
      <Link to={`/admin/products/${products[i]._id}`}><FaRegEdit /></Link>
      <button onClick={()=>{handleDelete(products[i]._id)}}><MdDelete /></button>

      
      </div>
    )
  })
}

const deletedProductState = useSelector((state)=>state.product);

const {isSuccess,isError,isLoading,deletedProduct }= deletedProductState;


useEffect(()=>{
  if(isSuccess && deletedProduct?._id){
    toast.success("Deleted Product Successfully")
  }
  if(isError){
      toast.error("Error Deleting Product, Please Try Again after some time")
  }
  dispatch(resetState());
  dispatch(getProducts())
},[])


  return (
    <div>
      <div className='flex mb-4 items-center justify-between'>
        <h3 className="lg:text-4xl md:text-3xl text-xl lg:10/12 w-1/2 md:w-10/12 text-center">Product List</h3>
        <div className='flex justify-end'>
        <Link to={'/admin/product'} className='bg-yellow-600 lg:px-3 px-2 md:text-md lg:text-md text-xs rounded-none text-white font-semibold py-2 hover:bg-yellow-400 border-0 hover:text-gray-600'>Add Product</Link>
        </div>
      </div>
      <div>
      <div className="table-container">
        <Table columns={columns} dataSource={Tabledata} />
      </div>

      </div>
    </div>
  )
}

export default ProductList
