import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'


export default function Navbar() {
  let { token, setToken } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  function logOut() {
    localStorage.removeItem('token');
    setToken(null);
  }

  // Toggle on button click
  function toggleSidebar() {
    setIsOpen(prev => !prev);
  }

  // Close when clicking outside
  useEffect(() => {

    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={toggleSidebar}
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
        </svg>
      </button>


      {isOpen && (
        <div className='fixed inset-0 z-30' onClick={(e)=>{e.stopPropagation(); setIsOpen(false);}}></div>
      )}

      <aside
  ref={sidebarRef}
  className={`shadow-xl shadow-red-500/60 fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 bg-cover bg-center`}
  style={{ backgroundImage: "url('/img/sideBar.jpg')" }}
  aria-label="Sidebar"
>
  <div className="h-full px-3 py-4 overflow-y-auto bg-gray-900/10">
    <span className="self-center text-3xl font-bold whitespace-nowrap  ps-2.5 mb-5 block bg-gradient-to-r bg-orange-200  bg-clip-text text-transparent ">Note App</span>
    <ul className="space-y-2 font-medium">

            {token ? (
              <>
                <li>
                  <NavLink to='/' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <i className="fa-solid fa-house-user shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                    <span className="text-white group-hover:text-gray-900 flex-1 ms-3 whitespace-nowrap">Home</span>
                  </NavLink>
                </li>
                <li>
                  <Link onClick={logOut} to='/login' className="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <i className="fa-solid fa-right-to-bracket fa-rotate-180 shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                    <span className=" text-white group-hover:text-gray-900 flex-1 ms-3 whitespace-nowrap">Logout</span>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to='/login' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <i className="pt-1 fa-solid fa-right-to-bracket shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                    <span className="text-white group-hover:text-gray-900 flex-1 ms-3 whitespace-nowrap">Login</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/register' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <svg className="shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                      <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                      <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                    </svg>
                    <span className="text-white group-hover:text-gray-900 flex-1 ms-3 whitespace-nowrap">Register</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </aside>
    </>
  )
}
