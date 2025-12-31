import React, { useContext, useState} from 'react'
import { SiTicktick } from 'react-icons/si';
import { FaRegCircleXmark } from 'react-icons/fa6';
import { AppContext } from '../../pages/MainApp';
import { IoIosImages } from 'react-icons/io';
import { AuthContext } from '../../AuthProvider';

export default function ProfilePhoto() {
  const {profilePhoto, setProfilePhoto, setShowOverlay} = useContext(AppContext);
  const {userData, setUserData, refetchAuthContext, setRefetchAuthContext} = useContext(AuthContext);
  const {user_id} = userData;
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const deleteContainer={
    boxShadow:"1px 2px 25px rgb(10,10,10)",
    padding:"20px 15px",
    backgroundColor:"white",
    display:"flex",
    flexDirection:"column",
    gap:"17px",
    width:'calc(100vw - 15px)',
    maxWidth:"500px",
    position: "fixed",
    top: profilePhoto ? "50%" : "100%",
    left: profilePhoto ? "50%" : "40%",
    scale: profilePhoto ? 1 : 0,
    opacity: profilePhoto ? 1 : 0,
    transform: "translate(-50%, -50%)",
    transition: "all 0.5s ease",
    zIndex:3,
  }
  const button={
    border:"0px solid rgb(0,0,0)",
  }

  function restoration(){
    setUploadedPhoto(null);
    setProfilePhoto(false);
    setLoading(false);
    setShowOverlay(false);
  }
  //Upload profile photo api
  async function updateProfilePhoto(e){
    e.preventDefault();

    //generate formData
    const photoFormData = new FormData(e.target);
    photoFormData.append('user_id', user_id);

    //validate file_input
    if(uploadedPhoto == null){
      return alert("Please select a photo to upload");     
    }
    if(( uploadedPhoto != null ) && ( uploadedPhoto.size > (1024 * 1024) )){
      return alert("File size should be less than 1MB");
    }    

    try{
      const res = await fetch('http://localhost:4000/update_profile_photo', {
        method:"POST",
        body: photoFormData,
      });
      if(res.ok){
        const data = await res.json();
        console.log("api res is "+data.status);      
        restoration();
        alert(data.message);
        setRefetchAuthContext(!refetchAuthContext);
      }
      else{
        alert("server failed to return response ...");
      }
    }
    catch(err){
      console.log("catched err is "+err);
      setLoading(false);
    }
    finally{
      setLoading(true);
    }
  }
  return (
    <div>
      {
        <form style={deleteContainer} onSubmit={updateProfilePhoto} >
          <div className='flex-Column gap10px centered' style={{textAlign:"center"}}>
            <span className='h4 p10px'>Click Icon below to upload new photo</span>
            <input type='file' style={{display:"none"}} name='profilePhoto' id='profilePhoto'
              onChange={(e)=>{setUploadedPhoto(e.target.files[0])}}            
            />
            <label htmlFor='profilePhoto' className='midGreenBody bRad50_parcent link' 
            style={{padding:"10px 14px"}} >
              <IoIosImages style={{fontSize:"50px",color:"rgb(7, 54, 1)"}}/>
            </label>
            <span>{uploadedPhoto? uploadedPhoto.name: "no file chosen"}</span>
          </div>
          <div className='flex-Row spaceBetween h3 gap10px'>
            <button onClick={()=>{setProfilePhoto(false); setShowOverlay(false)}} 
              type='button' className='centered gap7px p1 p10px link' 
              style={{backgroundColor:"rgba(189, 54, 31, 0.36)",color:"darkred",...button}}> 
              <FaRegCircleXmark  className='h4'/> Cancel
            </button>
            <button type='submit' className='centered gap7px p1 p10px link'
              style={{backgroundColor:"rgba(40, 153, 40, 0.35)",color:"darkgreen",...button}}> 
              <SiTicktick className='h4'/> Submit
            </button>
          </div>
        </form>
      }
    </div>
  )
}