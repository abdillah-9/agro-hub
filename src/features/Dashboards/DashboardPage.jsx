import React from 'react'
import ReusableDashboard from './ReusableDashboard'

export default function DashboardPage({calcWidth}) {
  return (
    <div style={{width:calcWidth,height:"100%", backgroundColor:"rgb(240, 240, 240)"}}>
      <ReusableDashboard/>
    </div>
  )
}
