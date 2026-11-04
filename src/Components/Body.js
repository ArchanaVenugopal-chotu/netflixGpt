import React from 'react'
import Login from './Login'
import Browse from './Browse'
import Header from './Header'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { addUser,deleteUser } from '../Utils/userSlice'
import { auth } from '../Utils/firebase'

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
    
    const dispatch = useDispatch()
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {

            if (user) {
                dispatch(addUser({
                    email: user.email,
                    name: user.displayName,
                    uid: user.uid
                }));
            } else {
                dispatch(deleteUser());
            }

        });

        return () => unsubscribe();

    }, [dispatch]);
  return <RouterProvider router={appRoutes} />
}


export default Body
