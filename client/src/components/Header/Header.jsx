import React from "react";
import { FaSearch } from "react-icons/fa";
import  {Link} from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-slate-300 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold text-sm  sm:text-xl flex flex-wrap">
          <span className="text-slate-500">Real</span>
          <span className="text-slate-700">Estate</span>
        </h1>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            placeholder="search here..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>
        <div className="flex gap-4">
      <Link to="/" className="hidden sm:inline group text-sky-600 transition duration-300 relative">
        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600 absolute bottom-0 left-0 right-0"></span>
        Home
      </Link>
      <Link to="/about" className=" hidden sm:inline group text-sky-600 transition duration-300 relative">
        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600 absolute bottom-0 left-0 right-0"></span>
        About
      </Link>
      <Link to="/sign-in" className=" group text-sky-600 transition duration-300 relative">
        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600 absolute bottom-0 left-0 right-0"></span>
        Sign in
      </Link>
    </div>
      </div>
    </header>
  );
}
