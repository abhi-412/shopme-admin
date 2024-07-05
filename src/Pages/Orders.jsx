import React, { useEffect } from 'react'
import { Space, Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../features/auth/authSlice';
import { Link, useLocation } from 'react-router-dom';




const columns = [
    {
      title: 'SNo.',
      dataIndex: 'key',
    },
    
    {
      title: 'Customer Name',
      dataIndex: 'name',
      
    },
    {
      title: 'Products',
      dataIndex: 'product',
    },
    {
      title: 'Order Date',
      dataIndex: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status ) => (
        <>
          <Tag color={status=="Delivered" ? "green" : status=="Cancelled" ? "red" : 'yellow'} key={status}>
            {status}
          </Tag>
        </>
      ),
    },
    {
      title: 'Order Total',
      dataIndex: 'price',
    }
    
  ];

const Orders = () => {

  

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getOrders());
  },[])

  const orderState = useSelector((state)=>state.auth.orders);
  const Tabledata = [];
  for(let i=0;i<orderState.length;i++){
    Tabledata.push({
      key:i+1,
      name:<Link to={`/admin/orders/${orderState[i]?.orderBy?._id}`}>{orderState[i]?.orderBy?.firstName + " " + orderState[i]?.orderBy?.lastName}</Link>,
      product:<ul>
        {orderState[i]?.products?.map((p,i)=>{
          return <li key={i}>{p.product?.title}</li>
      })}
      </ul>,
      date:new Date(orderState[i]?.createdAt).toLocaleString(),
      price:orderState[i]?.paymentIntent.amount,
      status:orderState[i]?.orderStatus
    })
  }

  return (
    <div>
      <h3 className="mp-4 text-center text-4xl mb-5">Orders</h3>
      <div>
      <Table columns={columns} dataSource={Tabledata} />
      </div>
    </div>
  )
}

export default Orders
