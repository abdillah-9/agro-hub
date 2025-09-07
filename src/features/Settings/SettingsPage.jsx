import React, { useContext, useState } from 'react'
import { AppContext } from '../../pages/MainApp';
import {  RiDeleteBin5Fill } from 'react-icons/ri';
import { BsArrowDownCircleFill, BsSendFill } from 'react-icons/bs';
import { LiaUserEditSolid } from 'react-icons/lia';
import { TbLockPassword } from 'react-icons/tb';
import { FaPhotoFilm, FaUpload } from 'react-icons/fa6';

export default function SettingsPage({calcWidth}) {
  const { sellResourceForm, setSellResourceForm, setShowOverlay } = useContext(AppContext);
  const [shownData, setShownData] = useState("Account settings");

  return (
    <div className='flex-Column-Grow h80vh' 
    style={{backgroundColor:"rgb(250,250,250)"}}>

      {/* SETTINGS TOP-BAR DISPLAYING SETTING CATEGORIES*/}
      <div className='flex-Row-Wrap midWhiteBody borderB paleWhiteBorder p3'>
        <span className='p10px link maxW200 wHalf textCenter' 
        onClick={()=>setShownData("Account settings")}
        style={shownData == "Account settings"? {borderBottom:"4px solid rgb(120,120,120)",
        backgroundColor:"rgb(240,240,240)"} : {}}>
          Account settings  
        </span>
        <span className='p10px link maxW200 wHalf textCenter' onClick={()=>setShownData("System settings")}
        style={shownData == "System settings"? {borderBottom:"4px solid rgb(120,120,120)",
        backgroundColor:"rgb(240,240,240)"} : {}}>
          System settings  
        </span>
        <span className='p10px link maxW200 wHalf textCenter' onClick={()=>setShownData("Notification settings")}
        style={shownData == "Notification settings"? {borderBottom:"4px solid rgb(120,120,120)",
        backgroundColor:"rgb(240,240,240)"} : {}}>
          Notification settings  
        </span>
        <span className='p10px link maxW200 wHalf textCenter' onClick={()=>setShownData("Help & Support")}
        style={shownData == "Help & Support"? {borderBottom:"4px solid rgb(120,120,120)",
        backgroundColor:"rgb(240,240,240)"} : {}}>
          Help & Support  
        </span>
      </div>

      {/* SETTINGS BODY DISPLAYED DYNAMICALLY*/}
      <div className='flex-Column-Grow p10px p2' style={{maxWidth: calcWidth,overflow:"auto"}}>
        {
          shownData == "Account settings" ? <AccountSettings/> :
          shownData == "System settings" ? <SystemSettings/> :
          shownData == "Notification settings" ? <NotificationSettings/> :
          shownData == "Help & Support" &&  <HelpAndSupport/>
        }
      </div>
    </div>
  )
}

