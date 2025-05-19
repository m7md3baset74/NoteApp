import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { data } from 'react-router-dom';
import Note from './../Note/Note';
import { useFormik } from 'formik';
import * as Yup from 'yup'



export default function Home() {
  let [modal,setModal]=useState(false);
  let [notes,setNotes] = useState([]);
  let [loading,setLoading] = useState(false);
  let [error,setError] = useState(null);
  let [success,setSuccess] = useState(null)

  
  function getNotes(){
    axios.get(`https://note-sigma-black.vercel.app/api/v1/notes`,{
      headers:{token:localStorage.getItem('token')}
    }).then(({data})=>{
      console.log(data);
      setNotes(data.notes)
    })
    .catch((error)=>{
      console.log(error);
      
    })
  }

  function removeNoteFromState(id) {
  setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
}

function clearModal(){
  setModal(false)
  formik.resetForm()
  setError("");
  setSuccess("");
}

  useEffect(()=>{
    getNotes()
    
  },[])

  function handleSubmit(values){
      setLoading(true)
      setError("");
      setSuccess("");
      axios.post('https://note-sigma-black.vercel.app/api/v1/notes',values,{
      headers:{token:localStorage.getItem('token')}
    })
      .then(({data})=>{
        console.log(data);
        setLoading(false)
        setSuccess(data.msg);
        getNotes();
        setTimeout(()=>{clearModal()},1000)
      })
      .catch((error)=>{
        console.log(error.response.data.msg);
        setLoading(false)
        setError(error.response.data.msg);
      })
      console.log(values);
    }


  let validationSchema = Yup.object().shape({
      title:Yup.string().min(3,'title must be at least 3 chars').required('title is required'),
      content:Yup.string().min(3,'content must be at least 3 chars').required('content is required'),
    })
    
    let formik = useFormik({
      initialValues :{
      title:'',
      content:'',
      },
      validationSchema
      ,onSubmit:handleSubmit
    })


  return (
    <>
    
    <div className='flex flex-wrap'>
  {notes.length !== 0 ? (
    notes.map((note) => (
      <Note key={note._id} noteData={note} getNotes={getNotes} removeNoteFromState={removeNoteFromState} />
    ))
  ) : (
    <p className='w-full text-4xl text-gray-500 mt-10'>No notes yet.</p>
  )}
</div>
<div onClick={() => setModal(true)} className='fixed z-10 bottom-10 right-10 bg-red-700 w-14 h-14 rounded-full text-white flex items-center justify-center hover:scale-110 transition-all'>
  <i className='fa fa-plus text-xl'></i>
</div>

  
  {modal&&<div id="crud-modal" tabIndex={-1} aria-hidden="true" className="h-screen flex items-center justify-center bg-gray-900/40 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 max-h-full">
    <div className="relative p-6 w-full max-w-md max-h-full">
      {/* Modal content */}
      <div className="relative bg-orange-50 rounded-lg shadow-sm dark:bg-gray-700">
        {/* Modal header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Add Note
          </h3>
          <button onClick={clearModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
            <i className='fa fa-x'></i>
          </button>
        </div>

        {success&&<div className="p-4 text-md text-green-700 text-center bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  <span className="font-medium">{success}</span>
</div>}

  {error&&<div className="p-4  text-md text-red-800 text-center bg-red-100 dark:bg-gray-800 dark:text-green-400" role="alert">
  <span className="font-medium">{error}</span>
</div>}

        {/* Modal body */}
        <form onSubmit={formik.handleSubmit} className="p-4 md:p-5">
          <div className=" gap-4 mb-4 grid-cols-2">
            <div className='mb-4'>
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title:</label>
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.title} type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" required />
            </div>
            {formik.errors.title && formik.touched.title && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.title} </span>
</div>}
            
            <div className="col-span-2">
              <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Note Content:</label>
              <textarea onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.content} name="content" id="content" rows={4} className="h-60 sm:h-40 xs:h-56 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write Your Note here" defaultValue={""} />                    
            </div>
          </div>
          {formik.errors.content && formik.touched.content && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.content} </span>
</div>}
          
          <button type="submit" className="text-white inline-flex items-center bg-gradient-to-r from-red-600 to-amber-100 hover:gradient-to-r hover:from-amber-100 hover:to-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {
              loading?<i className='fa fa-spin fa-spinner'></i>:
              <>
          Add<i className='fa fa-plus pl-2'></i>
              </>
            }
          </button>
        </form>
      </div>
    </div>
  </div>}





  


    
   


    
    </>
  )
}
