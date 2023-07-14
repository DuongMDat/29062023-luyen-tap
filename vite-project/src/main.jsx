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
import LocName from './Components/Todo/Header.jsx';
import TaskSearch from './Components/Todo/Header.jsx';
import Debounce from './Components/Todo/Header.jsx';
import Loc from './Components/Todo/Debounce.jsx';

// import Header from './Components/Todo/Header.jsx';
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
},{
  path:"/loc",
  element:<Loc></Loc>
}
// {
//   path: "/loc",
//   element:
//     <Debounce></Debounce>
// }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />

  </React.StrictMode>
)
