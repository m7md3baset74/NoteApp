import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Register() {
  let navigate = useNavigate();
  let [loading,setLoading] = useState(false)
  let [error,setError] = useState(null)
  let [success,setSuccess] = useState(null)

  function handleSubmit(values){
    setLoading(true)
    setError("");
    setSuccess("");
    axios.post('https://note-sigma-black.vercel.app/api/v1/users/signUp',values)
    .then(({data})=>{
      console.log(data.msg);
      setLoading(false)
      setSuccess(data.msg);
      setTimeout(()=>{navigate('/login');},1100)
    })
    .catch((error)=>{
      console.log(error.response.data.msg);
      setLoading(false)
      setError(error.response.data.msg);
    })
    console.log(values);
  }
  let validationSchema = Yup.object().shape({
    name:Yup.string().required('name is required').min(3,'min 3 chars').max(20,'max 20 chars'),
    email:Yup.string().required('email is required').email('please enter valid email'),
    password:Yup.string().required('password is required').matches(/^[A-z0-9_]{8,20}$/,'password from 8 to 20 chars'),
    age:Yup.string().required('age is required'),
    phone:Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/,'egyptian number only')
  })
  
  let formik = useFormik({
    initialValues :{
    name:'',
    email:'',
    password:'',
    age:'',
    phone:''
    },
    validationSchema
    ,onSubmit:handleSubmit
  })
  

  return (
    <>
<form onSubmit={formik.handleSubmit} className="mx-auto relative z-10 bg-orange-50/80 backdrop-blur-md shadow-lg shadow-orange-200/40 rounded-lg p-8 w-full max-w-sm">
  <h2 className="text-3xl my-4 font-bold">Register Now :</h2>

  {success&&<div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-200 dark:bg-gray-800 dark:text-green-400" role="alert">
  <span className="font-medium">{success}</span>
</div>}

  {error&&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-green-400" role="alert">
  <span className="font-medium">{error}</span>
</div>}

  <div className="mb-5">
    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name='name' id="name" value={formik.values.name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Name" required />
  </div>
  {formik.errors.name && formik.touched.name && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.name} </span>
</div>}
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" name='email' id="email" value={formik.values.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Email" required />
  </div>
  {formik.errors.email && formik.touched.email && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.email} </span>
</div>}
  <div className="mb-5">
    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" name='phone' id="phone" value={formik.values.phone} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Phone" required />
  </div>
  {formik.errors.phone && formik.touched.phone && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.phone} </span>
</div>}
  <div className="mb-5">
    <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="number" name='age' id="age" value={formik.values.age} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Age" required />
  </div>
  {formik.errors.age && formik.touched.age && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.age} </span>
</div>}
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name='password' id="password" value={formik.values.password} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Password" required />
  </div>
  {formik.errors.password && formik.touched.password && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.password} </span>
</div>}
  
  
  <button type="submit" className="text-white bg-gradient-to-r from-red-600 to-amber-100 hover:gradient-to-r hover:from-amber-100 hover:to-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">{loading?<i className='fa fa-spin fa-spinner'></i>:"Submit"}</button>
</form>


    </>
  )
}