function AccountSettings(){

  const [toggleButton, setToggleButton] = useState({
    profileInfo:true,
    password:true,
    notificationPreference:false,
    languageRegionalPreference:false,
  });

  const toggleButtonAction = (buttonName)=>{
    setToggleButton((oldState)=>({
      ...oldState,
      [buttonName]:!oldState[buttonName]     
    }))  

  }

  const rotate360={
    transition:"all 0.5s ease-in",
    transform:'rotateX(360deg)',
  }
  const rotate180={
    transition:"all 0.5s ease-in",
    transform:'rotateX(180deg)',
  }
  const hide={
    transition:"all 0.5s ease-in",
    height:"0px",
    opacity:0,
    overflow:"hidden",
  }
  const show={
    borderBottom:"1px solid rgb(20, 168, 0)",
    padding:"10px 0px",
    height:"auto",
    opacity:1,
    overflow:"auto",
  }


  return(
    <div className='flex-Column-Grow-Gap'>
      <div onClick={()=>{toggleButtonAction("profileInfo")}} 
      className='centered wFit p8px link midGreenBody gap10px' style={dropdown}>
        <span>Profile info</span> 
        <BsArrowDownCircleFill style={toggleButton.profileInfo ? rotate180 : rotate360 } 
        className='h4'/>
      </div>
      <div style={!toggleButton.profileInfo ? hide : {...hide, ...show}}  
      className='flex-Column gap10px'>
        <p className='h4'>Edit Your Profile Details Here</p>
        <form className='flex-Row-Wrap-Gap'>
          <input type='text' name='fullName' placeholder='Full name' style={inputField} />
          <input type='number' name='phone' placeholder='Phone number' style={inputField} />
          <input type='email' name='emails' placeholder='Email address' style={inputField} />
          <input type='file' name='photo' id='editphoto' style={{display:"none"}} />
          <label className='flex-Row-Wrap gap7px centeredH link' id='editphoto' 
          style={{...inputField, backgroundColor:"rgba(200,200,200,0.9)"}}>
            <FaUpload/>
            <span>Upload image</span>
          </label>
          <button type='submit' name='submit' className='gap7px centered'
          style={{...inputField, ...submitButton}}>
            <LiaUserEditSolid className='h4'/> Edit profile
          </button>
        </form>
      </div>

      <div  onClick={()=>{toggleButtonAction("password")}} 
     className='centered wFit p8px link midGreenBody gap10px' style={dropdown}>
        <span>Password</span> 
        <BsArrowDownCircleFill style={toggleButton.password ? rotate180 : rotate360 } 
        className='h4'/>
      </div>
      <div style={!toggleButton.password ? hide : {...hide, ...show}} 
      className='flex-Column gap10px'>
        <p className='h4'>Update Password Here</p>
        <form className='flex-Row-Wrap-Gap'>
          <input type='password' name='pword' placeholder='Old password' style={inputField} />
          <input type='password' name='pwordNew' placeholder='New password' style={inputField} />
          <input type='password' name='CpwordNew' placeholder='Confirm new password' style={inputField} />
          <button type='submit' name='submit' className='gap7px centered'
          style={{...inputField, ...submitButton}}>
            <TbLockPassword className='h4'/> Update password
          </button>
        </form>
      </div>

      <div  onClick={()=>{toggleButtonAction("notificationPreference")}} 
     className='centered wFit p8px link midGreenBody gap10px' style={dropdown}>
        <span>Notification Preferences</span> 
        <BsArrowDownCircleFill style={toggleButton.notificationPreference ? rotate180 : rotate360 } 
        className='h4'/>
      </div>
      <div style={!toggleButton.notificationPreference ? hide : {...hide, ...show}}  
      className='flex-Column gap10px'>
        <p className='h4'>Choose how to receive notifications</p>
        <form className='flex-Row-Wrap-Gap'>
          <label>Sms notifications</label>
          <input type='checkbox' name='smsNotification'/>
          <label>Email notifications</label>
          <input type='checkbox' name='emailNotification'/>
        </form>
      </div>

      <div  onClick={()=>{toggleButtonAction("languageRegionalPreference")}} 
     className='centered wFit p8px link midGreenBody gap10px' style={dropdown}>
        <span>Language & regional preferences</span> 
        <BsArrowDownCircleFill style={toggleButton.languageRegionalPreference ? rotate180 : rotate360 } 
        className='h4'/>
      </div>
      <div style={!toggleButton.languageRegionalPreference ? hide : {...hide, ...show}}  
      className='flex-Column gap10px'>
        <p className='h4'>Update Language & Currency</p>
        <form className='flex-Row-Wrap-Gap'>
          <div className='flex-Row-Wrap-Gap centeredH'>
            <label>Language</label>
            <select name='language'style={inputField}>
              <option value={"kiswahili"}>Kiswahili</option>
              <option value={"english"}>English</option>
            </select>
          </div>
        </form>
        <form>  
          <div className='flex-Row-Wrap-Gap centeredH'>
            <label>Currency</label>
            <select name='currency' style={inputField}>
              <option value={"TSH"}>TSH</option>
              <option value={"USD"}>USD</option>
            </select>
          </div>
        </form>
      </div>

      <div className='centered wFit p8px link gap7px p1' 
      style={{...dropdown, backgroundColor:"rgba(250, 46, 46, 0.45)", color:"rgb(83, 0, 0)"}}>
        <RiDeleteBin5Fill/>
        <span>Delete account</span>
      </div>
    </div> 
  )
}

