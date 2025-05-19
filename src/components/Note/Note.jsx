import axios from 'axios'
import { useFormik } from 'formik'
import moment from 'moment'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import * as Yup from 'yup'

export default function Note({noteData,getNotes,removeNoteFromState}) {
let {title , _id , content , updatedAt}=noteData
let [modal,setModal]=useState(false);
let [loading,setLoading] = useState(false);
let [error,setError] = useState(null);
let [success,setSuccess] = useState(null)

function deleteNote(id){
  axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`,{
      headers:{token:localStorage.getItem('token')}
    })
    .then(()=>{
      getNotes()
    })
}

function clearModal(){
  setModal(false)
  formik.resetForm()
  setError("");
  setSuccess("");
}

function handleSubmit(values){
      setLoading(true)
      setError("");
      setSuccess("");
      axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${_id}`,values,{
      headers:{token:localStorage.getItem('token')}
    })
    .then(({data})=>{
            console.log(data);
            setLoading(false)
            setSuccess(data.msg);
            getNotes();
            setTimeout(()=>{clearModal()},1200)
          })
          .catch((error)=>{
            console.log(error.response.data.msg);
            setLoading(false)
            setError(error.response.data.msg);
          })
          console.log(values);
  }


function deleteNoteAlert(id){
  const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger"
  },
  buttonsStyling: false
});
swalWithBootstrapButtons.fire({
  title: "Are you sure?",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Yes, delete it!",
  cancelButtonText: "No, cancel!",
  reverseButtons: true
}).then((result) => {
  if (result.isConfirmed) {
    deleteNote(id);
    removeNoteFromState(id);
    swalWithBootstrapButtons.fire({
      title: "Deleted!",
      icon: "success"
    });
  } else if (
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire({
      title: "Cancelled",
      icon: "error"
    });
  }
});
}

let validationSchema = Yup.object().shape({
      title:Yup.string().min(3,'title must be at least 3 chars').required('title is required'),
      content:Yup.string().min(3,'content must be at least 3 chars').required('content is required'),
    })
    
    let formik = useFormik({
      initialValues :{
      title:title,
      content:content,
      updatedAt:updatedAt
      },
      validationSchema
      ,onSubmit:handleSubmit,
      enableReinitialize: true
    })

  return (
    <>
    <div onClick={() => setModal(true)} className='w-full md:w-1/2 lg:w-1/3 p-4 '>
  <div
    className='shadow-md shadow-orange-200/10 p-4 rounded-md text-orange-100 relative overflow-hidden'
    style={{
      backgroundImage: "url('/img/card2.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <div className='absolute inset-0 bg-black/30 rounded-md z-0'></div>

    <div className='relative z-10'>
      <h3 className='text-2xl font-bold uppercase'>{title}</h3>
      <p className='capitalize'>{content.slice(0,30)+'..'}</p>

      <div className='mt-5 w-fit ms-auto'>
        
        <button
          onClick={(e) => { deleteNoteAlert(_id),e.stopPropagation(); }}
          type="button"
          className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  </div>
        <p className='text-xs'>{moment(updatedAt).format('YYYY-MM-DD HH:mm')}</p>
</div>


    <div>
      {modal&&<div id="crud-modal" tabIndex={-1} aria-hidden="true" className=" h-screen flex items-center justify-center bg-gray-900/40 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 max-h-full">
    <div className="relative p-6 w-full max-w-xl  max-h-full">
      {/* Modal content */}
      <div className="bg-orange-50 relative  rounded-lg shadow-sm dark:bg-gray-700">
        

        {success&&<div className="p-4 text-md text-green-700 text-center bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  <span className="font-medium">{success}</span>
</div>}

  {error&&<div className="p-4  text-md text-red-800 text-center bg-red-100 dark:bg-gray-800 dark:text-green-400" role="alert">
  <span className="font-medium">{error}</span>
</div>}

        {/* Modal body */}
        <form onSubmit={formik.handleSubmit} className="p-4 md:p-5">
          <div className=" gap-4 mb-4 grid-cols-2 ">
            <div className='mb-4'>
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title:</label>
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.title} type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" required />
            </div>
            {formik.errors.title && formik.touched.title && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.title} </span>
</div>}
            
            <div className="col-span-2">
              <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Note Content:</label>
              <textarea onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.content} name="content" id="content" rows={8} className="h-86 sm:h-40 xs:h-56 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write Your Note here" defaultValue={""} />                    
            </div>
          </div>
          {formik.errors.content && formik.touched.content && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.content} </span>
</div>}
          
          <div className='space-x-4'>
            <button type="submit" className="text-white inline-flex items-center bg-gradient-to-r from-red-600 to-amber-100 hover:gradient-to-r hover:from-amber-100 hover:to-red-600  focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-7 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {
              loading?<i className='fa fa-spin fa-spinner'></i>:
              <>
          Save
              </>
            }
            </button>
            <button
                type="button"
                onClick={clearModal}
                className="hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-200  hover:bg-clip-text hover:text-transparent px-5 py-2.5 text-sm font-medium  bg-white border border-gray-200 rounded-lg hover:bg-gray-100  focus:outline-none focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                Cancel
              </button>
          </div>
        </form>
      </div>
    </div>
  </div>}
    </div>
    </>
  )
}
