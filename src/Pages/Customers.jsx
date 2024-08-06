import React, { useEffect } from 'react'
import { Space, Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../features/customers/customerSlice';



const columns = [
    {
      title: 'SNo.',
      dataIndex: 'key',
    },
    
    {
      title: 'Customer Name',
      dataIndex: 'name',
      defaultSortOrder:"descend",
      sorter:(a,b)=>a.name?.toLowerCase()?.slice(0,1)?.charCodeAt() - b.name?.toLowerCase()?.slice(0,1)?.charCodeAt()
      
    },
    {
      title: 'Mobile',
      dataIndex: "phone"
    },
    {
      title: 'Email',
      dataIndex: "email"
    },
  ];
  





const Customers = () => {

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getUsers());
  },[dispatch])

  const customerstate = useSelector((state)=>state.customer.customers);
  const Tabledata = [];
  for(let i=0;i<customerstate.length; i++){
    if(customerstate[i].role !== "admin"){
      Tabledata.push({
        key:i+1,
        name: customerstate[i].firstName.charAt(0).toUpperCase() + customerstate[i].firstName.slice(1) + " " + customerstate[i].lastName,
        email: customerstate[i].email,
        phone: customerstate[i].mobile,
      })
    }
  }


  return (
    <div>
            <h3 className="mb-4 text-center text-3xl mx-2">Customers</h3>

      <div>
      <div className="table-container">
        <Table columns={columns} dataSource={Tabledata} />
      </div>

      </div>
    </div>
  )
}

export default Customers
