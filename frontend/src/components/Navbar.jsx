import React from 'react'
import { Link } from 'react-router-dom'



import { MdOutlineDashboard } from "react-icons/md";
import { FcMoneyTransfer } from "react-icons/fc";
import { MdOutlineAccountBalanceWallet} from "react-icons/md";
import { SiWebmoney } from "react-icons/si";
import { FcViewDetails } from "react-icons/fc";
import { FcAbout } from "react-icons/fc";

function Navbar() {
  return (
    <div className='flex flex-col gap-5 bg-white  h-screen w-64 rounded-b-md p-4'>
  <div >
  
  <Link to={"/"} className="text-2xl text-[rgb(66,94,189)] font-bold flex flex-row justify-center h-full  gap-2  p-2 rounded-2xl">
 
 <SiWebmoney  className="text-[rgb(66,94,189)] text-4xl font-bold" />
 
     MyMoney 
     
 </Link>
      </div>


      <div className='flex gap-2 items-center text-2xl font-bold text-[rgb(70,72,78)] mb-2 mx-2 mt-12  w-60'>
      <MdOutlineDashboard /> <Link to="/">Dashboard</Link>
       </div>
      <div className='flex gap-2 items-center text-2xl font-bold text-[rgb(70,72,78)] mb-4 mx-2 mt-12  w-60'>
        <FcMoneyTransfer />
         <Link to="/transactions">Transactions</Link></div>
      <div className='flex gap-2 items-center text-2xl font-bold text-[rgb(70,72,78)] mb-4 mx-2 mt-12  w-60'>
        <MdOutlineAccountBalanceWallet />
         <Link to="/balance">Balance</Link></div>
      <div className='flex gap-2 items-center text-2xl font-bold text-[rgb(70,72,78)] mb-4 mx-2 mt-12  w-60'>
        <FcViewDetails />
         <Link to="/signup">Signup</Link></div>
      <div className='flex gap-2 items-center text-2xl font-bold text-[rgb(70,72,78)] mb-4 mx-2 mt-12  w-60'> 
        <FcAbout />
        <Link to="/about">About Us</Link></div>
    </div>
  )
}

export default Navbar
