import DashboardCompare from "../Components/DashboardCompare"
import { BsArrowDownLeft,BsArrowUpRight } from 'react-icons/bs'
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker'

import { Space, Table, Tag } from 'antd';





let Items =[
  {
  icon:<BsArrowUpRight className="text-green-500"/>,
    tradeoff: 32,
    price:1100,
    comparedTo:"April 2023",
  },
  {
    icon:<BsArrowDownLeft className="text-red-400" />,
      tradeoff: 12,
      price:1100,
      comparedTo:"April 2023",
    },
    {
      icon:<BsArrowUpRight className="text-green-500"/>,
        tradeoff: 22,
        price:1100,
        comparedTo:"April 2023",
      },
]






const columns = [
  {
    title: 'SNo.',
    dataIndex: 'key',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (_, { status }) => (
      <>
        {status.map((status) => {
          let color = status.length > 5 ? 'geekblue' : 'green';
          if (status === 'cancelled') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={status}>
              {status.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Customer Name',
    dataIndex: 'name',
    
  },
  {
    title: 'Product',
    dataIndex: 'product',
  },
  {
    title: 'Price',
    dataIndex: 'price',
  }
  
];


const Tabledata = [
  {
    key: '1',
    name: 'John Brown',
    status: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    status: ['cancelled'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    status: ['cool', 'teacher'],
  },
];





import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
  },
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'],
  datasets: [
    {
      label: 'Sales',
        data: [12, 19, 3, 5, 2, 3,12,17,11,6,17,13],
        borderWidth: 1,
        backgroundColor: 'rgb(255, 220, 88)',
    },
  ],
};

const Dashboard = () => {
  return (
    <div>
      <h3 className="mb-4 font-bold text-3xl">Dashboard</h3>
      <div className="flex lg:justify-between items-center flex-wrap gap-3">
      {Items.map((item,i)=>{
        return <DashboardCompare key={i} item={item} />
      })}
      </div>

     

      <div className="mt-4 min-h-[60vh] min-w-full overflow-scroll">
        <h3 className="text-center font-bold text-xl">Income Statistics</h3>
       
        <Bar
          options={options} data={data}
          className="min-h-[60vh] min-w-full overflow-scroll md:max-h-[50vh]"
        />
        
      </div>
      <div className="mt-4">
        <h3  className="text-center mb-4 font-bold text-xl">Recent Orders</h3>
        <div>
        <Table columns={columns} dataSource={Tabledata} />
        </div>
      </div>

      
      <div className="mt-4">
        <h3  className="text-center mb-4 font-bold text-xl">Recent Reviews</h3>
        <div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
