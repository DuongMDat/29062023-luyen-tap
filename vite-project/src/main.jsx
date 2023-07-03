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
import Add from './Components/Todo/Add.jsx';
import Update from './Components/Todo/Update.jsx';
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

}, {
  path: "/:id",
  element:
    <PrivateRouter>
      <Detail></Detail>
    </PrivateRouter>
},
{
  path: '/add',
  element: <PrivateRouter>
    <Add></Add>
  </PrivateRouter>
}, {
  path: '/update',
  element: <PrivateRouter>
<Update></Update>
  </PrivateRouter>
}
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />

  </React.StrictMode>
)
