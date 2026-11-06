import React from 'react'
import Login from './Login'
import Browse from './Browse'
import Header from './Header'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

const appRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Header />,
        children: [
            {
                path: "/",
                element: <Login />
            },
            {
                path: "/browser",
                element: <Browse />
            }
        ]
    }
])



function Body() {
    
  return <RouterProvider router={appRoutes} />
}


export default Body
