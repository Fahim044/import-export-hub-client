import React, { Suspense } from 'react';
import LatestProduct from './Products/LatestProduct';
import Loading from './Loading';
const latestProductsPromise=fetch('http://localhost:3000/latest-products').then(res=>res.json());
const Home = () => {
    return (
        <>
        <div className='text-center flex flex-col  bg-purple-300 justify-center gap-9 mx-auto p-4'>
            <h1 className='text-purple-800 font-bold text-5xl max-w-2/5 mx-auto'>Import and Export Your Products</h1>
            <p className='text-gray-900 font-semibold max-w-2/5 mx-auto'>A modern web platform where users can manage exports, browse global products, and import any product into their personal "My Imports" section with one click. Clean UI, real-time sync, and secure user data.</p>

        </div>
        <div>
            
           <Suspense fallback={<Loading></Loading>}>
             <LatestProduct latestProductsPromise={latestProductsPromise}></LatestProduct>
           </Suspense>
        </div>
        </>
    );
};

export default Home;