import React, { useContext } from 'react'
import { AppContext } from '../../pages/MainApp';
import { HiExclamationCircle, HiXCircle } from 'react-icons/hi2';

export default function MoreDetails() {
  const {resourceMoreDetails, setShowOverlay, setResourceMoreDetails} = useContext(AppContext);
  const calcHeight = resourceMoreDetails ? "100vh" : "0vh";

  const demoData =
      {
          "id":1,
          "photo":"",
          "created_date":"12th Jun 2025",
          "resource_name":"Handhoe",
          "description":"",
          "quantity":26,
          "price":11000,
          "unit":"tone",
          "seller":"Jumbo Mwalutenge",
          "location":"Singida",
          "receipt":"",
          "status":"onsale",
      }

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

  function restoration(){
    setShowOverlay(false);
    setResourceMoreDetails(false);
  }

  return (
    <div style={mainContainer}>
      <div style={buttons}>
        <span style={cancel} onClick={restoration}><HiXCircle/></span>
      </div>
      <img src='aaa' height={120} width={"100%"}/>
      <div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Date posted</span>
          <span style={values}>{demoData.created_date}</span>
        </div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Product name</span>
          <span style={values}>{demoData.resource_name}</span>
        </div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Description</span>
          <span style={values}>{demoData.description || "N/A"}</span>
        </div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Quantity</span>
          <span style={values}>{demoData.quantity}</span>
        </div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Price</span>
          <span style={values}>{demoData.price}</span>
        </div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Unit</span>
          <span style={values}>{demoData.unit}</span>
        </div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Seller</span>
          <span style={values}>{demoData.seller}</span>
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