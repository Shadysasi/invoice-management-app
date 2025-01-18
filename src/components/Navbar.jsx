import React, { useState } from 'react'
import { NavLink,useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';



const Navbar = () => {
    const [navBar,setNavBar] = useState(false)
    const navigate = useNavigate()
    
  return (
    <nav className='bg-violet-600 flex justify-between items-center h-full w-full mx-auto px-4 text-white'>
        <h1 className='text-xl md:text-3xl font-bold text-[%00df9a]'>Invoice Management</h1>
        {/* Desktop Navigation */}
        <ul className='hidden md:flex'>
            <li className='p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black'>
                <NavLink to='/home'>Home</NavLink>
            </li>
            <li className='p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black'>
                <NavLink to='/invoice-form'>Create Invoice</NavLink>
            </li>
            <li className='p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black'
                onClick={()=>navigate('/login')}>
                    Logout
            </li>
        </ul>

        {/* Mobile Navigation Menu */}
        <div 
          onClick={()=>setNavBar(!navBar)}
          className={`z-[999] ${navBar ? "text-gray-900" : "text-gray-100"} text-3xl md:hidden m-5`}>
          {navBar ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        <div className={`md:hidden text-gray-900 absolute w-1/3
            px-7 py-2 font-medium bg-white top-0 duration-300 ${
            navBar ? 'right-0' : 'right-[-100%]'}`}>
          <ul className='flex flex-col justify-center h-full gap-6 py-2 text-lg'>
            <li onClick={()=>navigate('/home')} className='hover:text-cyan-600'>
                  Home
            </li>
            <li onClick={()=>navigate('/invoice-form')} className='hover:text-cyan-600'>
                  Create Invoice
            </li>
            <li onClick={()=>navigate('/login')} className='hover:text-cyan-600'>
                  Logout
            </li>
          </ul>
        </div>
        
        
        
    </nav>
  )
}

export default Navbar