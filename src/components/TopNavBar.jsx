import React, { useContext } from 'react'
import userPhoto from '../assets/african-man-harvesting-vegetables.jpg';
import appLogo from '../assets/react.svg';
import { LuLogOut } from 'react-icons/lu';
import { IoCloseCircleOutline, IoListCircleOutline } from 'react-icons/io5';
import { AppContext } from '../pages/MainApp';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';

export default function TopNavBar() {
  const {showSideBar, setshowSidebar, showOverlay, setShowOverlay} = useContext(AppContext);
  const {userData, setUserData} = useContext(AuthContext);
  const {user_photo, user_fname, user_lname} = userData;
  const move = useNavigate();

  function menuAction(){
    setshowSidebar(!showSideBar);
    window.innerWidth > 720 ? setShowOverlay(false) : setShowOverlay(!showOverlay);
  } 
  async function logout_user(){
    try{
      const res = await fetch('https://agrohub-backend.onrender.com/logout', {
        method:"POST",
        credentials:'include',
      });

      if(res.ok){
        const data = await res.json();
        console.log('user log-out successful');
        setUserData({user_id:null, user_role:null});
      }
      else{
        console.log("Problem has occured in logout logic");
      }
    }
    catch(e){
      console.log("catched err "+e);
    }
  };

  {console.log("https://agrohub-backend.onrender.com/uploads/"+user_photo)}

  return (
    <div className='w100vw pureWhiteBody flex-Row-Grow-Wrap-Gap-Space_Between centeredH pH10px'>
      <div className='pureWhiteBody flex-Row-Wrap-Gap centeredH' style={{paddings:"15px 0px"}}>
        <img className='bRad50_parcent' width={60} height={50} style={{boxShadow:'1px 1px 10px black'}}
          src={user_photo ? "https://agrohub-backend.onrender.com/uploads/"+user_photo : userPhoto} />  
        <span className='h5' style={{fontSize:'15px', textTransform:'capitalize'}}>
          <b className='midGreenText'>Hello,</b> {user_fname+" "+user_lname}
        </span>
      </div>
      <div className='wFit pureWhiteBody flex-Row-Grow-Wrap-Gap-Space_Between centeredH pV10px'>
        {
          showSideBar ? 
          <IoCloseCircleOutline title='hide nav bar' className='midGreenText link' 
          onClick={menuAction} style={{fontSize:"27px"}}/>
          :
          <IoListCircleOutline title='show nav bar' className='midGreenText link' 
          onClick={menuAction} style={{fontSize:"27px"}} />
        }
        <div onClick={logout_user} className='midGreenBody pureWhiteText p2 p10px bRad20 link centered gap4px'>
          <LuLogOut className='h4'/><span>Logout</span>
        </div>
        <img src={appLogo} width={60} height={40} className='bRad50_parcent' />
      </div>
    </div>
  )
}
