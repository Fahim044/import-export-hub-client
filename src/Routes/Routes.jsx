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
import MyImports from "../Components/MyImports";
import AddProducts from "../Components/AddProducts";
import MyExports from "../Components/MyExports";


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
                loader:()=>fetch('https://import-export-hub-server-theta.vercel.app/products'),
                hydrateFallbackElement:<Loading></Loading>
            },
            {
                path:"/myExports",
                element:<PrivateRoute>
                    <MyExports></MyExports>
                </PrivateRoute>
            },
            {
                path:"/myImports",
                element:<PrivateRoute>
                    <MyImports></MyImports>
                </PrivateRoute>
            },
            {
                path:"/addProducts",
                element:<PrivateRoute>
                    <AddProducts></AddProducts>
                </PrivateRoute>
            },
            {
                path:'/productDetails/:id',
                element:<PrivateRoute>
                    <ProductDetails></ProductDetails>
                </PrivateRoute>,
                loader:({params})=>fetch(`https://import-export-hub-server-theta.vercel.app/products/${params.id}`),
                hydrateFallbackElement:<Loading></Loading>
            },
            {
                path:"/*",
                element:<div>
                    <title>Error-404</title>
                    <p>Error 404</p>
                </div>
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