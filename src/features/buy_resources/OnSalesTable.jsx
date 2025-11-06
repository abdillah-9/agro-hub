import React, { useContext, useState } from 'react'
import { BsCashStack } from 'react-icons/bs'
import { CgMoreVerticalO} from 'react-icons/cg'
import demoPhoto from "../../assets/g2i needs.png"
import { PiImageBrokenThin } from 'react-icons/pi'
import { AppContext } from '../../pages/MainApp'
import { AuthContext } from '../../AuthProvider'
import { BuyResourcesContext } from './BuyResourcesPage'

export default function OnSalesTable({shownData, resources}) {
    const { setShowOverlay,setBuyResourceForm,setResourceMoreDetails, } = useContext(AppContext);
    const {userData} = useContext(AuthContext);
    const {user_id} = userData;
    const {buy_resource_form, setBuy_resource_form, setMore_details} = useContext(BuyResourcesContext);
    const [viewPhoto, setViewPhoto] = useState(false);

    if(shownData != "onsale"){
        console.log("cannot show the sales table")
        return <div style={{display:'none'}}></div>
    }

    console.log(resources);

return (
    <div style={{width:"100%",overflow:"auto"}}>
        <table style={tableContainer}>
           <thead>
                <tr className='midWhiteBody h5'>
                    <th style={tCell}>NO</th>
                    <th style={tCell}>PHOTO</th>
                    <th style={tCell}>DATE POSTED</th>
                    <th style={tCell}>RESOURCE NAME</th>
                    <th style={tCell}>DESCRIPTION</th>
                    <th style={tCell}>AVAILABLE QUANTITY</th>
                    <th style={tCell}>PRICE</th>
                    <th style={tCell}>UNIT</th>
                    <th style={tCell}>SELLER</th>
                    <th style={tCell}>LOCATION</th>
                    <th style={tCell}>ACTIONS</th>
                </tr>
           </thead>
           <tbody>
                { 
                    resources && resources?.resources ?
                    resources?.resources.map((entry, val)=>
                    <tr key={val}>
                        <td style={tCell}>{val+1}</td>
                        <td style={tCell} >
                        {
                            entry?.resource_photo ? 
                            <div style={viewPhoto ? showPicSpace : {width:"100%",height:"100%"}} className='blur link'
                            onClick={()=>setViewPhoto(!viewPhoto)}>
                                <img src={'http://localhost:4000/uploads/'+entry?.resource_photo} 
                                width={"70px"} height={"50px"} 
                                style={ viewPhoto ? showPic : {}}/>
                            </div> : 
                            <PiImageBrokenThin fontSize={35} />
                        }
                        </td>
                        <td style={tCell}>{new Date(entry.created_at).toLocaleDateString('en-Us',{
                            weekday:'short', day:'numeric', month:'short', year:'numeric'
                        })}</td>
                        <td style={tCell}>{entry.resource_name}</td>
                        <td style={tCell}>{entry.description == "" ? "N/A" : entry.description}</td>
                        <td style={tCell}>{Number(entry.total_quantity)+entry?.unit}</td>
                        <td style={tCell}>
                            {
                                Number(entry.price_per_minimum_sellable_quantity) + "Tsh per "
                            }
                            {
                                entry.minimum_sellable_quantity == 0.25 ? "quatre "+entry.unit :
                                entry.minimum_sellable_quantity == 0.25 ? "half "+entry.unit : 
                                entry.minimum_sellable_quantity+' '+entry.unit
                            }
                        </td>
                        <td style={tCell}>{entry.unit}</td>
                        <td style={tCell}>{entry.user_fname+ " "+entry.user_lname}</td>
                        <td style={tCell}>{entry.user_location}</td>
                        <td style={tCellActions}>
                            <div onClick={()=>{setShowOverlay(true); setResourceMoreDetails(true);
                                setMore_details({
                                    public_id: Math.random()+"_"+entry.id,
                                    status: shownData,
                                    buyer_id: user_id,
                                    ordered_resource_id: entry.id,
                                    purchase_receipt:"N/A",
                                    created_at: entry.created_at,
                                    resource_name: entry.resource_name,
                                    total_quantity: entry.total_quantity,
                                    price_per_minimum_sellable_quantity: entry.price_per_minimum_sellable_quantity,
                                    minimum_sellable_quantity: entry.minimum_sellable_quantity,
                                    unit: entry.unit,
                                    fname: entry.user_fname,
                                    lname: entry.user_lname,
                                    description: entry.description,
                                    user_location: entry.user_location    
                                });
                            }}  
                                className='link p2 flex-Row centered gap4px'
                                style={{...actionButton, backgroundColor:"rgba(1, 196, 196, 0.45)"}}>
                                <CgMoreVerticalO fontSize={14}/> <span>More</span>
                            </div>
                            <div onClick={()=>{setShowOverlay(true); setBuyResourceForm(true); 
                                setBuy_resource_form({
                                    public_id: Math.random()+"_"+entry.id,
                                    status: shownData,
                                    buyer_id: user_id,
                                    ordered_resource_id: entry.id,
                                    purchase_receipt:"N/A",
                                    created_at: entry.created_at,
                                    resource_name: entry.resource_name,
                                    total_quantity: entry.total_quantity,
                                    price_per_minimum_sellable_quantity: entry.price_per_minimum_sellable_quantity,
                                    minimum_sellable_quantity: entry.minimum_sellable_quantity,
                                    unit: entry.unit,
                                    fname: entry.user_fname,
                                    lname: entry.user_lname,
                                    user_location: entry.user_location
                                })}} 
                                className='flex-Row centered gap4px'
                                style={entry.status == "purchased" ? 
                                {display:"none"} : 
                                {cursor:"pointer", ...actionButton,}}>
                                <BsCashStack fontSize={14}/> 
                                <span>Buy</span>
                            </div>
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

