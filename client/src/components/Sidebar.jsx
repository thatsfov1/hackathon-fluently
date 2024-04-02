import React from 'react'
import { Link } from "react-router-dom"
import { FaUser, FaDoorOpen } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { RiPencilFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";


export const Sidebar = ({ auth, onLogout}) => {
    return (
        <div className='fixed w-80 bg-red-500 h-screen p-6 flex flex-col lato-regular text-gray-50'>
            <div className="text-3xl font-bold">
                Fluently
            </div>
            <div className='flex flex-col gap-3 text-xl flex-1 mt-4'>
                <Link to="/">
                    <div className='sidebar-link'>
                        <FaHouse /> Home
                    </div>
                </Link>
                <Link to="/wordbank">
                    <div className='sidebar-link'>
                        <RiPencilFill /> Word Bank
                    </div>
                </Link>
                <Link to="/profile">
                    <div className='sidebar-link'>
                        <FaUser /> My Profile
                    </div>
                </Link>
            </div>
            <div className='text-lg'>
                <Link to="/settings">
                    <div className='sidebar-link'>
                        <IoMdSettings /> Settings
                    </div>
                </Link>
                {auth ? <div onClick={onLogout} className='sidebar-link cursor-pointer'>
                    <FaDoorOpen /> Sign out
                </div> : <Link to='/login' className='sidebar-link'>
                     Sign in
                    </Link>}
                
            </div>
        </div>
    )
}
