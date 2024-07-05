import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom';
import { RiArrowDropDownLine } from "react-icons/ri";
import {AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineShopping,
  AiOutlineUser} from 'react-icons/ai';
  import img from './new-pic.jpg'

  import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

  import { BsFillQuestionSquareFill } from "react-icons/bs";

  import { MdOutlineCategory } from "react-icons/md";
  import { FaBlog,FaListOl } from "react-icons/fa";
  import { IoMdColorFill ,IoMdAddCircle, IoMdNotifications } from "react-icons/io";
  import { IoBagCheck } from "react-icons/io5";

  import { BiSolidCategory,BiSolidCoupon } from "react-icons/bi";

  import { SiBrandfolder } from "react-icons/si";
  import { CiViewList,CiDiscount1 } from "react-icons/ci";
  import { TiThListOutline } from "react-icons/ti";


import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

import { Layout, Menu, Button, theme, Dropdown } from 'antd';
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

      const navigate = useNavigate();

      const [isOpen, setIsOpen] = useState(false);
      const [selectedOption, setSelectedOption] = useState(null);
      const options = [
        { label: 'View Profile', link: '/' },
        { label: 'Sign Out', link: '/' },
        // { label: 'Option 3', link: '/option3' },
      ];
    
      const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };

      const handleSider = ()=>{
        const isMediumScreen = window.matchMedia('(min-width: 768px)');
        if (!isMediumScreen.matches && !collapsed) {
          setHideSider(!hideSider);
        }else{
          setHideSider(false);
          setCollapsed(!collapsed)
        }
      }
    
      const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
      };

      const [hideSider, setHideSider] = useState(false);


  return (
    <Layout /*onContextMenu={(e) => e.preventDefault()} */ className='min-h-screen'>
      <div hidden={hideSider} className='h-full'>
      <Sider trigger={null} className='min-h-[100vh]'  collapsible collapsed={collapsed}>
        <div className="logo bg-yellow-500 flex justify-center items-center cursor-text m-0 h-12" >
            <h2 className={` text-gray-500 py-3 font-bold ${collapsed ? "text-lg":"text-2xl"}`}>Shop Me {!collapsed && <span className='w-1/6 text-sm p-1 bg-white'>Admin</span>}</h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({key})=>{
            if(key !='signout'){
              navigate(key)
            }
        
          }}
          style={{fontSize:"16px"}}
          items={[
            {
              key: '',
              icon: <AiOutlineDashboard style={{fontSize:"18px"}} />,
              label: 'Dashboard',
            },
            {
              key: 'customers',
              icon: <AiOutlineUser style={{fontSize:"18px"}} />,
              label: 'Customers',
            },
            {
              key: 'catalogue',
              icon: <AiOutlineShopping style={{fontSize:"18px"}} />,
              label: 'Catalogue',
              children:[
                {
                  key: 'product',
                  icon: <AiOutlineShopping style={{fontSize:"18px"}} />,
                  label: 'Add Product',
                },
                {
                  key: 'product-list',
                  icon: <AiOutlineShoppingCart style={{fontSize:"18px"}} />,
                  label: 'Products List',
                },
                {
                  key: 'brand',
                  icon: <SiBrandfolder style={{fontSize:"18px"}} />,
                  label: 'Brands',
                },
                {
                  key: 'brands-list',
                  icon: <SiBrandfolder style={{fontSize:"18px"}} />,
                  label: 'Brands List',
                },
                {
                  key: 'category',
                  icon: <BiSolidCategory style={{fontSize:"18px"}} />,
                  label: 'Category',
                },
                {
                  key: 'list-category',
                  icon: <BiSolidCategory style={{fontSize:"18px"}} />,
                  label: 'Category List',
                },
                {
                  key: 'color',
                  icon: <IoMdColorFill style={{fontSize:"18px"}} />,
                  label: 'Color',
                },
                {
                  key: 'list-colors',
                  icon: <IoMdColorFill style={{fontSize:"18px"}} />,
                  label: 'Colors List',
                },
                
              ],
            },
            {
              key: 'orders',
              icon: <IoBagCheck style={{fontSize:"18px"}} />,
              label: 'Orders',
            },

            {
              key: 'marketing',
              icon: <CiDiscount1 style={{fontSize:"18px"}} />,
              label: 'Marketing',
              children:[
                  { 
                  key: 'add-coupon',
                  icon: <BiSolidCoupon style={{fontSize:"18px"}} />,
                  label: 'Add Coupon',
                },
                { 
                  key: 'coupon-list',
                  icon: <TiThListOutline style={{fontSize:"18px"}} />,
                  label: 'Coupon List',
                },
                
              ]
            },

            {
              key: 'blogs',
              icon: <FaBlog style={{fontSize:"18px"}} />,
              label: 'Blogs',
              children:[
                  { 
                  key: 'add-blog',
                  icon: <IoMdAddCircle style={{fontSize:"18px"}} />,
                  label: 'Add Blog',
                },
                { 
                  key: 'blog-list',
                  icon: <FaListOl style={{fontSize:"18px"}} />,
                  label: 'Blog List',
                },
                { 
                  key: 'blog-category',
                  icon: <MdOutlineCategory style={{fontSize:"18px"}} />,
                  label: 'Add Blog Category',
                },
                { 
                  key: 'blog-cat-list',
                  icon: <CiViewList style={{fontSize:"18px"}} />,
                  label: 'Blog Category List',
                },
              ]
            },

            
            { 
              key: 'enquiries',
              icon: <BsFillQuestionSquareFill style={{fontSize:"18px"}} />,
              label: 'Enquiries',
            },
          ]}
        />
      </Sider>
      </div>
      <Layout>
        <Header
          style={{
            background: colorBgContainer,
          }}
          className='flex justify-between px-3 pe-5'
        >
          <div className='flex items-center justify-center'>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined style={{fontSize:"25px"}} /> : <MenuFoldOutlined style={{fontSize:"25px"}} />}
              onClick={handleSider}
              style={{
                fontSize: '16px',
                width: 48,
                height: 48,
                padding:"0px"
              }}
              className='hover:border-1 hover:border-black'
            />
          </div>
          <div className='flex gap-5 items-center'>


             <div className="relative  inline-flex w-fit">
                <div
                  className="absolute right-0  -translate-y-1/2 translate-x-2/4  rounded-full bg-yellow-400 px-2 py-1 text-xs">2</div>
                <div
                  className="flex items-center justify-center rounded-lg text-center">
                  <IoMdNotifications className='text-2xl'/>
                </div>
              </div>
            <div className='flex gap-3 items-center'>
              <div className='h-full w-full'>
                <img className='w-14 h-12' src={img} alt="" />
              </div>
              <div className='flex flex-col gap-1'>
              <div className='flex flex-col'>
              <h5 className='text-lg font-semibold'>Abhay</h5>
              {/* <h6 className=' flex text-sm items-center'>abhay@gmail.com <span onClick={()=>{setDrop(!drop)}}><RiArrowDropDownLine className='text-3xl' /></span></h6> */}
                



                <div className="relative inline-block text-left">
                      <div className='flex items-center'>
                        <button
                          type="button"
                          onClick={toggleDropdown}
                          className="inline-flex justify-center rounded-md py-1 bg-white text-sm font-medium text-gray-700 border-0 hover:bg-gray-50 focus:outline-none"
                          id="options-menu"
                          aria-haspopup="true"
                          aria-expanded="true"
                        >
                          {selectedOption ? selectedOption.label : 'abhay@gmail.com'}
                          
                        </button>
                        <RiArrowDropDownLine className='text-3xl hover:bg-gray-100 focus:bg-gray-100 cursor-pointer' onClick={toggleDropdown}/>
                      </div>

                      {/* Dropdown panel */}
                      {isOpen && (
                        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                          <div
                            className="py-1"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="options-menu"
                          >
                            {options.map((option, index) => {
                              return <Link
                                    key={index}
                                    href={option.link}
                                    onClick={() => handleOptionSelect(option)}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    role="menuitem"
                                    >
                                    {option.label}
                                </Link>
                            })}
                          </div>
                        </div>
                      )}
                    </div>
              </div>
             
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <ToastContainer />
            <Outlet />
         
        </Content>
      </Layout>
    </Layout>

  )
}

export default MainLayout
