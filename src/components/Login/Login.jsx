import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useContext, useState } from 'react'
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import { useNavigate,  } from 'react-router-dom';


export default function Login() {
  let [loading,setLoading] = useState(false)
  let [error,setError] = useState(null)
  let [success,setSuccess] = useState(null)
  let {setToken} = useContext(UserContext)
  let navigate = useNavigate();
  

  function handleSubmit(values){
    setLoading(true)
    setError("");
    setSuccess("");
    axios.post('https://note-sigma-black.vercel.app/api/v1/users/signIn',values)
    .then(({data})=>{
      console.log(data);
      setLoading(false)
      setSuccess(data.msg);
      localStorage.setItem('token','3b8ny__'+data.token)
      setToken('3b8ny__'+data.token);
      setTimeout(()=>{
    navigate('/')
  },1500)
    })
    .catch((error)=>{
      console.log(error.response.data.msg);
      setLoading(false)
      setError(error.response.data.msg);
    })
    console.log(values);
  }
  let validationSchema = Yup.object().shape({
    email:Yup.string().required('email is required').email('please enter valid email'),
    password:Yup.string().required('password is required').matches(/^[A-z0-9_]{8,20}$/,'password from 8 to 20 chars'),
  })
  
  let formik = useFormik({
    initialValues :{
    email:'',
    password:'',
    },
    validationSchema
    ,onSubmit:handleSubmit
  })

 return (
    <>
    
<form onSubmit={formik.handleSubmit} className="mt-8 mx-auto relative z-10 bg-orange-50/80 backdrop-blur-md shadow-lg shadow-orange-200/40 rounded-lg p-8 w-full max-w-sm ">
  <h2 className="text-7xl my-4 font-extrabold text-center bg-gradient-to-r from-red-600 to-amber-100  bg-clip-text text-transparent " >hello.</h2>
  <p>Login to your account :</p>

  {success&&<div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-200 dark:bg-gray-800 dark:text-green-400" role="alert">
  <span className="font-medium">{success}</span>
</div>}

  {error&&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-green-400" role="alert">
  <span className="font-medium">{error}</span>
</div>}

  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" name='email' id="email" value={formik.values.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Email" required />
  </div>
  {formik.errors.email && formik.touched.email && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.email} </span>
</div>}
  
  <div>
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name='password' id="password" value={formik.values.password} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Password" required />
  </div>
  {formik.errors.password && formik.touched.password && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.password} </span>
</div>}

<p className="mb-5 text-sm  text-gray-600">
  Don't have an account?
  <span
    onClick={() => navigate('/register')}
    className="ml-1 text-blue-500 hover:underline cursor-pointer"
  >
    Create an account
  </span>
</p>
  
  <button type="submit" className="bg-[url('/img/text.jpg')] bg-center bg-cover text-orange-50  focus:ring-3 focus:outline-none focus:ring-red-700 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center ">
    
    {loading?<i className='fa fa-spin fa-spinner'></i>:"Submit"}</button>
</form>

    


    </>
  )



}
