import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import Product from './Product';
import Search from '../Search';
const AllProducts = () => {
    const allProducts=useLoaderData();
    const [search,setSearch]=useState("");
    const handleSearch=(e)=>{
        const inputValue=e.target.value;
        const searchValue=inputValue.trim().toLowerCase();
        setSearch(searchValue);
    }
    const filteredProducts=allProducts.filter(prod=>prod.name.toLowerCase().includes(search));
    const products=search?filteredProducts:allProducts;
    return (
        <div>
            <title>All Products</title>
            <h1 className='text-center font-bold text-4xl my-8'>All Products</h1>
            <div className='justify-end flex my-3'>
                <Search handleSearch={handleSearch}></Search>
            </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto'>
                {
            products.map(product=><Product key={product._id} product={product}></Product>)
            }
            </div>
        </div>
    );
};

export default AllProducts;