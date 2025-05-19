
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import NotFound from './components/NotFound/NotFound';
import UserContextProvider from './context/UserContext';
import ProtectRoute from './components/ProtectRoute/ProtectRoute';

function App() {

  const router = createBrowserRouter([
    {path:'',element:<Layout/>,children:[
      {index:true,element:<ProtectRoute><Home/></ProtectRoute>},
      {path:'/login',element:<Login/>},
      {path:'/register',element:<Register/>},
      {path:'*',element:<NotFound/>},
    ]}
  ])

  return (
    <>
    <UserContextProvider>
      <RouterProvider router={router}/>
    </UserContextProvider>
    </>
  )
}

export default App
