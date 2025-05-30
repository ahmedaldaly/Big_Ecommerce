import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { BiUser } from 'react-icons/bi';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { BsBox2Heart } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { CiLogout } from "react-icons/ci";

const SideBar = () => {
    const {i18n} = useTranslation();
    const Arabic = i18n.language ==='ar'
  return (
    <div className={`w-[208px] h-auto shadow-sm rounded-md p-1  absolute top-[172px] ${Arabic ?"right-10":"left-10"} border-1 border-gray-200`}>
        <Link to='/account/Personal-information'  className=' text-sm w-full h-[50px] border-b-1 hover:text-[#7016CD] border-gray-200 duration-300 flex items-center gap-2  p-2 rounded-sm hover:bg-[#F6EDFF]'>
        <BiUser className='text-xl'/>
        {Arabic ?'المعلومات الشخصية':'Personal information'}
        </Link>
        {/*  */}
        <Link to='/'  className=' w-full h-[50px] border-b-1 text-sm hover:text-[#7016CD] border-gray-200 duration-300 flex items-center gap-2  p-2 rounded-sm hover:bg-[#F6EDFF]'>
        <HiOutlineShoppingBag className='text-xl'/>
        {Arabic ?' الطلبات السابقة':'Previous Orders'}
        </Link>
        {/*  */}
        <Link to='/'  className=' w-full h-[50px] border-b-1 text-sm hover:text-[#7016CD] border-gray-200 duration-300 flex items-center gap-2  p-2 rounded-sm hover:bg-[#F6EDFF]'>
        <BsBox2Heart className='text-xl'/>
        {Arabic ?' املك براند':'Brand owner '}
        </Link>
        {/*  */}
        <Link to='/'  className=' w-full h-[50px] border-b-1 text-sm text-red-500 border-gray-200 duration-300 flex items-center gap-2  p-2 rounded-sm hover:bg-red-50'>
        {Arabic ?<CiLogout className='text-xl'/>: <IoIosLogOut className='text-xl'/>}
       
        {Arabic ?'تسجيل الخروج':'Log Out'}
        </Link>
    </div>
  )
}

export default SideBar