function SystemSettings(){

  const [toggleButton, setToggleButton] = useState({
    userManagement:true,
    privacySettings:false,
  });

  const toggleButtonAction = (buttonName)=>{
    setToggleButton((oldState)=>({
      ...oldState,
      [buttonName]:!oldState[buttonName]     
    }))  
  }

  const rotate360={
    transition:"all 0.5s ease-in",
    transform:'rotateX(360deg)',
  }
  const rotate180={
    transition:"all 0.5s ease-in",
    transform:'rotateX(180deg)',
  }
  const hide={
    transition:"all 0.5s ease-in",
    height:"0px",
    opacity:0,
    overflow:"hidden",
  }
  const show={
    borderBottom:"1px solid rgb(20, 168, 0)",
    padding:"10px 0px",
    height:"auto",
    opacity:1,
    overflow:"auto",
  }
  
  const users=[
    {
      id:1,
      fullname:"Juma Salum",
      phone:"0985123456",
      location:"Morogoro",
      emails:"jumasalum@gmail.com",
      pword:"12345678",
      role:"farmer",
    },
    {
      id:2,
      fullname:"Juma Salum",
      phone:"0985123456",
      location:"Morogoro",
      emails:"jumasalum@gmail.com",
      pword:"12345678",
      role:"farmer",
    },
    {
      id:3,
      fullname:"Juma Salum",
      phone:"0985123456",
      location:"Morogoro",
      emails:"jumasalum@gmail.com",
      pword:"12345678",
      role:"farmer",
    }
  ]
  return(
    <div className='flex-Column-Grow-Gap'>
      <div onClick={()=>{toggleButtonAction("userManagement")}}  
      className='centered wFit p8px link midGreenBody gap10px' style={dropdown}>
        <span>User Management</span> 
        <BsArrowDownCircleFill style={toggleButton.userManagement ? rotate180 : rotate360 } 
        className='h4'/>
      </div>
      <div style={!toggleButton.userManagement ? hide : {...hide, ...show}}   
      className='flex-Column'>
        <p className='h4 pV10px'>System users</p>
        {
          users && users != undefined ? users.map((entry, index)=>(
            <div className='flex-Row-Wrap-Gap centeredH wFit p1 p25px' key={index} 
            style={entry.id%2 == 0 ? {backgroundColor:"rgb(150,150,150)"} : {backgroundColor:"rgb(200,200,200)"}}>
              <span style={inputField}>Full name: {entry.fullname}</span>
              <span style={inputField}>Phone: {entry.phone}</span>
              <span style={inputField}>Location: {entry.location}</span>
              <span style={inputField}>Email: {entry.emails}</span>
              <span style={inputField}>Role: {entry.role}</span>
              <button type='submit' name='submit' className='gap7px centered' style={{...inputField, ...submitButton}}>
                <TbLockPassword className='h4'/> Edit user
              </button>
              <button className='centered wFit p8px link gap7px p1 bRad5' 
              style={{...submitButton, backgroundColor:"rgba(250, 46, 46, 0.45)", color:"rgb(83, 0, 0)"}}>
                <RiDeleteBin5Fill/>
                <span>Delete user</span>
              </button>
            </div>
          )) : <div>No user found ...</div>
        }
      </div>

      <div onClick={()=>{toggleButtonAction("privacySettings")}}  
      className='centered wFit p8px link midGreenBody gap10px' style={dropdown}>
        <span>Privacy Settings</span> 
        <BsArrowDownCircleFill style={toggleButton.privacySettings ? rotate180 : rotate360 } 
        className='h4'/>
      </div>
      <div style={!toggleButton.privacySettings ? hide : {...hide, ...show}}  
      className='flex-Column gap10px'>
        <p className='h4'>Account settings</p>
        <div className='flex-Row-Wrap gap20px p25px' style={{backgroundColor:"rgb(200,200,200)"}}>
          <div className='flex-Row-Wrap gap10px wFit'>
            <label>Admin</label>
            <input type='checkbox' name='admin'/>
          </div>
          <div className='flex-Row-Wrap gap10px wFit'>
            <label>Farmer</label>
            <input type='checkbox' name='farmer'/>
          </div>
          <div className='flex-Row-Wrap gap10px wFit'>
            <label>Crops buyer</label>
            <input type='checkbox' name='cropsBuyer'/>
          </div>
          <div className='flex-Row-Wrap gap10px wFit'>
            <label>Resources seller</label>
            <input type='checkbox' name='resourcesSeller'/>
          </div>
        </div>

        <div className='flex-Column gap10px'>
          <p className='h4'> System settings</p>
          <div className='flex-Row-Wrap gap20px p25px' style={{backgroundColor:"rgb(200,200,200)"}}>
            <div className='flex-Row-Wrap gap10px wFit'>
              <label>Admin</label>
              <input type='checkbox' name='admin'/>
            </div>
            <div className='flex-Row-Wrap gap10px wFit'>
              <label>Farmer</label>
              <input type='checkbox' name='farmer'/>
            </div>
            <div className='flex-Row-Wrap gap10px wFit'>
              <label>Crops buyer</label>
              <input type='checkbox' name='cropsBuyer'/>
            </div>
            <div className='flex-Row-Wrap gap10px wFit'>
              <label>Resources seller</label>
              <input type='checkbox' name='resourcesSeller'/>
            </div>
          </div>
        </div>

        <div className='flex-Column gap10px'>
          <p className='h4'>Notification settings</p>
          <div className='flex-Row-Wrap gap20px p25px' style={{backgroundColor:"rgb(200,200,200)"}}>
            <div className='flex-Row-Wrap gap10px wFit'>
              <label>Admin</label>
              <input type='checkbox' name='admin'/>
            </div>
            <div className='flex-Row-Wrap gap10px wFit'>
              <label>Farmer</label>
              <input type='checkbox' name='farmer'/>
            </div>
            <div className='flex-Row-Wrap gap10px wFit'>
              <label>Crops buyer</label>
              <input type='checkbox' name='cropsBuyer'/>
            </div>
            <div className='flex-Row-Wrap gap10px wFit'>
              <label>Resources seller</label>
              <input type='checkbox' name='resourcesSeller'/>
            </div>
          </div>
        </div>

        <div className='flex-Column gap10px'>
          <p className='h4'>Help & Support Settings</p>
          <div className='flex-Row-Wrap gap20px p25px' style={{backgroundColor:"rgb(200,200,200)"}}>
            <div className='flex-Row-Wrap gap10px wFit'>
              <label>Admin</label>
              <input type='checkbox' name='admin'/>
            </div>
            <div className='flex-Row-Wrap gap10px wFit'>
              <label>Farmer</label>
              <input type='checkbox' name='farmer'/>
            </div>
            <div className='flex-Row-Wrap gap10px wFit'>
              <label>Crops buyer</label>
              <input type='checkbox' name='cropsBuyer'/>
            </div>
            <div className='flex-Row-Wrap gap10px wFit'>
              <label>Resources seller</label>
              <input type='checkbox' name='resourcesSeller'/>
            </div>
          </div>
        </div>
        
      </div>
    </div> 
  )
}

