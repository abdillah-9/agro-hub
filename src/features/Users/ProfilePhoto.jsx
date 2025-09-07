import React, { useContext} from 'react'
import { SiTicktick } from 'react-icons/si';
import { FaRegCircleXmark } from 'react-icons/fa6';
import { AppContext } from '../../pages/MainApp';
import { RiImageCircleAiLine } from 'react-icons/ri';
import { IoIosImages } from 'react-icons/io';

export default function ProfilePhoto() {
  const {profilePhoto, setProfilePhoto, setShowOverlay} = useContext(AppContext);

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
  return (
    <div>
      {
        <div style={deleteContainer}>
          <div className='flex-Column gap10px centered' style={{textAlign:"center"}}>
            <span className='h4 p10px'>Click Icon below to upload new photo</span>
            <input type='file' style={{display:"none"}} name='profilePhoto' id='profilePhoto'/>
            <label htmlFor='profilePhoto' className='midGreenBody bRad50_parcent link' 
            style={{padding:"10px 14px"}}>
              <IoIosImages style={{fontSize:"50px",color:"rgb(7, 54, 1)"}}/>
            </label>
          </div>
          <div className='flex-Row spaceBetween h3 gap10px'>
            <button onClick={()=>{setProfilePhoto(false); setShowOverlay(false)}} 
              type='button' className='centered gap7px p1 p10px link' 
              style={{backgroundColor:"rgba(189, 54, 31, 0.36)",color:"darkred",...button}}> 
              <FaRegCircleXmark  className='h4'/> Cancel
            </button>
            <button onClick={()=>{setProfilePhoto(false); setShowOverlay(false)}}
              type='button' className='centered gap7px p1 p10px link'
              style={{backgroundColor:"rgba(40, 153, 40, 0.35)",color:"darkgreen",...button}}> 
              <SiTicktick className='h4'/> Submit
            </button>
          </div>
        </div>
      }
    </div>
  )
}
