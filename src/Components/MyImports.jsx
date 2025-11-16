import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const MyImports = () => {
    const {user}=useContext(AuthContext);
    const [imports,setImports]=useState([]);
    useEffect(()=>{
        if(user?.email)
        {
            fetch(`http://localhost:3000/imports?email=${user.email}`)
            .then(res=>res.json())
            .then(data=>{
                // console.log(data);
                setImports(data);
            })
        }
    },[user])
    const handleRemoveImport=(eachImport)=>{
        Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, remove it!"
}).then((result) => {
  if (result.isConfirmed) {
    fetch(`http://localhost:3000/imports/${eachImport._id}`,{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(eachImport)
    })
    .then(res=>res.json())
    .then(data=>{
        console.log('after delete: ',data);
        const remainingImports=imports.filter(singleImport=>singleImport._id!==eachImport._id);
        setImports(remainingImports);
        Swal.fire({
      title: "Removed!",
      text: "Your Import has been Removed.",
      icon: "success"
    });
    })
    
  }
});
    }
    return (
        <div className='w-11/12 mx-auto py-5'>
           <h2 className='text-3xl font-bold text-center'>My Imports : {imports.length}</h2>
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
        <th>Imported Quantity</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        imports.map((eachImport,index)=><tr key={eachImport._id}>
        <th>
          {index+1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={eachImport.image}
                  alt="Product Image" />
              </div>
            </div>
            <div>
              <div className="font-bold">{eachImport.name}</div>
            
            </div>
          </div>
        </td>
        <td>{eachImport.price}</td>
        <td>{eachImport.rating}</td>
        <td>{eachImport.originCountry}</td>
        <td>{eachImport.importedQuantity}</td>
        <th><button onClick={()=>handleRemoveImport(eachImport)} className='btn btn-outline'>Remove</button></th>
        <th><Link to={`/productDetails/${eachImport.productId}`} className='btn btn-outline'>See Details</Link></th>
      </tr>)
      }
      
      
      
    </tbody>
    
  </table>
</div>
        </div>
    );
};

export default MyImports;