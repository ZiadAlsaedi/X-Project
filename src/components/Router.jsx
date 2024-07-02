import React from 'react'
import Home from './Home'
import Sidebar from './Sidebar';
import Sign from './Sign';
import Rightbar from './Rightbar';
import Profile from './Profile';

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom"
  
  const router = createBrowserRouter([
    {
      path: "/Home",
      element: <Home/>
    },
    {
      path: "/Profile",
      element: <Profile/>
    },
    {
      path: "/Rightbar",
      element: <Rightbar/>
    },
    {
      path: "/",
      element: <Sign/>
    },
    {
        path: "/Sidebar",
        element: <Sidebar/>
      },
  
    
  ]);
const Router = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default Router