import React, { Suspense } from 'react';
import LatestProduct from './Products/LatestProduct';
import Loading from './Loading';
import { Link } from 'react-router';
const latestProductsPromise=fetch('https://import-export-hub-server-theta.vercel.app/latest-products').then(res=>res.json());
const Home = () => {
    return (
        <>
        <div className='text-center flex flex-col  bg-purple-300 justify-center gap-9 mx-auto p-4'>
            <title>import-export-hub-Home</title>
            <h1 className='text-purple-800 font-bold text-5xl md:max-w-2/5 mx-auto'>Import and Export Your Products</h1>
            <p className='text-gray-900 font-semibold md:max-w-2/5 mx-auto'>A modern web platform where users can manage exports, browse global products, and import any product into their personal "My Imports" section with one click. Clean UI, real-time sync, and secure user data.</p>

        </div>
        <div>
            
           <Suspense fallback={<Loading></Loading>}>
             <LatestProduct latestProductsPromise={latestProductsPromise}></LatestProduct>
           </Suspense>
        </div>
        <section className='w-11/12 mx-auto py-5'>
            <h2 className='text-3xl font-bold text-center my-4'>Functionalities</h2>
            <div className='space-y-5'>
                <p className='border border-purple-800 p-5 rounded-xl text-center text-lg'>You can register to our Website using register button.</p>
                <p className='border border-purple-800 p-5 rounded-xl text-center text-lg'>A logged In person can go to the product details page.</p>
                <p className='border border-purple-800 p-5 rounded-xl text-center text-lg'>In the product details page,an Importer can Import that product,which will be shown in "My Imports" page.</p>
               
                <p className='border border-purple-800 p-5 rounded-xl text-center text-lg'>An Exporter can also export /add products,which will be shown in "My Exports" page.</p>
                 <p className='border border-purple-800 p-5 rounded-xl text-center text-lg'>In "My Imports" or "My Exports" page,here,you will be able to remove or delete a product </p>
            </div>
        </section>
<h2 className='text-center font-bold text-3xl my-5'>Are You Ready?</h2>
        <section className='border border-purple-800 p-10 w-11/12 mt-10 mx-auto my-5 space-y-4'>
        
            <h2 className='text-center font-bold text-3xl'>Join With Us and Start Your Planning</h2>
            <Link to="/auth/register" className='btn bg-purple-200 text-purple-800 font-bold text-2xl rounded mx-auto justify-center flex py-8'>Get Started</Link>
        </section>
        </>
    );
};

export default Home;