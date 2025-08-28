import React, { useState } from 'react'
import Table from './Table'
import Sort from '../../components/Sort'
import Search from '../../components/Search'
import Form from './Form';
import MoreDetails from './MoreDetails';

export default function BuyCropsPage({calcWidth}) {
  const [shownData, setShownData] = useState("onsale");

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
        <div className='p10px link flex-Row gap4px centered' onClick={()=>setShownData("onsale")}
        style={shownData == "onsale"? {borderBottom:"4px solid rgb(120,120,120)",
        backgroundColor:"rgb(240,240,240)"} : {}}>
          Crops onsale 
          <span className='midGreenBody pureWhiteText p5_15px bRad20'>14</span>
        </div>
      </div>
      <div className='flex-Row-Wrap-Gap spaceBetween midWhiteBody p10px p2'>
        <Search/>
        <Sort/>
      </div>
      <div className='flex-Row-Grow-Wrap-Gap pureWhiteBody p10px' 
        style={{overflow:"auto", maxWidth: calcWidth, minHeight:"400px"}}>
        <Table shownData={shownData} />
        <Form/>
        <MoreDetails/>
      </div>
    </div>
  )
}
