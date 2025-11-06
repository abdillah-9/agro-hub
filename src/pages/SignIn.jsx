import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';

export default function SignIn({setActiveLInk, activeLink}) {
  const navigate = useNavigate();
  const [data, setData]= useState(false);
  const {setUserData, userData} = useContext(AuthContext);

  async function getUserCookie(){
    try{
      const getcookie = await fetch('http://localhost:4000/get_user_from_cookie',{
        credentials:'include', method:"POST"
      });

      if(getcookie.ok){
        const newUserData = await getcookie.json();
        console.log("New cookie is "+JSON.stringify(newUserData));
        setUserData(newUserData);
      }
    }
    catch(e){
      alert('Err catched is '+e);
    }
  }
  async function handleSubmit(e){
    e.preventDefault();
    //generate formData
    const formData = new FormData();
    const user_password = e.target.user_password.value;
    const username_or_email = e.target.username_or_email.value;
    formData.append('user_password', user_password);
    formData.append('username_or_email', username_or_email);

    if(user_password.length > 8 || user_password.length < 6){
      return alert('password must be between 6 and 8');
    }
    if(!/[a-zA-Z]/.test(user_password) || !/[0-9]/.test(user_password) || !/[@!$^*-+?%]/.test(user_password)){
      return alert('Password must contain atlest a letter,number and special character');
    }
    if(/[\s<>'"`\\//]/.test(user_password)){
      return alert("Password should not have slashes, coutes, angle brackets and white spaces");
    }

    try{

      const res = await fetch('http://localhost:4000/sign_in',{
        body: formData, 
        method: 'POST',
        credentials:'include'
      });

      if(res.ok){
        const obj = await res.json();
        setData(obj);
        console.log(obj);
        alert(obj.message);
        getUserCookie();
      }
      else{
        console.log('something happened');
      }
      
    }
    catch(e){
        console.log("login err "+e);
    }
  }
  // if(data){
  //   return navigate('/mainApp', {replace: true});
  // }

  return (
    <div className='flex-Row-Grow-Wrap-Gap-Space_Between centered p25px blur'>
      
      {/* Left Panel - Marketing Section */}
      <div className='w45vw minW200 maxW700 pureWhiteText flex-Column-Grow-Gap centeredV'>
        <div className='h2 maxW500 pureWhiteText'>
          Grow Together, Trade Smarter
        </div>
        <div className='h3 maxW500 midWhiteText'>
          Where agri-buyers, sellers and service providers meet
        </div>
        <div className='h4 paleWhiteText'>
          From farm inputs to bulk crop deals—build your network, boost your business
        </div>
      </div>

      {/* Right Panel - Sign In Form */}
      <form onSubmit={handleSubmit}
        className='w45vw minW200 maxW500 pureWhiteText flex-Column-Grow-Gap centered paleWhiteBody p25px bRad20'
      >
        <div className='inputContainer1'>
          <label>Email or Username</label>
          <input 
            type='text' 
            name='username_or_email' 
            placeholder='Enter email or username' 
            className='input1 midWhiteBody' 
          />
        </div>

        <div className='inputContainer1'>
          <label>Password</label>
          <input 
            type='password' 
            name='user_password' 
            placeholder='********' 
            className='input1 midWhiteBody' 
          />
        </div>

        <div className='inputContainer1 p2'>
          <span className='specLink'>Forgot Password?</span>
        </div>

        <div className='inputContainer1' style={{height:'fit-content'}}>
          <button 
            type='submit' 
            className='input1 submit1 midGreenBody pureWhiteText'
          >
            SIGN IN
          </button>
        </div>

        <div className='inputContainer2 p2'>
          <span>New here? </span>
          <span className='specLink' onClick={()=>{setActiveLInk("SignUp")}}>Create an account</span>
        </div>
      </form>
    </div>
  );
}
