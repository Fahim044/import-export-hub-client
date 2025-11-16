import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';

const AuthLayout = () => {
    return (
        <>
        <div>
            <title>Authentication</title>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
        <ToastContainer></ToastContainer>
        </>
    );
};

export default AuthLayout;