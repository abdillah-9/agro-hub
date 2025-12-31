import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../pages/MainApp';
import { HiExclamationCircle, HiXCircle } from 'react-icons/hi2';
import { BuyResourcesContext } from './BuyResourcesPage';

export default function MoreDetails() {
  const {resourceMoreDetails, setShowOverlay, setResourceMoreDetails} = useContext(AppContext);
  const {more_details} = useContext(BuyResourcesContext);
  const [data, setData] = useState(null);
  const calcHeight = resourceMoreDetails ? "100vh" : "0vh";

  const mainContainer={
      zIndex:3,
      fontSize:"14px",
      overflow:"auto",
      position:"fixed",
      top:resourceMoreDetails ? 0: "100vh",
      right: 0,
      opacity:resourceMoreDetails ? 1: 1,
      padding:"15px",
      boxShadow:"1px 2px 15px rgb(20,20,20)",
      backgroundColor:"white",
      maxWidth:"500px",
      width:"100vw",
      height: calcHeight,
      transition: "all 0.5s ease",
      display:"flex",
      flexDirection:"column",
      gap:"15px",
  }

  console.log("data IS : "+JSON.stringify(more_details));
    
  function restoration(){
    setShowOverlay(false);
    setResourceMoreDetails(false);
  }

  return (
    <div style={mainContainer}>
      <div style={buttons}>
        <span style={cancel} onClick={restoration}><HiXCircle/></span>
      </div>
      {/* <img src={'http::/localhost:4000/uploads/'} height={120} width={"100%"}/> */}
      <div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Date posted</span>
          <span style={values}>{more_details?.created_at ? 
            new Date(more_details?.created_at).toLocaleDateString('en-Us',{
            weekday:'long', day:'numeric', month:'short', year:'numeric' }) :""}
          </span>
        </div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Resource name</span>
          <span style={values}>{more_details?.resource_name}</span>
        </div>
        <div className='flex-Row-Wrap' style={more_details?.description ? {} : {display:'none'}}>
          <span style={props}>Description</span>
          <span style={values}>{more_details?.description || "N/A"}</span>
        </div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Quantity</span>
          <span style={values}>{Number(more_details?.total_quantity || more_details?.ordered_resource_quantity||'')}</span>
        </div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Price</span>
          <span style={values}>{Number(more_details?.price_per_minimum_sellable_quantity ||
          more_details?.paid_amount) || '' }</span>
        </div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Unit</span>
          <span style={values}>{more_details?.unit}</span>
        </div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Seller</span>
          <span style={values}>{more_details?.fname+" "+more_details?.lname}</span>
        </div>
      </div>
    </div>
  )
}

const props={
  display:"flex",
  flexDirection:"column",
  gap:"10px",
  backgroundColor:"rgb(220,220,220)",
  padding:"10px",
  borderBottom:"1px solid rgb(100,100,100)",
  width:"50%",
  minWidth:"200px",
}
const values={
  display:"flex",
  flexDirection:"column",
  gap:"10px",
  backgroundColor:"rgb(250,250,250)",
  padding:"10px",
  borderBottom:"1px solid rgb(100,100,100)",
  width:"50%",
  minWidth:"200px",
}
const detail={
  width:"100px",
}
const detail2={
  width:"120px",
  padding:"5px",
  border:"1px solid rgb(150,150,150)",
  borderRadius:"5px",
  textAlign:"center",
  cursor:"not-allowed"
}
const cancel={
  color:"rgb(177, 10, 10)",
  backgroundColor:"white",
  cursor:"pointer",
  fontSize:"40px",
}
const buttons={
  gap:"20px",
  borderBottom: "1px solid rgb(180,180,180)",
}