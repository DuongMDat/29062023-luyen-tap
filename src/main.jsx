import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Components/Home.jsx';
import Login from './Components/Login.jsx';
import PrivateRouter from './Components/Private/PrivateRouter.jsx';
import Detail from './Components/Details.jsx';
const router = createBrowserRouter([{
  path: "/",
  element: <Login></Login>
},
{
  path: "/home",
  element: 
    <PrivateRouter>
      <Home></Home>
    </PrivateRouter>
  
},{
  path:"/:id",
  element:
  <PrivateRouter>
    <Detail></Detail>
  </PrivateRouter>
}
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />

  </React.StrictMode>
)
