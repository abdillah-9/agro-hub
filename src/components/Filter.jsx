import React, { useState } from 'react'
import { BsFilter } from 'react-icons/bs';

export default function Filter() {
    const [filtered, setFiltered] = useState("");
    const [showDropDown , setShowDropDown] = useState(false);
  return (
    <div onClick={()=>{setShowDropDown(!showDropDown)}} 
        className='p10px bRad5 midBlueBody pureWhiteText link hoverChangeSize' style={{width:"90px"}}>
        <div className='flex-Row-Wrap gap7px centeredH'>
           <BsFilter className='h3'/> <span>Filter</span>
        </div>
        {
            showDropDown && 
            <div style={{position:"absolute"}} className='flex-Column gap10px p10px midBlueBody'>
                <span onClick={()=>{setFiltered("by_name")}}>By name</span>
                <span onClick={()=>{setFiltered("by_status")}}>By status</span>
                <span onClick={()=>{setFiltered("by_date")}}>By date</span>
            </div>
        }
    </div>
  )
}
