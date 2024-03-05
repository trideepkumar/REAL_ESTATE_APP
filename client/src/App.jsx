import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'
import { SignIn } from './Pages/Signin'
import SignUp from './Pages/SignUp'
import Profile from './Pages/Profile'
import About from './Pages/About'
import Header from './components/Header/Header'
import PrivateRoutes from './components/Auth/PrivateRoutes'
import CreateListing from './Pages/CreateListing'


export default function App() {
  return (

    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/sign-in' element={<SignIn/>} />
      <Route path='/sign-up' element={<SignUp/>} />
      <Route path='/about' element={<About/>} />
      <Route  element={<PrivateRoutes/>}>
      <Route path='/profile' element={<Profile/>} />
      <Route path='/create-listing' element={<CreateListing/>} />
      </Route>
    </Routes>
    </BrowserRouter>

  )
}
