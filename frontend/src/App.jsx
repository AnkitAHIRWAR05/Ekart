import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import  Nevbar  from './components/ui/Nevbar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Verify from './pages/Verify'
import VerifyEmail from './pages/VerifyEmail'
import Footer from './components/Footer'
import Profile from './pages/Profile'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Dashboard from './pages/Dashboard'
import AdminSales from './pages/admin/AdminSales'
import AddProduct from './pages/admin/AddProduct'
import AdminOrders from './pages/admin/AdminOrders'
import ShowUserOrders from './pages/admin/ShowUserOrders'
import AdminUsers from './pages/admin/AdminUsers'
import UserInfo from './pages/admin/UserInfo'
import ProtectedRoute from './components/ProtectedRoute'
import SingleProduct from './pages/SingleProduct'
import Navbar from './components/ui/Nevbar'
import AdminProduct from './pages/admin/AdminProduct'
import AddressForm from './pages/AddressForm'
import OrderSuccess from './pages/OrderSuccess'

const router  = createBrowserRouter([
  {
    path:'/',
    element:<><Nevbar/><Home/><Footer/></>
  },
    {
    path:'/signup',
    element:<><Signup/></>
  },
   {
    path:'/login',
    element:<><Login/></>
  },
  {
    path:'/verify',
    element:<><Verify/></>
  },
  {
    path:'/verify/:token',
    element:<><VerifyEmail/></>
  },
   {
    path:'/profile/:userId',
    element:<ProtectedRoute><Nevbar/><Profile/></ProtectedRoute>
  },
  {
    path:'/products',
    element:<><Nevbar/><Products/></>
  },
   {
    path:'/products/:id',
    element:<><Nevbar/><SingleProduct/></>
  },
    {
    path:'/cart',
    element:<ProtectedRoute><Nevbar/><Cart/></ProtectedRoute>
  },
   {
    path:'/address',
    element:<ProtectedRoute><AddressForm/></ProtectedRoute>
  },
   {
    path:'/order-success',
    element:<ProtectedRoute><OrderSuccess/></ProtectedRoute>
  },
   {
    path:'/dashboard',
    element:<ProtectedRoute adminOnly={true}><Navbar/><Dashboard/></ProtectedRoute>,
    children:[
      {
        path:"sales",
        element:<AdminSales/>
      },
      {
        path:"add-product",
        element:<AddProduct/>
      },
       {
        path:"products",
        element:<AdminProduct/>
      },
      {
        path:"orders",
        element:<AdminOrders/>
      },
      {
        path:"users/orders/:userId",
        element:<ShowUserOrders/>
      },
      {
        path:"users",
        element:<AdminUsers/>
      },
      {
        path:"users/:id",
        element:<UserInfo/>
      }

    ]
  }
])
const App = () => {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
