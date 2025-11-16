import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';

const MyExports = () => {
    const {user}=useContext(AuthContext);
    const [exports,setExports]=useState([]);
    const [selectedProduct,setSelectedProduct]=useState(null);
    useEffect(()=>{
        fetch(`http://localhost:3000/products?email=${user.email}`)
        .then(res=>res.json())
        .then(data=>{
            console.log('My exported Data:',data)
            setExports(data);
        })
    },[user])
    const handleDeleteProduct=(_id)=>{
        Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    fetch(`http://localhost:3000/products/${_id}`,{
        method:'DELETE'
    })
    .then(res=>res.json())
    .then(data=>{
        console.log('after delete,data:',data);
        const remainingExports=exports.filter(product=>product._id!==_id);
        setExports(remainingExports);
        Swal.fire({
      title: "Deleted!",
      text: "Your Product has been deleted.",
      icon: "success"
    });
    })
    
  }
});
    }
    const modalRef=useRef(null);
    const handleModalOpen=(eachExport)=>{
        setSelectedProduct(null);
        setTimeout(()=>{
            setSelectedProduct(eachExport);
            modalRef.current.showModal();
        },0)
    }
    const handleModalSubmit=(e)=>{
        e.preventDefault();
        const form=e.target;
        const name=form.name.value;
        const image=form.image.value;
        const price=form.price.value;
        const originCountry=form.originCountry.value;
        const rating=form.rating.value;
        const availableQuantity=form.availableQuantity.value;
        console.log(name,image,price,originCountry,rating,availableQuantity);
        const updatedProduct={
            name:name,
image:image,
price:price,
originCountry:originCountry,
rating:rating,
availableQuantity:availableQuantity,
        };
        // console.log(selectedProduct._id);
        fetch(`http://localhost:3000/products/${selectedProduct._id}`,{
            method:'PATCH',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(updatedProduct)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log('after update:',data);
            if(data.modifiedCount)
            {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Product Updated",
                  showConfirmButton: false,
                  timer: 1500
                });
                modalRef.current.close();
                const restExports=exports.filter(prod=>prod._id!==selectedProduct._id);
                const update={...updatedProduct,_id:selectedProduct._id};
                const newExports=[...restExports,update];
                setExports(newExports);
            }
        })
    }
    return (
        <div className='w-11/12 mx-auto py-4'>
            <title>My Exports</title>
            <h2 className='text-center text-3xl font-bold '>My Exports : {exports.length}</h2>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          Sl No.
        </th>
        <th>Product Image & Name</th>
        <th>Price</th>
        <th>Rating</th>
        <th>Origin Country</th>
        <th>Available Quantity</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        exports.map((eachExport,index)=><tr key={eachExport._id}>
        <th>
          {index+1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={eachExport.image}
                  alt="Product Image" />
              </div>
            </div>
            <div>
              <div className="font-bold">{eachExport.name}</div>
              
            </div>
          </div>
        </td>
        <td>{eachExport.price}</td>
        <td>{eachExport.rating}</td>
        <td>{eachExport.originCountry}</td>
        <td>{eachExport.availableQuantity}</td>
        <th><button onClick={()=>handleDeleteProduct(eachExport._id)} className='btn btn-outline'>Delete</button></th>
        <th><button onClick={()=>handleModalOpen(eachExport)} className='btn btn-outline'>Update</button></th>
        
      </tr>)
      }
      
      
      
    </tbody>
    
  </table>
  <dialog ref={modalRef} id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    {
        selectedProduct && (
            <form onSubmit={handleModalSubmit} >
        <p className='text-lg text-center font-bold'>Update Your Product</p>
            <fieldset className="fieldset ">
            <label className="label">Name</label>
          <input name='name' defaultValue={selectedProduct.name} type="text" className="input w-full" placeholder="Name" required />
          <label className="label">Image URL</label>
          <input name='image' defaultValue={selectedProduct.image} type="text" className="input w-full" placeholder="Product Image URL" required />
          <label className="label">Price</label>
          <input name='price' defaultValue={selectedProduct.price} type="text" className="input w-full" placeholder="Price" required />
          <label className="label">Origin Country</label>
          <input name='originCountry' defaultValue={selectedProduct.originCountry} type="text" className="input w-full" placeholder="Origin Country" required />
          <label className="label">Rating</label>
          <input name='rating' defaultValue={selectedProduct.rating} type="text" className="input w-full" placeholder="Rating" required />
          <label className="label">Available Quantity</label>
          <input name='availableQuantity' defaultValue={selectedProduct.availableQuantity} type="text" className="input w-full" placeholder="Available Quantity" required />
          <button className='bg-purple-200 font-bold text-purple-800 btn text-lg'>Update</button>
          </fieldset>
           </form>
        )
    }
    <div className="modal-action">
      <form method="dialog"  >
        {/* if there is a button in form, it will close the modal */}
        {/* onSubmit={()=>setSelectedProduct(null)} */}
        <button  className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
</div>
        </div>
    );
};

export default MyExports;