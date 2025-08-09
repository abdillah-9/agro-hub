import React from 'react'
import "./Global.css"
import {useAuth} from './services/useAuth'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import SignIn from './pages/SignIN';
import SignUp from './pages/SignUp';
import MainApp from './pages/MainApp';

function About(){
  return(
    <div>About</div>
  )
}

export default function App() {
  const {auths} = useAuth();
  const juma = "jumaa";

  return (
    <BrowserRouter>
      <Routes>
        {
          !juma? <Route path={"*"} element={<Home/>} /> : 
          <>
            <Route path={"/"} element={<Home/>}/>
            <Route path={"/about"} element={<About/>}/>
            <Route path={"/signIn"} element={<SignIn/>}/>
            <Route path={"/signUp"} element={<SignUp/>}/>
            <Route path={"/mainApp"} element={<MainApp/>}/>
          </>
        }
      </Routes>
    </BrowserRouter>
  )
}
