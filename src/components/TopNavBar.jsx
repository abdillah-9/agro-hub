import React from 'react'
import userPhoto from '../assets/african-man-harvesting-vegetables.jpg';

export default function TopNavBar() {
  return (
    <div className='w100vw pureWhiteBody h20vh flex-'>
        <img className='bRad50_parcent' width={60} height={50} src={userPhoto} />
        <span>Habari Salumu</span>
        
    </div>
  )
}
