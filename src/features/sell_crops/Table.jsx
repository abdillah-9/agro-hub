import React, { useContext, useState } from 'react'
import { TfiPencilAlt, TfiTrash } from 'react-icons/tfi'
import { AppContext } from '../../pages/MainApp';
import demoPhoto from "../../assets/g2i needs.png"

export default function Table({shownData}) {
    const { setShowOverlay,setBuyResourceForm,setResourceMoreDetails, } = useContext(AppContext);
    const [viewPhoto, setViewPhoto] = useState(false);

    const demoData = [
        {
            "id":1,
            "photo":"",
            "created_date":"12th Jun 2025",
            "crop_name":"Handhoe",
            "description":"",
            "quantity":26,
            "price":11000,
            "unit":"tone",
            "seller":"Jumbo Mwalutenge",
            "location":"Singida",
            "receipt":"",
            "status":"onsale",
        },
        {
            "id":2,
            "photo":"12334.jpg",
            "created_date":"12th Jun 2025",
            "crop_name":"Handhoe",
            "description":"",
            "quantity":26,
            "price":11000,
            "unit":"bottle",
            "seller":"Jumbo Mwalutenge",
            "location":"Singida",
            "receipt":"",
            "status":"onsale",
        },
        {
            "id":3,
            "photo":"",
            "created_date":"12th Jun 2025",
            "crop_name":"Handhoe",
            "description":"",
            "quantity":26,
            "price":11000,
            "unit":"kg",
            "seller":"Jumbo Mwalutenge",
            "location":"Singida",
            "receipt":"fgy.pdf",
            "status":"purchased",
        }
    ]
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
            {
                demoData ? demoData.map((entry, index)=>
                <tr key={index}>
                    <td style={tCell}>{index++}</td>
                    <td style={tCell}>
                        <div style={viewPhoto ? showPicSpace : {width:"100%",height:"100%"}} className='blur link'
                        onClick={()=>setViewPhoto(!viewPhoto)}>
                            <img src={demoPhoto} width={"70px"} height={"50px"} alt={entry.photo} 
                            style={ viewPhoto? showPic : {}}/>
                        </div>
                    </td>
                    <td style={tCell}>{entry.created_date}</td>
                    <td style={tCell}>{entry.crop_name}</td>
                    <td style={tCell}>{entry.description || "N/A"}</td>
                    <td style={tCell}>{entry.unit}</td>
                    <td style={tCell}>{entry.quantity}</td>
                    <td style={tCell}>{entry.price}</td>
                    <td style={tCell}>{entry.seller}</td>
                    <td style={tCell}>{entry.location}</td>
                    <td style={tCell}>{}aaa</td>
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