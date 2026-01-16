import React, { useContext} from 'react'
import { GiPlantSeed } from 'react-icons/gi';
import { HiMiniUser} from 'react-icons/hi2';
import { MdSettingsSuggest } from 'react-icons/md';
import { PiFlowerLotusFill, PiTractorFill } from 'react-icons/pi';
import { SiHomeadvisor } from 'react-icons/si';
import { AppContext } from '../pages/MainApp';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SideNavBar() {
  //get current URL 
  const location = useLocation();
  const urlPath = location.pathname;
  const {showSideBar, activeMenu, setActiveMenu, setshowSidebar, setShowOverlay} = useContext(AppContext);
  const activeBackground = `linear-gradient(135deg, #f3bf4f 85%, rgb(29, 29, 29) 86%, rgb(29, 29, 29) 100%)`;

  const navigateTo = useNavigate();
  function menuAction(link_value){
    setActiveMenu(link_value);
    window.innerWidth > 720 ? setshowSidebar(true) : setshowSidebar(false); setShowOverlay(false);
    navigateTo('/mainApp/'+link_value);
  }
  
  return (
    <div>
      {
        showSideBar ? 
        <div className='flex-Column w100vw maxW100 h80vh midGreenBody pureWhiteText resPosit-Width' 
        style={{overflow:"auto", boxShadow:"0px 1px 5px rgb(10,10,10)", zIndex:3}}>
          <div className='flex-Column gap4px centered pV10px h100px borderB pureWhiteBorder link '
          style={urlPath.includes("dashboard") ? {color:"rgb(29, 29, 29)", background:activeBackground} : {}}
          onClick={()=>{menuAction("dashboard");}}>
            <SiHomeadvisor className='h3'/>
            <span className="p3">Home</span>
          </div>
          <div className='flex-Column gap4px centered pV10px h100px borderB pureWhiteBorder link '
          style={urlPath.includes("buy_resources") ? {color:"rgb(29, 29, 29)", background:activeBackground} : {}}
          onClick={()=>{menuAction("buy_resources")}}>
            <PiTractorFill className='h3'/>
            <span className="p3">Buy resources</span>
          </div>
          <div className='flex-Column gap4px centered pV10px h100px borderB pureWhiteBorder link '
          style={urlPath.includes("buy_crops") ? {color:"rgb(29, 29, 29)", background:activeBackground} : {}}
          onClick={()=>{menuAction("buy_crops")}}>
            <PiFlowerLotusFill className='h3'/>
            <span className="p3">Buy Crops</span>
          </div>
          <div className='flex-Column gap4px centered pV10px h100px borderB pureWhiteBorder link '
          style={urlPath.includes("sell_crops") ? {color:"rgb(29, 29, 29)", background:activeBackground} : {}}
          onClick={()=>{menuAction("sell_crops")}}>
            <GiPlantSeed className='h3'/>
            <span className="p3">Sell crops</span>
          </div>
          <div className='flex-Column gap4px centered pV10px h100px borderB pureWhiteBorder link '
          style={urlPath.includes("sell_resources") ? {color:"rgb(29, 29, 29)", background:activeBackground} : {}}
          onClick={()=>{menuAction("sell_resources")}}>
            <PiTractorFill className='h3'/>
            <span className="p3">Sell resources</span>
          </div>
          <div className='flex-Column gap4px centered pV10px h100px borderB pureWhiteBorder link '
          style={urlPath.includes("user") ? {color:"rgb(29, 29, 29)", background:activeBackground} : {}}
          onClick={()=>{menuAction("user")}}>       
           <HiMiniUser className='h3'/>
            <span className="p3">User</span>
          </div>
          <div className='flex-Column gap4px centered pV10px h100px borderB pureWhiteBorder link '
          style={urlPath.includes("settings") ? {color:"rgb(29, 29, 29)", background:activeBackground} : {}}
          onClick={()=>{menuAction("settings")}}>       
            <MdSettingsSuggest className='h3'/>
            <span className="p3">Settings</span>
          </div>
          
          {/** THIS IS TEMPORARY SPACE FOR EXERCISES */}
          <div className='flex-Column gap4px centered pV10px h100px borderB pureWhiteBorder link '
          style={urlPath.includes("test") ? {color:"rgb(29, 29, 29)", background:activeBackground} : {}}
          onClick={()=>{menuAction("test")}}>       
            <MdSettingsSuggest className='h3'/>
            <span className="p3">Test</span>
          </div>

        </div>
    : 
    <div></div>
      }
    </div>
  )
}
