import React from 'react';
import { useLoaderData } from 'react-router';
import Product from './Product';
const AllProducts = () => {
    const products=useLoaderData();
    // console.log(products);
    return (
        <div>
            <h1 className='text-center font-bold text-4xl my-8'>All Products</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto'>
                {
            products.map(product=><Product key={product._id} product={product}></Product>)
            }
            </div>
        </div>
    );
};

export default AllProducts;