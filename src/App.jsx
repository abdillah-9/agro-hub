import React, { useContext, useEffect } from 'react'
import "./Global.css"
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MainApp from './pages/MainApp';
import About from './pages/About';
import { AuthContext } from './AuthProvider';
import LoadingSpinner from './components/LoadingSpinner';

export default function App() {
    const {userData} = useContext(AuthContext);
    if(userData === undefined){
      return <LoadingSpinner/>
    }  
    console.log('userData inside App '+JSON.stringify(userData));
  return (
      <BrowserRouter>
        <Routes>
              <Route path={"/"} 
                     element={<PublicRoute><Home/></PublicRoute>}/>
              <Route path={"/about"} 
                     element={
                      <PublicRoute>
                        <Home passedActiveLink={'About'}/>
                      </PublicRoute>}
              />
              <Route path={"/signIn"} 
                     element={
                      <PublicRoute>
                        <Home passedActiveLink={'SignIn'}/>
                      </PublicRoute>
                     }
              />
              <Route path={"/signUp"} 
                     element={
                      <PublicRoute>
                        <Home passedActiveLink={'SignUp'}/>
                      </PublicRoute>
                     }
              />

              {/* Protected routes */}
              <Route path={"/mainApp"} 
                     element={
                      <ProtectedRoute role={['farmer','seller']}>
                        <MainApp/>
                      </ProtectedRoute>
                     }
              />
              <Route path="*" element={<NotFoundPage />} />
              <Route path={"/unAuthorized"} element={<UnAuthorizedPage/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export function UnAuthorizedPage(){
  alert('Not authorized after dismissing the alert youll be redirected to login page')
    
  return (
    <Navigate to={'../signIn'} replace/>
  );
}
export function NotFoundPage(){
  return(
    <div>The page you request is not available or your role is not allowed to access</div>
  )
}

export function ProtectedRoute({children, role}){
  const move = useNavigate();
  const {userData} = useContext(AuthContext);
  const {user_role, user_id} = userData;
  const location = useLocation();

  console.log("value of user_role is "+user_role);
  const path = location.pathname; 
  if(path == '/'  || path == '/signIn' || path == 'signUp'){
    return <Navigate to='/mainApp' replace/>
  }

  if(role.includes(user_role)){
    return(
      children
    );
  }
  else if(!role.includes(user_role)){
    return <Navigate to={'/unAuthorized'} replace />
    // useEffect(()=>{move('/unAuthorized',{replace: true})}, []);
  }
}

export function PublicRoute({children}){
  const move = useNavigate();
  const {userData} = useContext(AuthContext);
  const {user_role, user_id} = userData;

  console.log("value of user_id is "+user_id);

  if(user_id){
    return(
      <Navigate to={'/mainApp'} replace />  
    );
  }
  else if(!user_id){
    return (
      children
    );
  }
}
