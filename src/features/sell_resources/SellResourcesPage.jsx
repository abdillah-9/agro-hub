import React from 'react'
import Table from './Table'
import Sort from '../../components/Sort'
import { CgInsertAfterO } from 'react-icons/cg'
import { MdOutlineLibraryAdd } from 'react-icons/md'
import { IoAddCircleOutline, IoAddOutline } from 'react-icons/io5'

export default function SellResourcesPage({calcWidth}) {
  return (
    <div className='midWhiteBody flex-Column-Grow h80vh'>
      <div className='flex-Row-Wrap midWhiteBody borderB paleWhiteBorder p3'>
        <div className='p10px link flex-Row gap4px centered'>View All 
          <span className='midGreenBody pureWhiteText p5_15px bRad20'>180</span>
        </div>
        <div className='p10px link flex-Row gap4px centered'>Purchased products 
          <span className='midGreenBody pureWhiteText p5_15px bRad20'>50</span>
        </div>
        <div className='p10px link flex-Row gap4px centered'>Instore products 
          <span className='midGreenBody pureWhiteText p5_15px bRad20'>125</span>
        </div>
        <div className='p10px link flex-Row gap4px centered'>Expired products 
          <span className='midGreenBody pureWhiteText p5_15px bRad20'>5</span>
        </div>
      </div>
      <div className='flex-Row-Wrap-Gap spaceBetween midWhiteBody p10px p2'>
        <div className='flex-Row-Wrap centered pureBlackText gap4px bRad5 p10px paleOrangeBody hoverChangeSize link'>
          <IoAddCircleOutline style={{fontSize:"16px", fontWeight:100}}/> 
          <span style={{fontSize:"13px",fontWeight:400}}>Upload product to sell</span>
        </div>
        <Sort/>
      </div>
      <div className='flex-Row-Grow-Wrap-Gap pureWhiteBody p10px' style={{overflow:"auto", maxWidth: calcWidth}}>
        <Table/>
      </div>
    </div>
  )
}