// import { useState } from 'react'
import MainLayout from './Components/MainLayout'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Login from './Pages/Login'
import ResetPassword from './Pages/ResetPassword'
import ForgotPassword from './Pages/ForgotPassword'
import './index.css'
import Enquiries from './Pages/Enquiries'
import Bloglist from './Pages/Bloglist'
import BlogCatList from './Pages/BlogCatList'
import Orders from './Pages/Orders'
import Customers from './Pages/Customers'
import BrandList from './Pages/BrandList'
import ColorList from './Pages/ColorList'
import CategoryList from './Pages/CategoryList'
import ProductList from './Pages/ProductList'
import AddBlog from './Pages/AddBlog'
import AddBlogCat from './Pages/AddBlogCat'
import AddColor from './Pages/AddColor'
import AddCategory from './Pages/AddCategory'
import AddBrand from './Pages/AddBrand'
import AddProduct from './Pages/AddProduct'
import AddCoupon from './Pages/AddCoupon'
import CouponList from './Pages/CouponList'
import ViewEnquiry from './Pages/ViewEnquiry'
import ViewUserOrder from './Pages/ViewUserOrders'

function App() {

  return (
    <Router>
      <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/reset-password' element={<ResetPassword />}/>
          <Route path='/forgot-password' element={<ForgotPassword />}/>
          <Route path='/admin' element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='enquiries' element={<Enquiries />} />
          <Route path='enquiry/:id' element={<ViewEnquiry />} />
          <Route path='blog-list' element={<Bloglist />} />
          <Route path='add-blog' element={<AddBlog />} />
          <Route path='blog/:id' element={<AddBlog />} />
          <Route path='blog-category' element={<AddBlogCat />} />
          <Route path='blog-category/:id' element={<AddBlogCat />} />
          <Route path='blog-cat-list' element={<BlogCatList />} />
          <Route path='orders' element={<Orders />} />
          <Route path='orders/:id' element={<ViewUserOrder />} />
          <Route path='customers' element={<Customers />} />
          <Route path='category' element={<AddCategory/>} />
          <Route path='category/:id' element={<AddCategory/>} />
          <Route path='list-category' element={<CategoryList />} />
          <Route path='color' element={<AddColor />} />
          <Route path='color/:id' element={<AddColor />} />
          <Route path='list-colors' element={<ColorList />} />
          <Route path='brands-list' element={<BrandList />} />
          <Route path='brand' element={<AddBrand />} />
          <Route path='brand/:id' element={<AddBrand />} />
          <Route path='product-list' element={<ProductList />} />
          <Route path='product' element={<AddProduct />} />
          <Route path='add-coupon' element={<AddCoupon />} />
          <Route path='coupon/:id' element={<AddCoupon />} />
          <Route path='coupon-list' element={<CouponList />} />
          </Route>
      </Routes>

    </Router>
  )
}

export default App
