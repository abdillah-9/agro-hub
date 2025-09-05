import React from 'react'
import { CgInsertAfterO } from 'react-icons/cg'
import Table from './Table'
import Filter from '../../components/Filter'

export default function UserPage({calcWidth}) {
  return (
    <div className='midWhiteBody flex-Column-Grow h80vh'>
      <div className='flex-Row-Wrap midWhiteBody borderB paleWhiteBorder pV10px p3'>
        <div className='p10px'>View All <span className='midGreenBody pureWhiteText p5_15px bRad20'>20</span></div>
        <div className='p10px'>Pending <span className='midGreenBody pureWhiteText p5_15px bRad20'>6</span></div>
        <div className='p10px'>Sold <span className='midGreenBody pureWhiteText p5_15px bRad20'>9</span></div>
        <div className='p10px'>Not paid <span className='midGreenBody pureWhiteText p5_15px bRad20'>500</span></div>
      </div>
      <div className='flex-Row-Wrap-Gap spaceBetween midWhiteBody p10px p2'>
        <div className='flex-Row-Wrap centered pureBlackText gap4px bRad5 p8px midOrangeBody hoverChangeSize link'>
          <CgInsertAfterO className='h4'/> 
          <span className='p1'>Insert new</span>
        </div>
        <Filter/>
      </div>
      <div className='flex-Row-Grow-Wrap-Gap pureWhiteBody p10px' 
      style={{overflow:"auto", maxWidth: calcWidth}}>
        <Table/>
      </div>
    </div>
  )
}
