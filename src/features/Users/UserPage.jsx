import React, { useContext, useEffect, useState } from 'react';
import background from '../../assets/african-man-harvesting-vegetables.jpg';
import { LiaUserEditSolid } from 'react-icons/lia';
import Form from './Form';
import { AppContext } from '../../pages/MainApp';
import ProfilePhoto from './ProfilePhoto';
import { AuthContext } from '../../AuthProvider';

export default function UserPage({calcWidth}) {
  const { setProfilePhoto, setEditProfile,setShowOverlay} = useContext(AppContext);
  const { userData } = useContext(AuthContext);
  const {
    user_fname, user_lname, user_location, username_or_email, phone_number, user_photo, user_role
  } = userData;

  const mainStyle={
    overflow:"auto", 
    maxWidth: calcWidth, 
    backgroundImage: `URL(${background})`, 
    backgroundSize:"cover",
    backgroundRepeat:"no-repeat",
  }

  return (
    <div className='midWhiteBody flex-Column-Grow h80vh'>
      <div className='flex-Row-Grow-Wrap-Gap pureWhiteBody' 
      style={mainStyle}>
        <div className='paleBlackBody wFull hFull centered blur' style={{padding:"30px 0px"}}>
          <div style={card}>
            <div style={upper}>
              <img src={user_photo ? 'http://localhost:4000/uploads/'+user_photo : background} 
              width={150} height={140} alt='user photo' style={image} 
              onClick={()=>{setProfilePhoto(true); setShowOverlay(true)}}/>
            </div>
            <div className='flex-Column-Gap p10px pureWhiteText p2'>
              {
                <section>
                  <div style={editUserBody}>
                    <button onClick={()=>{setEditProfile(true); setShowOverlay(true)}}
                    className='flex-Row-Wrap p10px gap4px centered link' style={button}>
                      <LiaUserEditSolid style={{fontSize:"22px"}}/>
                      <span>Edit profile</span>
                    </button>
                  </div>
                  <div className='flex-Row-Wrap-Gap centeredH p10px'>
                    <span className='w100px'>fullName: </span>
                    <span style={{...value, minWidth:"200px", textAlign:'center'}}>{user_fname+" "+user_lname}</span>
                  </div>
                  <div className='flex-Row-Wrap-Gap centeredH p10px'>
                    <span className='w100px'>Phone: </span>
                    <span style={{...value, minWidth:"200px", textAlign:'center'}}>{phone_number}</span>
                  </div>
                  <div className='flex-Row-Wrap-Gap centeredH p10px'>
                    <span className='w100px'>Location: </span>
                    <span style={{...value, minWidth:"200px", textAlign:'center'}}>{user_location}</span>
                  </div>
                  <div className='flex-Row-Wrap-Gap centeredH p10px'>
                    <span className='w100px'>Email: </span>
                    <span style={{...value, minWidth:"200px", textAlign:'center'}}>{username_or_email}</span>
                  </div>
                </section>
              }
            </div>
          </div>
        </div>
      </div>
      <Form/>
      <ProfilePhoto/>
    </div>
  )
}

const card={
  backgroundColor:"rgba(253, 253, 253, 0.36)",
  borderRadius:"10px",
  maxWidth:"700px",
  width:"90%",
}
const upper={
  backgroundImage:`url(${background})`,
  backgroundSize:"cover",
  marginBottom:20,
  borderRadius:'10px 10px 0px 0px',
  borderBottom:"1px solid white",
}
const image={
  transform: "translate(15px, 50%)",
  borderRadius:"50%",
  border:"1px solid white",
  cursor:"pointer",
  boxShadow:'1px 1px 30px black'
}
const editUserBody={
  display:"flex",
  justifyContent:'flex-end', 
  borderBottoma:"1px solid rgba(200, 200, 200, 0.57)",
  marginBottom:"20px",
}
const button={
  backgroundColor:"white",
  border:"0px solid white",
}
const value={
  border:"1px solid rgba(255, 255, 255, 0.7)",
  padding:"10px",
  borderRadius:"20px",
  minWidth:"100px",
  fontSize:'16px'
}
