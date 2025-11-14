import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Home from "../Components/Home";


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
                path:"/login",
                element:<Login></Login>
            },
            {
                path:"/register",
                element:<Register></Register>
            },
            {
                path:"/*",
                element:<p>Error 404</p>
            },
            {
                path:"/allProducts",
                element:<p>all Products</p>
            },
            {
                path:"/myExport",
                element:<p>My Export</p>
            },
            {
                path:"/myImport",
                element:<p>My Import</p>
            },
            {
                path:"/addProducts",
                element:<p>add Products</p>
            },

        ]
    }
])