import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Home from './components/Home.tsx'
import Edit from './components/Edit.tsx'
import Login from './components/Login.tsx'
import Register from './components/Register.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Login/>
      },
      {
        path: "/home",
        element: <Home/>
      },
      {
        path: "edit/:id",
        element: <Edit/>
      },
      {
        path: "/cadastro",
        element: <Register/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
