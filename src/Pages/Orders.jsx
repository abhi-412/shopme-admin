import React, { useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, updateOrderStatus } from '../features/auth/authSlice';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Orders = () => {

  const dispatch = useDispatch();
 const options = ["Proccessing",
  "Dispatched","Cancelled","Delivered","Cash on Delivery"]

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
      title: 'Order Total',
      dataIndex: 'price',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    }
  ];

  const handleUpdateStatus = (status,orderId) => {
    const data = {id:orderId , status:status}
    dispatch(updateOrderStatus(data));
      setTimeout(()=>{
          dispatch(getOrders());
      },600)
  };

  const orderState = useSelector((state) => state.auth.orders);
  const Tabledata = [];
  for (let i = 0; i < orderState.length; i++) {
    Tabledata.push({
      key: i + 1,
      name: (
        <Link
          className="underline hover:text-blue-500 hover:underline"
          to={`/admin/orders/${orderState[i]?.orderBy?._id}`}
        >
          {orderState[i]?.orderBy?.firstName + ' ' + orderState[i]?.orderBy?.lastName}
        </Link>
      ),
      product: (
        <ul className="p-2 w-full">
          {orderState[i]?.items?.map((p, i) => (
            <li key={i}>{p.product?.title?.length > 20 ? p.product?.title?.slice(0, 20) + '...' : p.product?.title}</li>
          ))}
        </ul>
      ),
      date: new Date(orderState[i]?.createdAt).toLocaleString(),
      price: `₹ ${orderState[i]?.totalAfterDiscount}`,
      status:  <select
      className={`p-2 rounded  cursor-pointer focus:outline-none ${orderState[i]?.orderStatus === "Delivered" ? "text-green-500 border border-green-600" : orderState[i]?.orderStatus === "Cancelled" ? "text-red-500 border border-red-600" : "text-yellow-500 border border-yellow-500"}`}
      onChange={(e) => handleUpdateStatus(e.target.value, orderState[i]?._id)}
      defaultValue={orderState?.orderStatus}
    >
      <option value={orderState[i]?.orderStatus} >{options.filter((status) => status === orderState[i]?.orderStatus)}</option>
      {options.filter(status=> status !== orderState[i]?.orderStatus).map((status) => <option key={status} value={status}>{status}</option>)}
    </select>,
    });
  }

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <div>
      <h3 className="text-center text-4xl mb-5">Orders</h3>
      <div className="table-container">
        <Table columns={columns} dataSource={Tabledata} />
      </div>
    </div>
  );
};

export default Orders;
