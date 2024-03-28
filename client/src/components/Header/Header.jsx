import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import  {Link, useNavigate} from 'react-router-dom'

export default function Header() {

  const {currentUser} = useSelector((state)=>  state.user)
  const [searchTerm,setSearchTerm] = useState('')
  const navigate = useNavigate()


 const handleSubmit = (e) => {
  e.preventDefault();
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set('searchTerm', searchTerm);
  const searchQuery = urlParams.toString();
  navigate(`/search?${searchQuery}`);
}

useEffect(()=>{
  const urlParams = new URLSearchParams(location.search);
  const searchTermFromUrl = urlParams.get('searchTerm')
  if(searchTermFromUrl){
    setSearchTerm(searchTermFromUrl)
  }
},[location.search])

  return (
    <header className="shadow-md sticky top-0 bg-gray-900 z-10" style={{ backgroundColor: '#363636' }}>
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
      <h1 className="font-bold text-sm sm:text-xl flex flex-wrap p-1 rounded-md lg:border lg:border-white">
          <span className="text-slate-600">Second</span>
          <span className="text-slate-200">Handie</span>
        </h1>

        <div className="">
        <form onSubmit={handleSubmit} className=" p-3 rounded-lg flex items-center" style={{background:"#242424"}}>
          <input
            placeholder="search here..."
            className="bg-transparent text-white font-sans focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
          />
          <FaSearch className="text-slate-200" />
        </form>
        </div>
       
        <div className="flex gap-4">
          
      <Link to="/" className="hidden sm:inline group text-white transition duration-300 relative">
        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white absolute bottom-0 left-0 right-0"></span>
        Home
      </Link>
      <Link to="/about" className=" hidden sm:inline group text-white transition duration-300 relative">
        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white absolute bottom-0 left-0 right-0"></span>
        About
      </Link>
      <Link to="/profile" className="group text-sky-600 transition duration-300 relative">
  {currentUser ? (
    <div className=" rounded-full hover:bg-orange-500">    
    <img className="rounded-full h-8 w-8 object-cover border border-white p-1" src={currentUser.user.avatar} alt="profile" />   
     </div>
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
