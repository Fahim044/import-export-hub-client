import { Copyright } from 'lucide-react';
import React from 'react';
import youtIcon from '../assets/youtube.svg';
import fbIcon from '../assets/fb.png';
import instaIcon from '../assets/instagram.svg';
import prodIcon from '../assets/productIcon.png';
import { NavLink } from 'react-router';
const Footer = () => {
    return (
        <div className=' items-center flex flex-col md:flex-row justify-evenly bg-purple-400 text-black'>
            <div>
                <div className='flex items-center gap-6 md:flex-row flex-col'>
                    <img src={prodIcon} alt="" />
            <div>
                <h2 className='text-2xl font-bold'>IMPORT-EXPORT-HUB</h2>
                <h2 className='font-bold'>Contact Info</h2>
            <p>Uttara,Dhaka</p>
            </div>
                </div>
            </div>
            <div className='space-y-3'>
                <h2 className='font-bold'>Find Us On</h2>
            <NavLink className='flex gap-2'>
                <img className='w-5  h-5' src={fbIcon} alt="" />
                <p>Facebook</p>
                </NavLink>
            <NavLink className='flex gap-2'>
                <img src={youtIcon} alt="" />
                <p>Youtube</p>
                </NavLink>
            <NavLink className='flex gap-2'>
                <img src={instaIcon} alt="" />
                <p>Instagram</p>
                </NavLink>
                <p className='flex gap-2 mt-3'><Copyright /> All Rights Reserved</p>
            </div>
            

        </div>
    );
};

export default Footer;