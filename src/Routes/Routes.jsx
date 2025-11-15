import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Home from "../Components/Home";
import AuthLayout from "../Layouts/AuthLayout";
import PrivateRoute from "../Auth/PrivateRoute";


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
                element:<p>all Products</p>
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