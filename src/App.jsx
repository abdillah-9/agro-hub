import React from 'react'
import "./Global.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MainApp from './pages/MainApp';
import About from './pages/About';
import AuthProvider from './AuthProvider';

export default function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Home/>}/>
          <Route path={"/about"} element={<About/>}/>
          <Route path={"/signIn"} element={<SignIn/>}/>
          <Route path={"/signUp"} element={<SignUp/>}/>
          <Route path={"/mainApp"} element={<MainApp/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
