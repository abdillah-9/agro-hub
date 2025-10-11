import React from 'react'
import FarmerDashboard from './FarmerDashboard'
import FarmerDashboard2 from '../../components/FarmerDashboard'
import BuyerDashboard from '../../components/BuyerDashboard'
// import SupplierDashboard from '../../components/SupplierDashboard'
// import BuyerDashboard2 from '../../components/BuyerDashboard2'

export default function DashboardPage() {
  return (
    <div style={{width:"100%", height:"100%", backgroundColor:"rgb(240, 240, 240)"}}>
       {/* <FarmerDashboard2/>
      <BuyerDashboard/>
      <BuyerDashboard2/>
      <SupplierDashboard/>  */}
      <FarmerDashboard/>
    </div>
  )
}
