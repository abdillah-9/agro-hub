import React, { useState } from 'react'
import Table from './Table'
import Sort from '../../components/Sort'
import { CgInsertAfterO } from 'react-icons/cg'
import { IoAddCircleOutline } from 'react-icons/io5'

export default function SellCropsPage({calcWidth}) {
  const [shownData, setShownData] = useState("dumped");

  return (
    <div className='midWhiteBody flex-Column-Grow h80vh'>
      <div className='flex-Row-Wrap midWhiteBody borderB paleWhiteBorder p3'>
        <div className='p10px link flex-Row gap4px centered' onClick={()=>setShownData("all")}
        style={shownData == "all"? {borderBottom:"4px solid rgb(120,120,120)",
        backgroundColor:"rgb(240,240,240)"} : {}}>
          View all  
          <span className='midGreenBody pureWhiteText p5_15px bRad20'>20</span>
        </div>
        <div className='p10px link flex-Row gap4px centered' onClick={()=>setShownData("purchased")}
        style={shownData == "purchased"? {borderBottom:"4px solid rgb(120,120,120)",
        backgroundColor:"rgb(240,240,240)"} : {}}>
          Crops purchased 
          <span className='midGreenBody pureWhiteText p5_15px bRad20'>6</span>
        </div>
        <div className='p10px link flex-Row gap4px centered' onClick={()=>setShownData("pending")}
        style={shownData == "pending"? {borderBottom:"4px solid rgb(120,120,120)",
        backgroundColor:"rgb(240,240,240)"} : {}}>
          Crops pending 
          <span className='midGreenBody pureWhiteText p5_15px bRad20'>14</span>
        </div>
        <div className='p10px link flex-Row gap4px centered' onClick={()=>setShownData("dumped")}
        style={shownData == "dumped"? {borderBottom:"4px solid rgb(120,120,120)",
        backgroundColor:"rgb(240,240,240)"} : {}}>
          Crops dumped 
          <span className='midGreenBody pureWhiteText p5_15px bRad20'>14</span>
        </div>
      </div>
      <div className='flex-Row-Wrap-Gap spaceBetween midWhiteBody p10px p2'>
        <div className='flex-Row-Wrap centered pureBlackText gap4px bRad5 p10px paleOrangeBody hoverChangeSize link'>
          <IoAddCircleOutline style={{fontSize:"16px", fontWeight:100}}/> 
          <span style={{fontSize:"13px",fontWeight:400}}>Upload crops to sell</span>
        </div>
        <Sort/>
      </div>
      <div className='flex-Row-Grow-Wrap-Gap pureWhiteBody p10px' style={{overflow:"auto", maxWidth: calcWidth}}>
        <Table shownData={shownData}/>
      </div>
    </div>
  )
}