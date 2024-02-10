import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'
import { SignIn } from './Pages/Signin'
import SignUp from './Pages/SignUp'
import Profile from './Pages/Profile'
import About from './Pages/About'
import Header from './components/Header/Header'
import PrivateRoutes from './components/Auth/PrivateRoutes'


export default function App() {
  return (

    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/sign-in' element={<SignIn/>} />
      <Route path='/sign-up' element={<SignUp/>} />
      <Route  element={<PrivateRoutes/>}>
      <Route path='/profile' element={<Profile/>} />
      </Route>
      <Route path='/about' element={<About/>} />
    </Routes>
    </BrowserRouter>

  )
}
