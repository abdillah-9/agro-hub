import React, { useContext, useState } from 'react'
import { TfiPencilAlt, TfiTrash } from 'react-icons/tfi'
import { AppContext } from '../../pages/MainApp';
import demoPhoto from "../../assets/g2i needs.png"
import { PiImageBrokenThin } from 'react-icons/pi';

export default function Sells_Table({shownData, resources, setFormData, setDeleteCard, deleteCard }) {
    const { setRowToRemove ,setSellResourceForm, setShowOverlay} = useContext(AppContext);
    const [viewPhoto, setViewPhoto] = useState(false);

    console.log(shownData+' resources '+resources);

return (
    <div style={{width:"100%",overflow:"auto"}}>
        <table style={tableContainer}>
           <thead>
                <tr className='midWhiteBody h5'>
                    <th style={tCell}>NO</th>
                    <th style={tCell}>PHOTO</th>
                    <th style={tCell}>DATE POSTED</th>
                    <th style={tCell}>PRODUCT NAME</th>
                    <th style={tCell}>DESCRIPTION</th>
                    <th style={tCell}>UNIT</th>
                    <th style={tCell}>TOTAL QUANTITY</th>
                    <th style={tCell}>MINIMUM SELLABLE QUANTITY</th>
                    <th style={tCell}>PRICE OF MINIMUM SELLABLE QUANTITY</th>
                    <th style={tCell}>SELLER</th>
                    <th style={tCell}>LOCATION</th>
                    <th style={tCell}>RECEIPT</th>
                    <th style={tCell}>STATUS</th>
                    <th style={tCell}>ACTIONS</th>
                </tr>
           </thead>
           <tbody>
            {
                resources.length > 0 ? resources.map((entry, index)=>
                <tr key={index}>
                    <td style={tCell}>{++index}</td>
                    <td style={tCell}>
                        {
                            entry?.resource_photo ? 
                            <div style={viewPhoto ? showPicSpace : {width:"100%",height:"100%"}} className='blur link'
                            onClick={()=>setViewPhoto(!viewPhoto)}>
                                <img  src={'http://localhost:4000/uploads/'+entry?.resource_photo} 
                                    width={"70px"} height={"50px"} alt={entry.photo_name} 
                                    style={ viewPhoto? showPic : {}}
                                />
                            </div> 
                        :
                            <PiImageBrokenThin fontSize={35} />
                        }
                    </td>
                    <td style={tCell}>{new Date(entry.created_at).toLocaleDateString('en-Us',{
                        weekday:'short', day:'numeric', month:'short', year:'numeric'
                    })}</td>
                    <td style={tCell}>{entry.resource_name}</td>
                    <td style={tCell}>{entry.description || "N/A"}</td>
                    <td style={tCell}>{entry.unit}</td>
                    <td style={tCell}>{Number(entry.total_quantity)}</td>
                    <td style={tCell}>{Number(entry.minimum_sellable_quantity)}</td>
                    <td style={tCell}>{Number(entry.price_per_minimum_sellable_quantity)}</td>
                    <td style={tCell}>{entry.user_fname+" "+entry.user_lname}</td>
                    <td style={tCell}>{entry.user_location}</td>
                    <td style={tCell}>{entry.receipt || "N/A"}</td>
                    <td style={tCell}>
                        <span style={{...sellStatus, backgroundColor:"rgba(1, 196, 196, 0.45)"}}>
                            {'Onsale'}
                        </span>
                    </td>
                    <td style={tCellActions}>
                        <i onClick={()=>{setSellResourceForm(true); setShowOverlay(true);
                            setFormData({
                                row_id: entry.id,
                                resource_name: entry.resource_name,
                                description: entry.description,
                                unit: entry.unit,
                                total_quantity: entry.total_quantity,
                                minimum_sellable_quantity: entry.minimum_sellable_quantity,
                                price_per_minimum_sellable_quantity: entry.price_per_minimum_sellable_quantity,
                                resource_photo: entry.resource_photo,
                            });
                        }} className='link'>
                            <TfiPencilAlt/>
                        </i>
                        <i onClick={()=>{setDeleteCard(true); setShowOverlay(true); 
                            setRowToRemove(entry.id)}} className='link'>
                            <TfiTrash/>
                        </i>
                    </td>
                </tr>) :<tr className='centered p1 p10px wFull'></tr>
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
  padding:"20px 10px",
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