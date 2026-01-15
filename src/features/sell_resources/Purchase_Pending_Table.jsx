import React, { useContext, useState } from 'react'
import { TfiPencilAlt, TfiTrash } from 'react-icons/tfi'
import { AppContext } from '../../pages/MainApp';
import demoPhoto from "../../assets/g2i needs.png"
import { PiImageBrokenThin } from 'react-icons/pi';
import { CgMoreVerticalO } from 'react-icons/cg';
import { BsCashStack, BsTrash } from 'react-icons/bs';
import { BiSolidTrash } from 'react-icons/bi';
import { LuTrash2 } from 'react-icons/lu';

export default function Purchase_Pending_Table({shownData, resources, setDeleteCard, deleteCard}) {
    const { sellResourcessForm, setSellResourcessForm, setShowOverlay, setRowToRemove } = useContext(AppContext);
    const [viewPhoto, setViewPhoto] = useState(false);

return (
    <div style={{width:"100%",overflow:"auto"}}>
        <table style={tableContainer}>
           <thead>
                <tr className='midWhiteBody h5'>
                    <th style={tCell}>NO</th>
                    <th style={tCell}>STATUS</th>
                    <th style={tCell}>PHOTO</th>
                    <th style={tCell}>DATE PURCHASED</th>
                    <th style={tCell}>RESOURCE NAME</th>
                    <th style={tCell}>QUANTITY PURCHASED</th>
                    <th style={tCell}>TOTAL COST</th>
                    <th style={tCell}>UNIT</th>
                    <th style={tCell}>SELLER</th>
                    <th style={tCell}>LOCATION</th>
                    <th style={tCell}>RECEIPT</th>
                    <th style={tCell}>ACTIONS</th>
                </tr>
           </thead>
           <tbody>
                { 
                    resources ?
                    resources.map((entry, val)=>
                    <tr key={val}>
                        <td style={tCell}>{val+1}</td>
                        <td style={tCell}>
                            <span
                            style={entry.status == "pending" ? 
                            {...actionButton, backgroundColor:"rgba(196, 1, 99, 0.38)"} : 
                            {...actionButton, backgroundColor:"#ffd76a"}}>
                                {entry.status}
                            </span>
                        </td>
                        <td style={tCell} >
                        {
                            entry?.resource_photo ? 
                            <div style={viewPhoto ? showPicSpace : {width:"100%",height:"100%"}} className='blur link'
                            onClick={()=>setViewPhoto(!viewPhoto)}>
                                <img src={'https://agrohub-backend.onrender.com/uploads/'+entry?.resource_photo} 
                                width={"70px"} height={"50px"} 
                                style={ viewPhoto ? showPic : {}}/>
                            </div> : 
                            <PiImageBrokenThin fontSize={35} />
                        }
                        </td>
                        <td style={tCell}>{new Date(entry.created_at).toLocaleDateString('en-Us',{
                            day:'2-digit', month:'short', weekday:'short', year:'numeric'
                        })}</td>
                        <td style={tCell}>{entry.resource_name}</td>
                        <td style={tCell}>{Number(entry.ordered_resource_quantity)}</td>
                        <td style={tCell}>{Number(entry.paid_amount)+"Tsh"}</td>
                        <td style={tCell}>{entry.unit}</td>
                        <td style={tCell}>{entry.fname+" "+entry.lname}</td>
                        <td style={tCell}>{entry.user_location}</td>
                        <td style={tCell}>{entry.purchase_receipt == "" ? "N/A" : entry.purchase_receipt}</td>
                        <td style={tCellActions}>
                            {/* <div onClick={()=>{setShowOverlay(true); setResourceMoreDetails(true);
                                setMore_details({
                                    resource_name: entry.resource_name,
                                    created_at: entry.created_at,
                                    ordered_resource_quantity: entry.ordered_resource_quantity,
                                    paid_amount: entry.paid_amount,
                                    unit: entry.unit,
                                    fname: entry.fname,
                                    lname: entry.lname,
                                    user_location: entry.user_location,
                                    purchase_receipt: entry.purchase_receipt,
                                    status: entry.status,
                                });
                            }}  
                                className='link p2 flex-Row centered gap4px'
                                style={{...actionButton, backgroundColor:"rgba(1, 196, 196, 0.45)"}}>
                                <CgMoreVerticalO fontSize={14}/> <span>More</span>
                            </div> */}
                            <i onClick={()=>{setDeleteCard(true); setShowOverlay(true);
                                setRowToRemove(entry.id); 
                                }} className='link centered p10px bRad20'
                                style={{gap:"3px", backgroundColor:'rgba(252, 16, 16, 0.65)'}}
                            >
                                <LuTrash2 fontSize={13}/> 
                                <span style={{fontStyle:'normal', fontWeight:700, fontSize:'11px'}}>
                                    Delete
                                </span>
                            </i>
                        </td>
                    </tr>
                    ):<tr></tr>
                }
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
const actionButton={
  backgroundColor:"rgba(79, 196, 1, 0.45)",
  padding:"8px 10px",
  borderRadius:"20px",
  fontWeight:500,
  fontSize:"12px",
  width:"fit-content"
}
const showPicSpace={
  position:"fixed",
  top:0,left:0,
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  width:"100vw",
  height:"100vh",
  zIndex:3,
}
const showPic={
    width:"80%",
    maxWidth:"600px",
    height:"60%",
    maxHeight:"500px",
    boxShadow:"12px 12px 20px rgb(15, 14, 3)",
}

