import React from 'react'
import { MdCancel } from 'react-icons/md'

export default function Overlay({showOverlay, setShowOverlay, setshowSidebar}) {

  return (
    <div onClick={()=>{setShowOverlay(false); setshowSidebar(false)}}>
        {
            showOverlay &&
            <div className='blur display_none' 
            style={overlay}>
                <MdCancel style={{color:"red", backgroundColor:"white",padding:"1px",
                width:"25px",height:"25px", boxShadow:"1px 2px 15px rgb(0, 0, 0)"}}
                className='bRad50_parcent link display_none' />
            </div>
        }
    </div>
  )
}
const overlay={
    justifyContent:"flex-end", 
    position:"fixed",
    height:"100vh",
    width:"100vw",
    top:0, 
    left:0,
    padding:"10px",
    zIndex:2,
}
