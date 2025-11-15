import React from 'react';

const Product = ({product}) => {
    const {image,name,price,originCountry,rating,availableQuantity}=product;
    return (
        <div className="card bg-base-100 w-96 shadow-sm mx-auto">
  <figure className="">
    <img
      src={image}
      alt="image"
      className="rounded-xl w-full object-contain h-50" />
  </figure>
  <div className="card-body  text-left">
    <h2 className="card-title text-xl">{name}</h2>
    <p className='font-semibold text-lg'>Price:{price}</p>
    <p className='font-semibold text-lg'>Origin Country: {originCountry}</p>
    <p className='font-semibold text-lg'>Rating: {rating}</p>
    <p className='font-semibold text-lg'>Available Quantity: {availableQuantity}</p>
    <div className="card-actions">
      <button className="btn bg-purple-200 text-purple-800 font-semibold text-lg w-full">See Details</button>
    </div>
  </div>
</div>
    );
};

export default Product;