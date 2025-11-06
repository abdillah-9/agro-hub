import { useContext, useState } from 'react'
import DashboardPage from '../features/Dashboards/DashboardPage'
import BuyResourcesPage from '../features/buy_resources/BuyResourcesPage'
import SellResourcesPage from '../features/sell_resources/SellResourcesPage'
import BuyCropsPage from '../features/buy_crops/BuyCropsPage'
import SellCropsPage from '../features/sell_crops/SellCropsPage'
import UserPage from '../features/Users/UserPage'
import SettingsPage from '../features/Settings/SettingsPage'
import { AppContext } from '../pages/MainApp'

export default function MiniMainApp() {
  const {showSideBar,activeMenu} = useContext(AppContext);
  
  let calcWidth ="";
  showSideBar? calcWidth = "calc(100vw - 125px)" : calcWidth = "100vw";
  console.log("active menu inside minimainapp is "+activeMenu)

  return (
    <div className='flex-Column-Grow h80vh' style={{backgroudColor:"rgb(245, 255, 238)"}}>
      {
        activeMenu == "dashboard" ? <DashboardPage calcWidth={calcWidth}/> :
        activeMenu == "buy resources" ? <BuyResourcesPage calcWidth={calcWidth}/> :
        activeMenu == "sell resources" ? <SellResourcesPage calcWidth={calcWidth}/> :
        activeMenu == "buy crops" ? <BuyCropsPage calcWidth={calcWidth}/> :
        activeMenu == "sell crops" ? <SellCropsPage calcWidth={calcWidth}/> :
        activeMenu == "user" ? <UserPage calcWidth={calcWidth}/> :
        activeMenu == "settings" && <SettingsPage calcWidth={calcWidth}/>
      }
    </div>
  )
}
