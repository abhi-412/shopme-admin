import React, { useEffect } from 'react'
import { Space, Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, getOrdersByUserId } from '../features/auth/authSlice';
import { useLocation } from 'react-router-dom';





const columns = [
    {
      title: 'SNo.',
      dataIndex: 'key',
    },
   
    {
      title: 'Product',
      dataIndex: 'product',
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
      },
    {
        title: 'Color',
        dataIndex: 'color',
    },
    {
      title: 'Quantity',
      dataIndex: 'qty',
    },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   render: (status ) => (
    //     <>
    //       <Tag color={status=="Delivered" ? "green" : status=="Cancelled" ? "red" : 'yellow'} key={status}>
    //         {status}
    //       </Tag>
    //     </>
    //   ),
    // },
    {
      title: 'Price',
      dataIndex: 'price',
    }
    
  ];

const ViewUserOrder = () => {

    const location = useLocation();
  const id = location.pathname.split('/')[3];

  const dispatch = useDispatch();
  useEffect(()=>{
    console.log(id);
    dispatch(getOrdersByUserId(id))
  },[id])

  const orderState = useSelector((state)=>state.auth.userOrder);
  const Tabledata = [];
  for(let i=0;i<orderState.length;i++){
    Tabledata.push({
      key:i+1,
      brand:orderState[i].product?.brand,
      product:orderState[i].product?.title,
      color:orderState[i].product?.color,
      price:orderState[i].product?.price,
      qty:orderState[i].count,
    //   status:orderState[i].orderStatus
    })
  }

  return (
    <div>
      <h3 className="mp-4 text-center text-4xl mb-5">User Orders</h3>
      <div>
      <Table columns={columns} dataSource={Tabledata} />
      </div>
    </div>
  )
}

export default ViewUserOrder;
