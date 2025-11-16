import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';

const AddProducts = () => {
    const {user}=useContext(AuthContext);
    const handleExportProducts=(e)=>{
        e.preventDefault();
        const form=e.target;
        const name=form.name.value;
        const image=form.image.value;
        const price=form.price.value;
        const originCountry=form.originCountry.value;
        const rating=form.rating.value;
        const availableQuantity=form.availableQuantity.value;
        const newProduct={
            name:name,
            image:image,
            price:price,
            originCountry:originCountry,
            rating:rating,
            availableQuantity:parseInt(availableQuantity),
            exporterEmail:user.email
        };
        fetch('http://localhost:3000/products',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(newProduct)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log('after post ,data:',data);
            if(data.insertedId)
            {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Your Product has been Added",
                  showConfirmButton: false,
                  timer: 1500
                });
            }
        })
    }
    return (
        <div className='mx-auto w-11/12 py-4 flex flex-col justify-center items-center'>
           <h2 className='text-center text-3xl font-bold'>Add Your Products </h2>
           <form onSubmit={handleExportProducts} className='md:w-70 '>
            <fieldset className="fieldset ">
            <label className="label">Name</label>
          <input name='name' type="text" className="input" placeholder="Name" required />
          <label className="label">Image URL</label>
          <input name='image' type="text" className="input" placeholder="Product Image URL" required />
          <label className="label">Price</label>
          <input name='price' type="text" className="input" placeholder="Price" required />
          <label className="label">Origin Country</label>
          <input name='originCountry' type="text" className="input" placeholder="Origin Country" required />
          <label className="label">Rating</label>
          <input name='rating' type="text" className="input" placeholder="Rating" required />
          <label className="label">Available Quantity</label>
          <input name='availableQuantity' type="text" className="input" placeholder="Available Quantity" required />
          <button className='bg-purple-200 font-bold text-purple-800 btn text-lg'>Add Export/Product</button>
          </fieldset>
           </form>
        </div>
    );
};

export default AddProducts;