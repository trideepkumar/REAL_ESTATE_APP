import React from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import  {Link} from 'react-router-dom'

export default function Header() {

  const {currentUser} = useSelector((state)=>  state.user)

  return (
    <header className="shadow-md sticky top-0 bg-gray-900 z-10" style={{ backgroundColor: '#363636' }}>
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold text-sm  sm:text-xl flex flex-wrap">
          <span className="text-slate-500">Real</span>
          <span className="text-slate-700">Estate</span>
        </h1>

        <div className="">
        <form className=" p-3 rounded-lg flex items-center" style={{background:"#242424"}}>
          <input
            placeholder="search here..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>
        </div>
       
        <div className="flex gap-4">
          
      <Link to="/" className="hidden sm:inline group text-sky-600 transition duration-300 relative">
        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600 absolute bottom-0 left-0 right-0"></span>
        Home
      </Link>
      <Link to="/about" className=" hidden sm:inline group text-sky-600 transition duration-300 relative">
        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600 absolute bottom-0 left-0 right-0"></span>
        About
      </Link>
      <Link to="/profile" className="group text-sky-600 transition duration-300 relative">
  {currentUser ? (
    <>    
    <img className="rounded-full h-7 w-7 object-cover" src={currentUser.user.avatar} alt="profile" />   
     </>
  ) : (
    <>
      <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600 absolute bottom-0 left-0 right-0"></span>
      Sign in
    </>
  )}
</Link>

    </div>
      </div>
    </header>
  );
}
