import React, { useContext, useRef, useState } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';

const ProductDetails = () => {
    const [exceed,setExceed]=useState(false);
    const [message,setMessage]=useState("");
    const [imports,setImports]=useState([]);
    const product=useLoaderData();
    const {user}=useContext(AuthContext);
    // console.log(product);
    const {_id,image,name,price,originCountry,rating,availableQuantity,description,createdAt}=product;
    // console.log(_id,image,name,price,originCountry,rating,availableQuantity,description,createdAt);
    const modalRef=useRef(null);
    const handleModalOpen=()=>{
        modalRef.current.showModal()
    }
    const handleModalSubmit=(e)=>{
        e.preventDefault();
        const form=e.target;
        const quantity=form.quantity.value;
        const newImport={
            productId:_id,
            importerEmail:user.email,
            name:name,
            image:image,
            price:price,
            rating:rating,
            originCountry:originCountry,
            importedQuantity:parseInt(quantity),
        };
        fetch('http://localhost:3000/imports',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(newImport)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log('After inserting or modified import:',data);
            if(data.insertedId)
            {
                modalRef.current.close();
                Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Product Imported",
  showConfirmButton: false,
  timer: 1500
});
           
            newImport._id=data.insertedId;
            const newImports=[...imports,newImport];
            setImports(newImports);
             }
            modalRef.current.close();
                Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Product Import Updated",
  showConfirmButton: false,
  timer: 1500
});
        })
    }
    const handleQuantity=(e)=>{
const currentGivenQuantity=e.target.value;
if(currentGivenQuantity>availableQuantity)
{
    setExceed(true);
    setMessage("Quantity exceeded");
}
else{
    setExceed(false);
    setMessage("");
}
    }
    return (
        <div className='w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 p-10'>
            <title>{`productDetails-${name}`}</title>
            {/* left side=>app image */}
            <div>
                <img className='w-60 h-60' src={image} alt="" />
            </div>
            {/* right side=>app info */}
            <div className='flex flex-col gap-4 text-xl'>
                <h3>Product Id: <span className='font-bold'>{_id}</span></h3>
                <p>Product Name: <span className='font-bold'>{name}</span></p>
                <p>Price: <span className='font-bold'>{price}</span></p>
                <p>Origin Country: <span className='font-bold'>{originCountry}</span></p>
                <p>Rating: <span className='font-bold'>{rating}</span></p>
<p>Created At: <span className='font-bold'>{createdAt && createdAt}</span></p>
                <p>Available Quantity: <span className='font-bold'>{availableQuantity}</span></p>
                <p>Description: <span className='font-bold'>{description && description}</span></p>
                <button onClick={handleModalOpen} className='btn bg-purple-200 font-bold text-lg text-purple-800'>Import Now</button>
                <dialog ref={modalRef} id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <form onSubmit={handleModalSubmit}>
        <fieldset className="fieldset">
            <p>You can not import more than the available quantity: {availableQuantity}</p>
          <label className="label">Quantity</label>
          <input name='quantity' onChange={handleQuantity} type="text" className="input" placeholder="Quantity" required/>
          {
            message && <p className='text-red-500 text-sm'>{message}</p>
          }
          
          <button disabled={exceed} className="btn btn-neutral mt-4">Submit</button>
        </fieldset>
    </form>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
            </div>
        </div>
    );
};

export default ProductDetails;