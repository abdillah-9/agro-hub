import React, { useState } from 'react'
import { FaSort } from 'react-icons/fa6';
import { TbPointFilled } from 'react-icons/tb';

export default function Sort() {
    const [sorted, setSorted] = useState("all");
    const [showDropDown , setShowDropDown] = useState(false);
  return (
    <div style={{height:"30px"}}>
        <div onClick={()=>{setShowDropDown(!showDropDown)}} 
            style={{fontSize:"14px",maxWidth:"90px",boxShadow:"1px 2px 10px rgb(20,20,20)"}}
            className='p10px bRad20 pureWhiteBody flex-Column gap10px'>
            <div className='flex-Row gap4px centeredH link'>
            <FaSort style={{fontWeight:400}}/> 
            <span style={{fontWeight:400}}>Sort</span>
            </div>
            {
                showDropDown && 
                <div style={{boxShadow:"1px 1px 10px rgba(20,20,20,0.8)", position:"relative",right:"30px",
                zIndex:"10", backgroundColor:"white",width:"130px"}} 
                className='flex-Column gap10px p10px p3 pureBlackText bRad5'>
                    <span onClick={()=>{setSorted("by_name")}} className='link'>
                        <TbPointFilled/>By product name
                    </span>
                    <span onClick={()=>{setSorted("by_price")}} className='link'>
                        <TbPointFilled/>By price
                    </span>
                    <span onClick={()=>{setSorted("by_date")}} className='link'>
                        <TbPointFilled/>By date posted
                    </span>
                    <span onClick={()=>{setSorted("by_location")}} className='link'>
                        <TbPointFilled/>By location
                    </span>
                </div>
            }
        </div>
    </div>
  )
}
