import React, { useContext } from 'react'
import { HiPhoto, HiXCircle } from 'react-icons/hi2';
import { AppContext } from '../../pages/MainApp';
import { RiUploadCloud2Fill } from 'react-icons/ri';
import { FaUpload } from 'react-icons/fa6';

export default function Form() {
  const {editProfile, setEditProfile, setShowOverlay} = useContext(AppContext);
  const calcHeight = editProfile ? "100vh" : "0vh";

  //Get current date
  const currentDate = new Date().toISOString().slice(0, 10);

  const demoData=[
    {
      fullName:"Feisal Juma",
      emails:"feiboy007@gmail.com",
      location:"Morogoro",
      phone:"0718007568",
      passwords:"12345678",
    }
  ];

  const mainContainer={
      zIndex:3,
      fontSize:"14px",
      overflow:"auto",
      position:"fixed",
      top:editProfile ? 0: "100vh",
      right: 0,
      opacity:editProfile ? 1: 1,
      padding:"15px",
      boxShadow:"1px 2px 15px rgb(20,20,20)",
      backgroundColor:"white",
      maxWidth:"700px",
      width:"100vw",
      height: calcHeight,
      transition: "all 0.5s ease",
      display:"flex",
      flexDirection:"column",
      gap:"15px",
  }

  function restoration(){
    setEditProfile(false);
    setShowOverlay(false);
  }

  return (
    <div style={mainContainer}>
      <form className='flex-Column-Grow-Gap'>
        <div style={buttons}>
          <span style={cancel} onClick={restoration}><HiXCircle/></span>
        </div>
        <div className='h4 centered p10px'>Update User-profile</div>
        <div>
          <div className='flex-Row-Wrap'>
            <span style={props}>Full name:</span>
            <input type={"text"} name='cropName' style={values} placeholder='Eg: Cotton'/>
          </div>
          <div className='flex-Row-Wrap'>
            <span style={props}>Phone number:</span>
            <input type={"text"} name='cropName' style={values} placeholder='Eg: Cotton'/>
          </div>
          <div className='flex-Row-Wrap'>
            <span style={props}>Email:</span>
            <input type={"text"} name='cropName' style={values} placeholder='Eg: Cotton'/>
          </div>
          <div className='flex-Row-Wrap'>
            <span style={props}>Location:</span>
            <input type={"text"} name='cropName' style={values} placeholder='Eg: Cotton'/>
          </div>
          <div className='flex-Row-Wrap'>
            <span style={props}>Photo (Optional)</span>
            <input id='photo' style={{display:"none"}} type='file' name='photo' />
            <label htmlFor='photo' style={{...values, flexDirection:"row"}} className='centeredH link'>
              <FaUpload className='midGreenText h4'/>
              <span>{"No file chosen"}</span>
          </label>
          </div>
        </div>
        <div className='flex-Row-Wrap gap10px'>
          <button className='p10px bRad5 pureWhiteText p1 link' onClick={restoration}
          style={{border:"0px solid red", backgroundColor:"rgb(177, 10, 10)",}}>
            Cancel
          </button>
          <button className='p10px bRad5 pureWhiteText pureGreenBody p1 link' 
          style={{border:"0px solid red"}}>
            Apply Changes
          </button>
        </div>
      </form>
      
      {/* UPDATE PASSWORD FORM */}
      <form className='flex-Column-Grow-Gap'>
        <div className='h4 centered p10px' style={{borderTop:"1px solid rgb(100,100,100)",paddingTop:"25px"}}>
          Update password
        </div>
        <div>
          <div className='flex-Row-Wrap'>
            <span style={props}>Old Password:</span>
            <input type={"text"} name='cropName' style={values} placeholder='Eg: Cotton'/>
          </div>
          <div className='flex-Row-Wrap'>
            <span style={props}>New Password:</span>
            <input type={"text"} name='cropName' style={values} placeholder='Eg: Cotton'/>
          </div>
          <div className='flex-Row-Wrap'>
            <span style={props}>Confirm new password:</span>
            <input type={"text"} name='cropName' style={values} placeholder='Eg: Cotton'/>
          </div>
        </div>
        <div className='flex-Row-Wrap gap10px'>
          <button className='p10px bRad5 pureWhiteText p1 link' onClick={restoration}
          style={{border:"0px solid red", backgroundColor:"rgb(177, 10, 10)",}}>
            Cancel
          </button>
          <button className='p10px bRad5 pureWhiteText pureGreenBody p1 link' 
          style={{border:"0px solid red"}}>
            Apply Changes
          </button>
        </div>
      </form>
    </div>
  )
}

const overlay={
}
const props={
  display:"flex",
  flexDirection:"column",
  gap:"10px",
  backgroundColor:"rgb(220,220,220)",
  padding:"10px",
  borderBottom:"1px solid rgb(100,100,100)",
  width:"100%",
  maxWidth:"300px",
}
const values={
  display:"flex",
  flexDirection:"column",
  gap:"10px",
  backgroundColor:"rgb(250,250,250)",
  padding:"10px",
  border:"0px solid rgba(0,0,0,0)",
  borderBottom:"1px solid rgb(100,100,100)",
  width:"100%",
  maxWidth:"300px",
}
const cancel={
  color:"rgb(177, 10, 10)",
  backgroundColor:"white",
  cursor:"pointer",
  fontSize:"40px",
}
const buttons={
  borderBottom: "1px solid rgb(180,180,180)",
}