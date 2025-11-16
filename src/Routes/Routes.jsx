import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Home from "../Components/Home";
import AuthLayout from "../Layouts/AuthLayout";
import PrivateRoute from "../Auth/PrivateRoute";
import AllProducts from "../Components/Products/AllProducts";
import Loading from "../Components/Loading";
import ProductDetails from "../Components/Products/ProductDetails";


export const router=createBrowserRouter([
    {
        path:"/",
        element:<HomeLayout></HomeLayout>,
        children:[
            {
                index:true,
                element:<Home></Home>
            },
            
            
            {
                path:"/allProducts",
                element:<AllProducts></AllProducts>,
                loader:()=>fetch('http://localhost:3000/products'),
                hydrateFallbackElement:<Loading></Loading>
            },
            {
                path:"/myExport",
                element:<PrivateRoute>
                    <p>My Export</p>
                </PrivateRoute>
            },
            {
                path:"/myImport",
                element:<PrivateRoute>
                    <p>My Import</p>
                </PrivateRoute>
            },
            {
                path:"/addProducts",
                element:<PrivateRoute>
                    <p>add Products</p>
                </PrivateRoute>
            },
            {
                path:'/productDetails/:id',
                element:<PrivateRoute>
                    <ProductDetails></ProductDetails>
                </PrivateRoute>,
                loader:({params})=>fetch(`http://localhost:3000/products/${params.id}`),
                hydrateFallbackElement:<Loading></Loading>
            },
            {
                path:"/*",
                element:<p>Error 404</p>
            },

        ]
    },
    {
        path:'/auth',
        element:<AuthLayout></AuthLayout>,
        children:[
            {
                path:"/auth/login",
                element:<Login></Login>
            },
            {
                path:"/auth/register",
                element:<Register></Register>
            },
            
        ]
    }
])