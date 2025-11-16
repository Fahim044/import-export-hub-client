import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import prodIcon from '../assets/productIcon.png';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { toast } from 'react-toastify';
import { LuSunMedium } from 'react-icons/lu';
import { MdDarkMode } from 'react-icons/md';
const Navbar = () => {
    const {user,logOut}=useContext(AuthContext);
    const [mode,setMode]=useState(true);
    useEffect(()=>{
      if(mode)
      {
        document.documentElement.setAttribute('data-theme','light');
      }
      else
      {
        document.documentElement.setAttribute('data-theme','dark');
      }
    },[mode]);
    const handleLogOut=()=>{
        logOut()
        .then(()=>{
            toast.success("Logged Out Successfully");
        })
        .catch((error)=>{
            toast.error(error.message);
        })
    }
    const links=<>
   
    <li><NavLink to="/allProducts">All Products</NavLink></li>
    <li><NavLink to="/myExports">My Exports</NavLink></li>
    <li><NavLink to="/myImports">My Imports</NavLink></li>
    <li><NavLink to="/addProducts">Add Export</NavLink></li>
        
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    <Link to="/" className='flex items-center'>
        <img className='w-15' src={prodIcon} alt="" />
    <p className=" text-xl  font-bold">IMPORT-EXPORT-HUB</p>
    </Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>
  <div className="navbar-end">
    <button onClick={()=>setMode(!mode)} className='btn'>
      {
      mode ?
      <LuSunMedium className='mr-5' />
      :
      <MdDarkMode className='mr-5'/>
    }
    </button>
    
    
    {
        user?
        <>
        <img className='w-10 h-10 object-cover mr-2 rounded-full' src={user.photoURL} alt="" />
        <Link onClick={handleLogOut} to="/" className="btn bg-purple-200 hover:opacity-90 text-purple-900 font-bold">LogOut</Link>
        </>
        :
        
        <>
        <Link to="/auth/login" className="btn bg-purple-200 hover:opacity-90 text-purple-900 font-bold mr-3">LogIn</Link>
    <Link to="/auth/register" className="btn bg-purple-200 hover:opacity-90 text-purple-900 font-bold">Register</Link>
        </>
    }
    
  </div>
</div>
    );
};

export default Navbar;