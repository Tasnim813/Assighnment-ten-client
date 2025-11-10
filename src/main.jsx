import { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './Page/Home.jsx'
import Root from './RootLayout/Root.jsx'
import ErrorPage from './Page/Errorpage/ErrorPage.jsx'
import Login from './Authentication/Login.jsx'
import Register from './Authentication/Register.jsx'
import AuthProvider from './Context/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify'

import AddHabit from './Page/AddHabit/AddHabit.jsx'
import Myhabit from './Page/MyHabit/MyHabit.jsx'
import BrowsePublicHabit from './Page/BrowsePublicHabit/BrowsePublicHabit.jsx'
import CartDetails from './Page/Feturecart/CartDetails.jsx'
import PublicHabitDetails from './Page/PublicHabitCard/PublicHabitDetails.jsx'

const router=createBrowserRouter([
  {
    path:'/',
    Component:Root,
    // errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
        index:true,
      Component:Home,
      loader:()=>fetch('http://localhost:3000/latest-health')
      },
      {
        path:'/login',
        Component:Login
      },
      {
        path:'/register',
        Component:Register
      },
      {
        path:'/addHabit',
        Component:AddHabit,
        
      },
      {
        path:'/myHabit',
        Component: Myhabit,
        
      },
      {
        path:'/browsePublicHabit',
        Component:BrowsePublicHabit,
        

      },
      {
        path:"/health-details/:id",
        Component:CartDetails,
        loader:({params})=>fetch(`http://localhost:3000/health/${params.id}`),
      },
      {
        path:'/habit-details/:id',
        Component:PublicHabitDetails,
        loader:({params})=>fetch(`http://localhost:3000/habit/${params.id}`)
      }
     
    ]
  },
  
 
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
<RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  <ToastContainer></ToastContainer>
  </StrictMode>,
)
