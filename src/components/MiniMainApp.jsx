import React from 'react'
import { BiFilterAlt, BiSearchAlt } from 'react-icons/bi'
import Table from './Table'

export default function MiniMainApp() {
  return (
    <div className='midWhiteBody flex-Column-Grow-Gap h80vh'>
      <div className='flex-Row-Wrap midWhiteBody borderB paleWhiteBorder pV10px'>
        <div className='p10px'>View All <span className='midGreenBody pureWhiteText p5_15px bRad20'>20</span></div>
        <div className='p10px'>Pending <span className='midGreenBody pureWhiteText p5_15px bRad20'>6</span></div>
        <div className='p10px'>Sold <span className='midGreenBody pureWhiteText p5_15px bRad20'>9</span></div>
        <div className='p10px'>Not paid <span className='midGreenBody pureWhiteText p5_15px bRad20'>500</span></div>
      </div>
      <div className='flex-Row-Wrap-Gap spaceBetween midWhiteBody p10px'>
        <span>Insert new</span>
        <select>
          <option><BiFilterAlt/> Filter</option>
          <option value={"name"}>By name</option>
          <option value={"date"}>By date</option>
          <option value={"status"}>By status</option>
        </select>
      </div>
      <div className='flex-Row-Grow-Wrap-Gap pureWhiteBody'>
        <Table/>
      </div>
    </div>
  )
}