function NotificationSettings(){

  const [toggleButton, setToggleButton] = useState({
    notificationConfigurations:true,
  });

  const toggleButtonAction = (buttonName)=>{
    setToggleButton((oldState)=>({
      ...oldState,
      [buttonName]:!oldState[buttonName]     
    }))  
  }
  const rotate360={
    transition:"all 0.5s ease-in",
    transform:'rotateX(360deg)',
  }
  const rotate180={
    transition:"all 0.5s ease-in",
    transform:'rotateX(180deg)',
  }
  const hide={
    transition:"all 0.5s ease-in",
    height:"0px",
    opacity:0,
    overflow:"hidden",
  }
  const show={
    borderBottom:"1px solid rgb(20, 168, 0)",
    padding:"10px 0px",
    height:"auto",
    opacity:1,
    overflow:"auto",
  }
  const users=[
    {
      id:1,
      fullname:"Juma Salum",
      phone:"0985123456",
      location:"Morogoro",
      emails:"jumasalum@gmail.com",
      pword:"12345678",
      role:"farmer",
    },
    {
      id:2,
      fullname:"Juma Salum",
      phone:"0985123456",
      location:"Morogoro",
      emails:"jumasalum@gmail.com",
      pword:"12345678",
      role:"farmer",
    },
    {
      id:3,
      fullname:"Juma Salum",
      phone:"0985123456",
      location:"Morogoro",
      emails:"jumasalum@gmail.com",
      pword:"12345678",
      role:"farmer",
    }
  ]
  return(
    <div className='flex-Column-Grow-Gap'>
      <div onClick={()=>{toggleButtonAction("notificationConfigurations")}}  
      className='centered wFit p8px link midGreenBody gap10px' style={dropdown}>
        <span>Notification Configurations</span> 
        <BsArrowDownCircleFill style={toggleButton.notificationConfigurations ? rotate180 : rotate360 } 
        className='h4'/>
      </div>
      <div style={!toggleButton.notificationConfigurations ? hide : {...hide, ...show}} 
      className='flex-Column gap10px'>
        <p className='h4'>Crops Purchased</p>
        <div className='flex-Row-Wrap gap20px p25px' style={{backgroundColor:"rgb(200,200,200)"}}>
          <div className='flex-Row-Wrap gap10px wFit'>
            <label>Admin</label>
            <input type='checkbox' name='admin'/>
          </div>
          <div className='flex-Row-Wrap gap10px wFit'>
            <label>Farmer</label>
            <input type='checkbox' name='farmer'/>
          </div>
          <div className='flex-Row-Wrap gap10px wFit'>
            <label>Crops buyer</label>
            <input type='checkbox' name='cropsBuyer'/>
          </div>
          <div className='flex-Row-Wrap gap10px wFit'>
            <label>Resources seller</label>
            <input type='checkbox' name='resourcesSeller'/>
          </div>
        </div>

        <div className='flex-Column gap10px'>
          <p className='h4'> Resource Purchased</p>
          <div className='flex-Row-Wrap gap20px p25px' style={{backgroundColor:"rgb(200,200,200)"}}>
            <div className='flex-Row-Wrap gap10px wFit'>
              <label>Admin</label>
              <input type='checkbox' name='admin'/>
            </div>
            <div className='flex-Row-Wrap gap10px wFit'>
              <label>Farmer</label>
              <input type='checkbox' name='farmer'/>
            </div>
            <div className='flex-Row-Wrap gap10px wFit'>
              <label>Crops buyer</label>
              <input type='checkbox' name='cropsBuyer'/>
            </div>
            <div className='flex-Row-Wrap gap10px wFit'>
              <label>Resources seller</label>
              <input type='checkbox' name='resourcesSeller'/>
            </div>
          </div>
        </div>

        <div className='flex-Column gap10px'>
          <p className='h4'>New user sign-up</p>
          <div className='flex-Row-Wrap gap20px p25px' style={{backgroundColor:"rgb(200,200,200)"}}>
            <div className='flex-Row-Wrap gap10px wFit'>
              <label>Admin</label>
              <input type='checkbox' name='admin'/>
            </div>
            <div className='flex-Row-Wrap gap10px wFit'>
              <label>Farmer</label>
              <input type='checkbox' name='farmer'/>
            </div>
            <div className='flex-Row-Wrap gap10px wFit'>
              <label>Crops buyer</label>
              <input type='checkbox' name='cropsBuyer'/>
            </div>
            <div className='flex-Row-Wrap gap10px wFit'>
              <label>Resources seller</label>
              <input type='checkbox' name='resourcesSeller'/>
            </div>
          </div>
        </div>

        <div className='flex-Column gap10px'>
          <p className='h4'>User account deleted</p>
          <div className='flex-Row-Wrap gap20px p25px' style={{backgroundColor:"rgb(200,200,200)"}}>
            <div className='flex-Row-Wrap gap10px wFit'>
              <label>Admin</label>
              <input type='checkbox' name='admin'/>
            </div>
            <div className='flex-Row-Wrap gap10px wFit'>
              <label>Farmer</label>
              <input type='checkbox' name='farmer'/>
            </div>
            <div className='flex-Row-Wrap gap10px wFit'>
              <label>Crops buyer</label>
              <input type='checkbox' name='cropsBuyer'/>
            </div>
            <div className='flex-Row-Wrap gap10px wFit'>
              <label>Resources seller</label>
              <input type='checkbox' name='resourcesSeller'/>
            </div>
          </div>
        </div>
        
      </div>
    </div> 
  )
}

