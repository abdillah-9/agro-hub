import { useContext, useState } from 'react'
import DashboardPage from '../features/Dashboards/DashboardPage'
import BuyResourcesPage from '../features/buy_resources/BuyResourcesPage'
import SellResourcesPage from '../features/sell_resources/SellResourcesPage'
import BuyCropsPage from '../features/buy_crops/BuyCropsPage'
import SellCropsPage from '../features/sell_crops/SellCropsPage'
import UserPage from '../features/Users/UserPage'
import SettingsPage from '../features/Settings/SettingsPage'
import { AppContext } from '../pages/MainApp'
import { useLocation } from 'react-router-dom'

export default function MiniMainApp() {
  const {showSideBar,activeMenu} = useContext(AppContext);
  const location = useLocation();
  const urlPath = location.pathname;
  
  let calcWidth ="";
  showSideBar? calcWidth = "calc(100vw - 125px)" : calcWidth = "100vw";
  console.log("active menu inside minimainapp is "+activeMenu)

  return (
    <div className='flex-Column-Grow h80vh' style={{backgroudColor:"rgb(245, 255, 238)"}}>
      {
        urlPath.includes("dashboard") ? <DashboardPage calcWidth={calcWidth}/> :
        urlPath.includes("buy_resources") ? <BuyResourcesPage calcWidth={calcWidth}/> :
        urlPath.includes("sell_resources") ? <SellResourcesPage calcWidth={calcWidth}/> :
        urlPath.includes("buy_crops") ? <BuyCropsPage calcWidth={calcWidth}/> :
        urlPath.includes("sell_crops") ? <SellCropsPage calcWidth={calcWidth}/> :
        urlPath.includes("user") ? <UserPage calcWidth={calcWidth}/> :
        urlPath.includes("settings") ? <SettingsPage calcWidth={calcWidth}/> :
        urlPath.includes("test") && <SettingsPage calcWidth={calcWidth}/>
      }
    </div>
  )
}
