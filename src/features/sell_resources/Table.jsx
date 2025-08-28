import React from 'react'
import { TfiPencilAlt, TfiTrash } from 'react-icons/tfi'

export default function Table() {
return (
    <div style={{width:"100%",overflow:"auto"}}>
        <table style={tableContainer}>
           <thead>
                <tr className='midWhiteBody h5'>
                    <th style={tCell}>NO</th>
                    <th style={tCell}>DATE POSTED</th>
                    <th style={tCell}>CROP NAME</th>
                    <th style={tCell}>DESCRIPTION</th>
                    <th style={tCell}>UNIT</th>
                    <th style={tCell}>QUANTITY</th>
                    <th style={tCell}>PRICE</th>
                    <th style={tCell}>SELLER</th>
                    <th style={tCell}>LOCATION</th>
                    <th style={tCell}>RECEIPT</th>
                    <th style={tCell}>STATUS</th>
                    <th style={tCell}>ACTIONS</th>
                </tr>
           </thead>
           <tbody>
                <tr>
                    <td style={tCell}>1</td>
                    <td style={tCell}>2nd Oct 2024</td>
                    <td style={tCell}>Maize</td>
                    <td style={tCell}>N/A</td>
                    <td style={tCell}>Debe</td>
                    <td style={tCell}>60 Debe</td>
                    <td style={tCell}>12000Tsh per Debe</td>
                    <td style={tCell}>Mwangusha Lyondo</td>
                    <td style={tCell}>Morogoro</td>
                    <td style={tCell}>abc.pdf</td>
                    <td style={tCell}>
                        <span style={{...actionButton}}>Purchased</span>
                    </td>
                    <td style={tCellActions}>
                        <i onClick={()=>editAction(ovulationRow)} className='link'>
                            <TfiPencilAlt/>
                        </i>
                        <i onClick={()=>deleteAction(ovulationRow.id)} className='link'>
                            <TfiTrash/>
                        </i>
                    </td>
                </tr>
                <tr>
                    <td style={tCell}>2</td>
                    <td style={tCell}>2nd Oct 2024</td>
                    <td style={tCell}>Cloves</td>
                    <td style={tCell}>N/A</td>
                    <td style={tCell}>Kg</td>
                    <td style={tCell}>300 Kg</td>
                    <td style={tCell}>2000Tsh per Kg</td>
                    <td style={tCell}>Mariam Masawe</td>
                    <td style={tCell}>Zanzibar</td>
                    <td style={tCell}>N/A</td>
                    <td style={tCell}>
                        <span style={{...actionButton, backgroundColor:"rgba(1, 196, 196, 0.45)"}}>Pending</span>
                    </td>
                    <td style={tCellActions}>
                        <i onClick={()=>editAction(ovulationRow)} className='link'>
                            <TfiPencilAlt/>
                        </i>
                        <i onClick={()=>deleteAction(ovulationRow.id)} className='link'>
                            <TfiTrash/>
                        </i>
                    </td>
                </tr>
                <tr>
                    <td style={tCell}>3</td>
                    <td style={tCell}>22th Jan 2025</td>
                    <td style={tCell}>Tea</td>
                    <td style={tCell}>N/A</td>
                    <td style={tCell}>Tone</td>
                    <td style={tCell}>10 Tone</td>
                    <td style={tCell}>80000Tsh per Tone</td>
                    <td style={tCell}>Mariam Masawe</td>
                    <td style={tCell}>Kilimanjaro</td>
                    <td style={tCell}>N/A</td>
                    <td style={tCell}>
                        <span style={{...actionButton, backgroundColor:"rgba(196, 1, 99, 0.38)"}}>Dumped</span>
                    </td>
                    <td style={tCellActions}>
                        <i onClick={()=>editAction(ovulationRow)} className='link'>
                            <TfiPencilAlt/>
                        </i>
                        <i onClick={()=>deleteAction(ovulationRow.id)} className='link'>
                            <TfiTrash/>
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
  fontSize:"13px",
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
  fontSize:"15px",
}
const actionButton={
  backgroundColor:"rgba(79, 196, 1, 0.45)",
  padding:"5px 10px",
  borderRadius:"20px",
  fontWeight:500,
  fontSize:"12px",
  width:"fit-content"
}