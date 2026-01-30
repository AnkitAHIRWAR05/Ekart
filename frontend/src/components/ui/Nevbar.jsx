import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { Button } from "./button";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/userSlice";

const Navbar = () => {
  const {user}= useSelector(store =>store.user)
  const {cart} = useSelector(store =>store.product)
  const accessToken = localStorage.getItem('accessToken')
  const admin = user?.role ==="admin" ? true :false
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async()=>{
    try {
        const res = await axios.post(`http://localhost:8000/api/v1/user/logout`,{},{
            headers:{
                Authorization:`bearer ${accessToken}`
            }
        })
        if(res.data.success){
          dispatch(setUser(null))
            toast.success(res.data.message)
        }
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <header className="bg-pink-50 fixed top-0 w-full z-20 border-b border-pink-200">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center -py-10 px-5">
        {/* Left Section: Logo */}
        <div className="flex items-center gap-1">
          <img
            src="/e.png"
            alt="logo"
            className="w-[60px] h-[60px] object-contain"
          />
          <h1 className="text-2xl font-bold text-pink-600 -ml-4 -mt-1 ">KART</h1>
        </div>

        {/* Middle: Spacer (for center alignment look) */}
        <div className="flex-1 flex justify-center">
          <span className="text-red-500 text-xl font-bold"></span>
        </div>

        {/* Right Section: Nav links + Cart */}
        <div className="flex items-center gap-8 text-lg font-medium text-gray-800">
          <Link to={"/"} >
            Home
          </Link>
          <Link to={"/products"}>
            Products
          </Link>
          {user && 
            <Link to={`/profile/${user._id}`} >
             Hello,{user.firstName}
            </Link>
          }
          {admin && 
            <Link to={`/dashboard/sales`}>
              Dashboard
            </Link>
          }

          {/* Cart Icon */}
          <Link to={"/cart"} className="relative hover:scale-110 transition">
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-semibold rounded-full px-[6px]">
              {cart?.items?.length}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="w-7 h-7 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13l-1.5-7M7 13L5.4 5M17 21a1 1 0 100-2 1 1 0 000 2zm-10 0a1 1 0 100-2 1 1 0 000 2z"
              />
            </svg>
          </Link>
          {
            user ? <Button onClick={logoutHandler} className='bg-pink-600 text-white cursor-pointer'>Logout</Button>:
            <Button onClick={()=>navigate('/login')} className=' bg-gradient-to-tl from-blue-600 to-purple-600 text-white cursor-pointer'>Login</Button>
          }
        </div>
      </div>
    </header>
  );
};

export default Navbar;
