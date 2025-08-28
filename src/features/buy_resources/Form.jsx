import React, { useContext } from 'react'
import { AppContext } from '../../pages/MainApp';

export default function Form() {
  const {buyResourceForm, setShowOverlay, setBuyResourceForm} = useContext(AppContext);
  const calcHeight = buyResourceForm ? "100vh" : "0vh";

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

  const formBody={
      zIndex:3,
      fontSize:"14px",
      overflow:"auto",
      position:"fixed",
      top:buyResourceForm ? 0: "-100vh",
      right: 0,
      opacity:buyResourceForm ? 1: 1,
      padding:"15px",
      boxShadow:"1px 2px 15px rgb(20,20,20)",
      backgroundColor:"white",
      maxWidth:"300px",
      width:"100vw",
      height: calcHeight,
      transition: "all 0.5s ease",
      display:"flex",
      flexDirection:"column",
      gap:"15px",
  }

  function formSubmit(e){
    e.preventDefault();
  }
  function restoreFormAndOverlay(){
    setShowOverlay(false);
    setBuyResourceForm(false);
  }

  return (
    <form onSubmit={()=>formSubmit(e)} style={formBody}>
      <div>        
        <img src={""} height={100} width={"100%"}/>
      </div>
      <div style={{...purchaseInputs,  borderBottom: "1px solid rgb(180,180,180)",paddingBottom:"15px"}}>
        <label style={detail}>Set quantity</label>
        <input type='number' name='price' placeholder='2' style={{...detail2, cursor:"pointer"}}/>
      </div>
      <div style={{...purchaseInputs, ...buttons}}>
        <span style={cancel} onClick={restoreFormAndOverlay}>Cancel</span>
        <input type='submit' name='submit' value="Purchase" className='pureGreenBody pureWhiteText' style={purchase}/>
      </div>
      <div className='flex-Row-Wrap gap7px'
      style={{...purchaseInputs,  borderBottom: "1px solid rgb(180,180,180)",paddingBottom:"15px"}}>
        <span style={detail}>Date posted</span> 
        <span style={detail2}>{demoData.created_date}</span>
        <span style={detail}>product name</span> 
        <span style={detail2}>{demoData.resource_name}</span> 
        <span style={detail}>Available</span> 
        <span style={detail2}>{demoData.quantity}</span>
        <span style={detail}>Price</span> 
        <span style={detail2}>{demoData.price}</span>
        <span style={detail}>Unit</span> 
        <span style={detail2}>{demoData.unit}</span>
        <span style={detail}>Seller</span> 
        <span style={detail2}>{demoData.seller}</span>
        <span style={detail}>Location</span> 
        <span style={detail2}>{demoData.location}</span>
      </div>
    </form>
  )
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
  backgroundColor:"rgb(177, 10, 10)",
  color:"white",
  padding:"10px",
  borderRadius:"5px",
  cursor:"pointer",
  fontWeight:500,
}
const purchase={
  border:"0px solid black",
  borderRadius:"5px",
  cursor:"pointer",
  backgroundColor:"rgb()",
  fontWeight:500,
  padding:"10px",
}
const purchaseInputs={
  display:"flex",
  gap:"10px"
}
const buttons={
  gap:"20px",
  borderBottom: "1px solid rgb(180,180,180)",
  padding:"0px 0px 15px 0px",
}