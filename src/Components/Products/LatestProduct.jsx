import React, { use } from 'react';
import Product from './Product';

const LatestProduct = ({products}) => {
    // const products=use(latestProductsPromise);
    
    return (
        <div className='mx-auto'>
            <h1 className='text-center font-bold text-3xl my-8'>Latest Products</h1>
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto'>
                {
            products.map(product=><Product key={product._id} product={product}></Product>)
            }
            </div>
        </div>
    );
};

export default LatestProduct;