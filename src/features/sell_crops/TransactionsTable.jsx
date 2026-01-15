import React, { useContext, useState } from 'react'
import { TfiPencilAlt, TfiTrash } from 'react-icons/tfi'
import { AppContext } from '../../pages/MainApp';
import demoPhoto from "../../assets/g2i needs.png"
import { LuTrash2 } from 'react-icons/lu';

export default function OnSalesTable({shownData, crops, setActivateRefresh}) {
    const { sellCropsForm, setSellCropsForm, setShowOverlay, setRowToRemove,
        setDeleteCard, deleteCard } = useContext(AppContext);
    const [viewPhoto, setViewPhoto] = useState(false);
return (
    <div style={{width:"100%",overflow:"auto"}}>
        <table style={tableContainer}>
           <thead>
                <tr className='midWhiteBody h5'>
                    <th style={tCell}>NO</th>
                    <th style={tCell}>PHOTO</th>
                    <th style={tCell}>DATE POSTED</th>
                    <th style={tCell}>CROP NAME</th>
                    <th style={tCell}>DESCRIPTION</th>
                    <th style={tCell}>UNIT</th>
                    <th style={tCell}>CROP QUANTITY</th>
                    <th style={tCell}>TOTAL AMOUNT PAID</th>
                    <th style={tCell}>BUYER</th>
                    <th style={tCell}>LOCATION</th>
                    <th style={tCell}>RECEIPT</th>
                    <th style={tCell}>STATUS</th>
                    <th style={tCell}>ACTIONS</th>
                </tr>
           </thead>
           <tbody>
            {console.log(" onsale_crops "+JSON.stringify(crops))}
            {
                crops ? crops.map((entry, index)=>
                <tr key={index} >
                    <td style={tCell}>{++index}</td>
                    <td style={tCell}>
                        <div style={viewPhoto ? showPicSpace : {width:"100%",height:"100%"}} className='blur link'
                        onClick={()=>setViewPhoto(!viewPhoto)}>
                            <img src={entry?.crop_photo ? 'https://agrohub-backend.onrender.com/uploads/'+entry?.crop_photo :
                                demoPhoto} 
                                width={"70px"} height={"50px"} alt={entry.photo_name} 
                            style={ viewPhoto? showPic : {}}/>
                        </div>
                    </td>
                    <td style={tCell}>{new Date(entry.created_at).toLocaleDateString(`en-Us`, {
                        day:'2-digit', month:'short', year:'numeric', weekday:'short'
                    })}</td>
                    <td style={tCell}>{entry.crop_name}</td>
                    <td style={tCell}>{entry.description || "N/A"}</td>
                    <td style={tCell}>{entry.unit}</td>
                    <td style={tCell}>{Number(entry.ordered_crop_quantity)}</td>
                    <td style={tCell}>{Number(entry.paid_amount)}</td>
                    <td style={tCell}>{entry.user_fname+" "+entry.user_lname}</td>
                    <td style={tCell}>{entry.user_location}</td>
                    <td style={tCell}>{entry.receipt || "N/A"}</td>
                    <td style={tCell}>
                        <span style={shownData == "pending" ? 
                            {...sellStatus, backgroundColor:"rgba(196, 1, 99, 0.38)"} : 
                            {...sellStatus, backgroundColor:"#ffd76a"}}>
                                {shownData}
                        </span>
                    </td>
                    <td style={tCellActions}>
                        {/* <i onClick={()=>{setSellCropsForm(true); setShowOverlay(true)}} className='link'>
                            <TfiPencilAlt/>
                        </i> */}
                        <i onClick={()=>{setDeleteCard(true); setActivateRefresh((prev=>!prev));
                            setShowOverlay(true); 
                            setRowToRemove({row_id:entry.id})}} className='link centered p10px bRad20'
                                style={{gap:"3px", backgroundColor:'rgba(252, 16, 16, 0.65)'}}
                        >
                                <LuTrash2 fontSize={13}/> 
                                <span style={{fontStyle:'normal', fontWeight:700, fontSize:'11px'}}>
                                    Delete
                                </span>
                        </i>
                    </td>
                </tr>) :<tr></tr>
            }
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
  padding:"30px 10px",
  width:"20%",
  minWidth:"100px",
  fontSize:"15px",
}
const sellStatus={
  backgroundColor:"rgba(79, 196, 1, 0.45)",
  padding:"5px 10px",
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
