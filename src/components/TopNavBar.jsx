import React, { useContext } from 'react'
import userPhoto from '../assets/african-man-harvesting-vegetables.jpg';
import appLogo from '../assets/react.svg';
import { LuLogOut } from 'react-icons/lu';
import { IoCloseCircleOutline, IoListCircleOutline } from 'react-icons/io5';
import { AppContext } from '../pages/MainApp';

export default function TopNavBar() {
  const {showSideBar, setshowSidebar, showOverlay, setShowOverlay} = useContext(AppContext);

  function menuAction(){
    setshowSidebar(!showSideBar);
    window.innerWidth > 720 ? setShowOverlay(false) : setShowOverlay(!showOverlay);
  } 

  return (
    <div className='w100vw pureWhiteBody flex-Row-Grow-Wrap-Gap-Space_Between centeredH pH10px'>
      <div className='pureWhiteBody flex-Row-Wrap-Gap centeredH'>
        <img className='bRad50_parcent' width={60} height={50} src={userPhoto} />
        <span className='p2'>Habari, Salumu</span>
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
        <div className='midGreenBody pureWhiteText p2 p10px bRad20 link centered gap4px'>
          <LuLogOut className='h4'/><span>Logout</span>
        </div>
        <img src={appLogo} width={60} height={40} className='bRad50_parcent' />
      </div>
    </div>
  )
}
