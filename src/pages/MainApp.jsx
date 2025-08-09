import React from 'react'
import TopNavBar from '../components/TopNavBar'
import SideNavBar from '../components/SideNavBar'
import MiniMainApp from '../components/MiniMainApp'

export default function MainApp() {
  return (
    <div className='flex-Row-Grow-Wrap'>
      <TopNavBar/>
      <SideNavBar/>
      <MiniMainApp/>
    </div>
  )
}
