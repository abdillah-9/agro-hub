import React, { useContext, useEffect, useState } from 'react'
import { HiXCircle} from 'react-icons/hi2';
import { AppContext } from '../../pages/MainApp';
import { FaSquareXmark, FaUpload } from 'react-icons/fa6';
import { AuthContext } from '../../AuthProvider';

export default function Form() {
  const {editProfile, setEditProfile, setShowOverlay} = useContext(AppContext);
  const { userData, refetchAuthContext, setRefetchAuthContext } = useContext(AuthContext);
  const {
    user_id, user_fname, user_lname, username_or_email, phone_number,
    user_photo, user_location, user_password
  } = userData;
  const [loading, setLoading] = useState(false);
  const [file_name, setFile_name] = useState(user_photo);
  const [file_to_upload, setFile_to_upload] = useState(null);
  const calcHeight = editProfile ? "100vh" : "0vh";

  //Get current date
  const currentDate = new Date().toISOString().slice(0, 10);

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

  function restoration(e){
    setEditProfile(false);
    setShowOverlay(false);
    setFile_name(null);
  }

  function fileTracker(e){
    setFile_name(e.target.files[0].name);
    setFile_to_upload(e.target.files[0]);
  }

  async function update_profile(e){
    e.preventDefault();

    //validate inputs
    if(( file_to_upload != null ) && ( file_to_upload.size > (1024 * 1024) )){
      alert("File size should be less than 1MB");
    }
    if(e.target.user_fname.value.length < 1 || e.target.user_lname.value.length < 1 || 
      e.target.phone_number.value.length < 1 || e.target.username_or_email.value.length < 1 ||
      e.target.user_location.value.length < 1
    ){
      alert("all inputs should not be empty");
    }
    //create formData
    const formDataBody = new FormData(e.target);
    formDataBody.append('user_id',user_id);
    formDataBody.append('file_name', file_name);
    try{
      const res = await fetch('https://agrohub-backend.onrender.com/update_user_profile',{
      body: formDataBody,
      method:"POST"
    });

      if(res.ok){
        const data = await res.json();
        console.log("data is "+JSON.stringify(data));
        restoration();
        alert(data.message);
        setRefetchAuthContext(!refetchAuthContext);
      }
    
    }
    catch(err){
      console.log("Err "+err);
    }      
    finally{
      setLoading(false);
    }
  }

  async function update_password(e){
    e.preventDefault();

    //create formData
    const formDataBody = new FormData(e.target);
    formDataBody.append('user_password', user_password);
    formDataBody.append('user_id', user_id);

    try{
      const res = await fetch('https://agrohub-backend.onrender.com/update_user_password',{
      body: formDataBody,
      method:"POST"
    });

      if(res.ok){
        const data = await res.json();
        console.log("data is "+console.log(data));
        alert(data.message);
        setRefetchAuthContext(!refetchAuthContext);
      }
    
    }
    catch(err){
      alert(err);
    }      
    finally{
      setLoading(false);
    }
  }

  return (
    <div style={mainContainer}>
      {/* UPDATE FULL-PROFILE */}
      <form className='flex-Column-Grow-Gap' onSubmit={update_profile}>
        <div style={buttons}>
          <span style={cancel} onClick={restoration}><HiXCircle/></span>
        </div>
        <div className='h4 centered p10px'>Update User-profile</div>
        <div>
          <div className='flex-Row-Wrap'>
            <span style={props}>First name:</span>
            <input type={"text"} name='user_fname' style={values} defaultValue={user_fname}/>
          </div>
          <div className='flex-Row-Wrap'>
            <span style={props}>Last name:</span>
            <input type={"text"} name='user_lname' style={values} defaultValue={user_lname}/>
          </div>
          <div className='flex-Row-Wrap'>
            <span style={props}>Phone number:</span>
            <input type={"text"} name='phone_number' style={values} defaultValue={phone_number}/>
          </div>
          <div className='flex-Row-Wrap'>
            <span style={props}>Email:</span>
            <input type={"text"} name='username_or_email' style={values} defaultValue={username_or_email}/>
          </div>
          <div className='flex-Row-Wrap'>
            <span style={props}>Location:</span>
            <input type={"text"} name='user_location' style={values} defaultValue={user_location}/>
          </div>
          <div className='flex-Row-Wrap'>
            <span style={props}>Photo (Optional)</span>
            <input id='photo' style={{display:"none"}} type='file' name='user_photo' onChange={fileTracker}/>
            <label htmlFor='photo' style={{...values, flexDirection:"row"}} className='centeredH link'>
              {
                file_name ?
                <FaSquareXmark className='h4'
                  style={{backgroundColor:'white', color:'rgb(177, 10, 10)', flexShrink:0}}
                  onMouseDown={
                    (e)=>{setFile_name(null); setFile_to_upload(null);}
                  }
                />
                : 
                <FaUpload className='midGreenText h4'/>
              }
              <span style={{overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>
                {file_name || "No file chosen"}
              </span>
          </label>
          </div>
        </div>
        <div className='flex-Row-Wrap gap10px'>
          <button className='p10px bRad5 pureWhiteText p1 link' onClick={restoration}
          style={{border:"0px solid red", backgroundColor:"rgb(177, 10, 10)",}}>
            Cancel
          </button>
          <button type='submit' name='submit' className='p10px bRad5 pureWhiteText pureGreenBody p1 link' 
          style={{border:"0px solid red"}}>
            Apply Changes
          </button>
        </div>
      </form>
      
      {/* UPDATE PASSWORD FORM */}
      <form className='flex-Column-Grow-Gap' onSubmit={update_password}>
        <div className='h4 centered p10px' 
          style={{borderTop:"1px solid rgb(100,100,100)",paddingTop:"25px"}}>
          Update password
        </div>
        <div>
          <div className='flex-Row-Wrap'>
            <span style={props}>Old Password:</span>
            <input type={"password"} name='old_password' style={values} placeholder='Eg: ********'/>
          </div>
          <div className='flex-Row-Wrap'>
            <span style={props}>New Password:</span>
            <input type={"password"} name='new_password' style={values} placeholder='Eg: ********'/>
          </div>
          <div className='flex-Row-Wrap'>
            <span style={props}>Confirm new password:</span>
            <input type={"password"} name='cf_password' style={values} placeholder='Eg: ********'/>
          </div>
        </div>
        <div className='flex-Row-Wrap gap10px'>
          <button className='p10px bRad5 pureWhiteText p1 link' onClick={restoration}
          style={{border:"0px solid red", backgroundColor:"rgb(177, 10, 10)",}}>
            Cancel
          </button>
          <button type='submit' name='submit' className='p10px bRad5 pureWhiteText pureGreenBody p1 link' 
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