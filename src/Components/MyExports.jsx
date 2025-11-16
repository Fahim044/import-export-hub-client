import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';

const MyExports = () => {
    const {user}=useContext(AuthContext);
    const [exports,setExports]=useState([]);
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
    return (
        <div className='w-11/12 mx-auto py-4'>
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
        <th><button className='btn btn-outline'>Update</button></th>
      </tr>)
      }
      
      
      
    </tbody>
    
  </table>
</div>
        </div>
    );
};

export default MyExports;