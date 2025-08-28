import React, { useContext} from 'react'
import { GiPlantSeed } from 'react-icons/gi';
import { HiMiniUser} from 'react-icons/hi2';
import { MdSettingsSuggest } from 'react-icons/md';
import { PiFlowerLotusFill, PiTractorFill } from 'react-icons/pi';
import { SiHomeadvisor } from 'react-icons/si';
import { AppContext } from '../pages/MainApp';

export default function SideNavBar() {
  const {showSideBar, activeMenu, setActiveMenu, setshowSidebar, setShowOverlay} = useContext(AppContext);
  const activeBackground = `linear-gradient(135deg, #f3bf4f 85%, rgb(29, 29, 29) 86%, rgb(29, 29, 29) 100%)`;

  function menuAction(link_value){
    setActiveMenu(link_value);
    window.innerWidth > 720 ? setshowSidebar(true) : setshowSidebar(false); setShowOverlay(false);
  }
  
  return (
    <div>
      {
        showSideBar ? 
        <div className='flex-Column w100vw maxW100 h80vh midGreenBody pureWhiteText resPosit-Width' 
        style={{overflow:"auto", boxShadow:"0px 1px 5px rgb(10,10,10)", zIndex:3}}>
          <div className='flex-Column gap4px centered pV10px h100px borderB pureWhiteBorder link '
          style={activeMenu == "dashboard" ? {color:"rgb(29, 29, 29)", background:activeBackground} : {}}
          onClick={()=>{menuAction("dashboard")}}>
            <SiHomeadvisor className='h3'/>
            <span className="p3">Home</span>
          </div>
          <div className='flex-Column gap4px centered pV10px h100px borderB pureWhiteBorder link '
          style={activeMenu == "buy resources" ? {color:"rgb(29, 29, 29)", background:activeBackground} : {}}
          onClick={()=>{menuAction("buy resources")}}>
            <PiTractorFill className='h3'/>
            <span className="p3">Buy resources</span>
          </div>
          <div className='flex-Column gap4px centered pV10px h100px borderB pureWhiteBorder link '
          style={activeMenu == "buy crops" ? {color:"rgb(29, 29, 29)", background:activeBackground} : {}}
          onClick={()=>{menuAction("buy crops")}}>
            <PiFlowerLotusFill className='h3'/>
            <span className="p3">Buy Crops</span>
          </div>
          <div className='flex-Column gap4px centered pV10px h100px borderB pureWhiteBorder link '
          style={activeMenu == "sell crops" ? {color:"rgb(29, 29, 29)", background:activeBackground} : {}}
          onClick={()=>{menuAction("sell crops")}}>
            <GiPlantSeed className='h3'/>
            <span className="p3">Sell crops</span>
          </div>
          <div className='flex-Column gap4px centered pV10px h100px borderB pureWhiteBorder link '
          style={activeMenu == "sell resources" ? {color:"rgb(29, 29, 29)", background:activeBackground} : {}}
          onClick={()=>{menuAction("sell resources")}}>
            <PiTractorFill className='h3'/>
            <span className="p3">Sell resources</span>
          </div>
          <div className='flex-Column gap4px centered pV10px h100px borderB pureWhiteBorder link '
          style={activeMenu == "user" ? {color:"rgb(29, 29, 29)", background:activeBackground} : {}}
          onClick={()=>{menuAction("user")}}>       
           <HiMiniUser className='h3'/>
            <span className="p3">User</span>
          </div>
          <div className='flex-Column gap4px centered pV10px h100px borderB pureWhiteBorder link '
          style={activeMenu == "settings" ? {color:"rgb(29, 29, 29)", background:activeBackground} : {}}
          onClick={()=>{menuAction("settings")}}>       
            <MdSettingsSuggest className='h3'/>
            <span className="p3">Settings</span>
          </div>
        </div>
    : 
    <div></div>
      }
    </div>
  )
}
