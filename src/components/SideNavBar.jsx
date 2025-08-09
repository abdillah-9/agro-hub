import React from 'react'
import { FaTractor } from 'react-icons/fa6'
import { IoHome } from 'react-icons/io5'

export default function SideNavBar() {
  return (
    <div className='flex-Column gap10px p10px w100vw maxW100 midGreenBody pureWhiteText'>
      <div className='flex-Column gap10px centered pV10px'>
        <IoHome/>
        <span className="p3">Home</span>
      </div>
      <div className='flex-Column gap10px centered pV10px'>
        <FaTractor/>
        <span className="p3">Buy resources</span>
      </div>
      <div className='flex-Column gap10px centered pV10px'>
        <IoHome/>
        <span className="p3">Home</span>
      </div>
      <div className='flex-Column gap10px centered pV10px'>
        <FaTractor/>
        <span className="p3">Buy resources</span>
      </div>
    </div>
  )
}
