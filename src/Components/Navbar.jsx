import React from 'react';
import { Link, NavLink } from 'react-router';
import prodIcon from '../assets/productIcon.png';
const Navbar = () => {
    const links=<>
   
    <li><NavLink to="/allProducts">All Products</NavLink></li>
    <li><NavLink to="/myExport">My Exports</NavLink></li>
    <li><NavLink to="/myImport">My Imports</NavLink></li>
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
    <a className=" text-xl">IMPORT-EXPORT-HUB</a>
    </Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>
  <div className="navbar-end">
    <Link to="/login" className="btn">LogIn</Link>
    <Link to="/register" className="btn">Register</Link>
  </div>
</div>
    );
};

export default Navbar;