function HelpAndSupport(){

  const [toggleButton, setToggleButton] = useState({
    contactSupport:true,
    FAQs:true,
    feedback:false,
  });

  const toggleButtonAction = (buttonName)=>{
    setToggleButton((oldState)=>({
      ...oldState,
      [buttonName]:!oldState[buttonName]     
    }))  
  }
  const rotate360={
    transition:"all 0.5s ease-in",
    transform:'rotateX(360deg)',
  }
  const rotate180={
    transition:"all 0.5s ease-in",
    transform:'rotateX(180deg)',
  }
  const hide={
    transition:"all 0.5s ease-in",
    height:"0px",
    opacity:0,
    overflow:"hidden",
  }
  const show={
    borderBottom:"1px solid rgb(20, 168, 0)",
    padding:"10px 0px",
    height:"auto",
    opacity:1,
    overflow:"auto",
  }
  return(
    <div className='flex-Column-Grow-Gap'>
      {/* Header button CONTACT SUPPORT */}
      <div onClick={()=>{toggleButtonAction("contactSupport")}} 
      className='centered wFit p8px link midGreenBody gap10px' style={dropdown}>
        <span>Contact Support</span> 
        <BsArrowDownCircleFill style={toggleButton.contactSupport ? rotate180 : rotate360 }
        className='h4' />
      </div>
      {/* Hidden Desc */}
      <div style={!toggleButton.contactSupport ? hide : {...hide, ...show}} 
      className='flex-Column gap10px'>
        <p className='h4'>
          Use below contact info to reach us for any enquery 
          <span className='p1 pH10px midGreenText'>(Response is within 24hrs)</span> 
        </p>
        <div className='flex-Row-Wrap gap20px p25px' style={{backgroundColor:"rgb(200,200,200)"}}>
          <div className='flex-Row-Wrap gap10px wFit'>
            <span className='p1'>Email:</span>
            <span className='p2'>agrohub40@gmail.com</span>
            <span className='p1'>OR</span>
            <span className='p2'>agrohub63@gmail.com</span>
          </div>
          <div className='flex-Row-Wrap gap10px wFit'>
            <span className='p1'>Phone:</span>
            <span className='p2'>0727-777-879</span>
            <span className='p1'>OR</span>
            <span className='p2'>0695-969-111</span>
          </div>
        </div>
      </div>

      {/* Header button FAQs */}
      <div onClick={()=>{toggleButtonAction("FAQs")}} 
      className='centered wFit p8px link midGreenBody gap10px' style={dropdown}>
        <span>FAQs</span> 
        <BsArrowDownCircleFill style={toggleButton.FAQs ? rotate180 : rotate360 } 
        className='h4'/>
      </div>
      {/* Hidden Desc */}
      <div style={!toggleButton.FAQs ? hide : {...hide, ...show}} 
      className='flex-Column gap10px'>
        <p className='h4'>Have qns? Check answers for frequently asked questions (FAQs)</p>
        {/** Full list of Qns and Answrs below */}
        <div className='flex-Column gap20px p25px' style={{backgroundColor:"rgb(200,200,200)"}}>
          <div className='flex-Column gap10px '>
            <span className='p1'>1. Do I need to create an account to buy or sell?</span>
            <span className='p2 maxW700 p10px' 
            style={{boxShadow:"1px 2px 20px rgb(10,10,10)", borderRadius:"5px", backgroundColor:"rgb(250,250,250)"}}>
              <strong>Yes you need account to either buy or sell. </strong> 
              Visit our site <strong>agrohub.com</strong> then click signup button at
              the top navigation bar and fill the form to create your new account, then you'll be redirected to main 
              app where you can sell or buy your needs.
            </span>
          </div>

          <div className='flex-Column gap10px '>
            <span className='p1'>2. Do I need to create an account to buy or sell?</span>
            <span className='p2 maxW700 p10px' 
            style={{boxShadow:"1px 2px 20px rgb(10,10,10)", borderRadius:"5px", backgroundColor:"rgb(250,250,250)"}}>
              <strong>Yes you need account to either buy or sell. </strong> 
              Visit our site <strong>agrohub.com</strong> then click signup button at
              the top navigation bar and fill the form to create your new account, then you'll be redirected to main 
              app where you can sell or buy your needs.
            </span>
          </div>
          
          <div className='flex-Column gap10px '>
            <span className='p1'>3. Do I need to create an account to buy or sell?</span>
            <span className='p2 maxW700 p10px' 
            style={{boxShadow:"1px 2px 20px rgb(10,10,10)", borderRadius:"5px", backgroundColor:"rgb(250,250,250)"}}>
              <strong>Yes you need account to either buy or sell. </strong> 
              Visit our site <strong>agrohub.com</strong> then click signup button at
              the top navigation bar and fill the form to create your new account, then you'll be redirected to main 
              app where you can sell or buy your needs.
            </span>
          </div>

          <div className='flex-Column gap10px '>
            <span className='p1'>4. Do I need to create an account to buy or sell?</span>
            <span className='p2 maxW700 p10px' 
            style={{boxShadow:"1px 2px 20px rgb(10,10,10)", borderRadius:"5px", backgroundColor:"rgb(250,250,250)"}}>
              <strong>Yes you need account to either buy or sell. </strong> 
              Visit our site <strong>agrohub.com</strong> then click signup button at
              the top navigation bar and fill the form to create your new account, then you'll be redirected to main 
              app where you can sell or buy your needs.
            </span>
          </div>

        </div>
        {/** End of list of the Qns and Answrs */}
      </div>

      {/* Report Problem form*/}
      <div onClick={()=>{toggleButtonAction("feedback")}} 
      className='centered wFit p8px link midGreenBody gap10px' style={dropdown}>
        <span>Report Problem / Send Feedback</span> 
        <BsArrowDownCircleFill style={toggleButton.feedback ? rotate180 : rotate360 } 
        className='h4'/>
      </div>
      {/* Hidden Desc */}
      <div style={!toggleButton.feedback ? hide : {...hide, ...show}}  
      className='flex-Column gap20px'>
        <p className='h4'>Use the form below to report any issue or send user feedback to us</p>
        <form className='flex-Column gap20px p25px'style={{backgroundColor:"rgb(200,200,200)"}}>
          <div className='hFit flex-Row-Wrap-Gap centeredH'>
            <label className='w100px'>Problem title</label>
            <input type='text' name='title' className='minW200'
            placeholder='Eg: Cannot create crops sells' style={inputField} />
          </div>
          <div className='hFit flex-Row-Wrap-Gap centeredH'>
            <label className='w100px'>Full description</label>
            <textarea rows={5} className='wFull maxW700 p10px bRad5'
            style={{border:"0px solid red", boxShadow:"1px 1px 5px rgb(100,100,100)"}}></textarea>
          </div>
          <div className='flex-Row-Wrap-Gap centeredH'>
            <label className='w100px'>Screenshot (Optional)</label>
            <input type='file' name='photo' style={{display:"none"}} id='screenshot'/>
            <label htmlFor='screenshot' className='flex-Row-Wrap gap4px centered'>
              <span style={{backgroundColor:"rgba(8, 185, 76, 0.76)", padding:"5px 10px", borderRadius:"5px"}}>
                <FaPhotoFilm className='pureBlackText' style={{fontSize:"28px"}}/> 
              </span>
              <span>No file chosen</span>
            </label>
          </div>
          <button type='submit' name='submit' className='gap7px centered wFit'
          style={{...inputField, ...submitButton}}> <BsSendFill className='h4'/> Send feedback
          </button>
        </form>
      </div>

    </div>
  )
}

const dropdown={
  // border:"1px solid rgb(255,255,255)",
  color:"rgb(22, 22, 22)",
  borderRadius:"5px",
}
const hidden={
  borderBottom:"1px solid rgb(20, 168, 0)",
  padding:"10px 0px",
  transition:"all 0.5s ease-in",
}
const inputField={
  padding:"8px",
  backgroundColor:"rgb(255, 255, 255)",
  border:'0px solid red',
  borderRadius:"5px",
  boxShadow:"2px 1px 5px rgb(20,20,20)",
}
const submitButton={
  backgroundColor:"#f3bf4f",
  cursor:"pointer",
  border:"1px solid rgba(73, 60, 0, 0.6)",
}
