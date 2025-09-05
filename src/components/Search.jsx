import React from 'react'
import { BsSearch } from 'react-icons/bs'

export default function Search() {
  return (
    <div className='pureWhiteBody hoverChangeSize flex-Row centered p1 hFit bRad20'>
        <i className='flex-Row centered paleOrangeBody' 
        style={{height:"40px",borderRadius:"20px 0px 0px 20px", width:"30px"}}>
           <BsSearch/> 
        </i>
        <input 
        type='search' 
        name='search' 
        placeholder='Search product to buy'
        style={search}
        
        />      
    </div>
  )
}
const search={
    border:"0px solid black",
    height:"40px",
    borderRadius:"0px 20px 20px 0px",
    padding:"0px 10px"
}
