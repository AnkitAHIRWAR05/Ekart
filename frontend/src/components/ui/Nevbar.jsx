import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./button";
import axios from "axios";
import { toast } from "sonner";

const Navbar = () => {
  const user = true;
  const accessToken = localStorage.getItem('accessToken')

  const logoutHandler = async()=>{
    try {
        const res = await axios.post(`http://localhost:8000/api/v1/user/logout`,{},{
            headers:{
                Authorization:`beare ${accessToken}`
            }
        })
        if(res.data.success){
            toast.success(res.data.message)
        }
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <header className="bg-pink-50 fixed top-0 w-full z-20 border-b border-pink-200">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center py-2 px-8">
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
          <span className="text-red-500 text-xl font-bold">•</span>
        </div>

        {/* Right Section: Nav links + Cart */}
        <div className="flex items-center gap-8 text-lg font-medium text-gray-800">
          <Link to="/" className="hover:text-pink-600 transition">
            Home
          </Link>
          <Link to="/products" className="hover:text-pink-600 transition">
            Products
          </Link>
          {user && (
            <Link to="/profile" className="hover:text-pink-600 transition">
              Hello User
            </Link>
          )}

          {/* Cart Icon */}
          <Link to="/cart" className="relative hover:scale-110 transition">
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-semibold rounded-full px-[6px]">
              0
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
            user ? <Button className='bg-pink-600 text-white cursor-pointer'>Logout</Button>:
            <Button className=' bg-gradient-to-tl from-blue-600 to-purple-600 text-white cursor-pointer'>Login</Button>
          }
        </div>
      </div>
    </header>
  );
};

export default Navbar;
