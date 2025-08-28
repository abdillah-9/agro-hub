import React from 'react'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi2'

export default function Table() {
return (
    <div style={{minWidth:"fit-content", overflow:"auto", maxWidth: "calc(100vw - 100px)"}}>
        <table style={tableContainer}>
           <thead>
                <tr className='midWhiteBody h5'>
                    <th style={tCell}>CREATED DATE</th>
                    <th style={tCell}>AGE</th>
                    <th style={tCell}>LAST PERIOD</th>
                    <th style={tCell}>STATUS</th>
                    <th style={tCell}>ACTIONS</th>
                </tr>
           </thead>
           <tbody>
                <tr>
                    <td style={tCell}>testing</td>
                    <td style={tCell}>testing</td>
                    <td style={tCell}>testing</td>
                    <td style={tCell}>testing</td>
                    <td style={tCellActions}>
                        <i onClick={()=>editAction(ovulationRow)} className='link'>
                            <HiOutlinePencil/>
                        </i>
                        <i onClick={()=>deleteAction(ovulationRow.id)} className='link'>
                            <HiOutlineTrash/>
                        </i>
                    </td>
                </tr>
           </tbody>
        </table>
    </div>
  )
}

//Css
const tableContainer={
  fontSize:"14px",
  border:"0.5px solid rgb(200,200,200)",
  width:"100%",
  height:"fit-content",
  borderCollapse:"collapse",
}
const tCell={
  padding:"10px",
  width:"20%",
  minWidth:"100px",
  textAlign:"left",
}
const tCellActions={
  display:"flex",
  gap:"10px",
  justifyContent:"flex-start",
  padding:"20px 10px",
  width:"20%",
  minWidth:"100px",
}
const status={
  padding:"5px 10px",
  borderRadius:"20px",
  fontWeight:500,
  fontSize:"13px",
  width:"fit-content"
}

const iconStyle={
  fontSize:"25px",
  color:"rgba(53, 44, 65, 0.67)",
}
const dataNotFound={
  display:"flex",
  alignItems:"center",
}
