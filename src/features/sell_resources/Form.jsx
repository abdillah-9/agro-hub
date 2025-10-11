import React, { useContext } from 'react'
import { AppContext } from '../../pages/MainApp';
import { HiPhoto, HiXCircle } from 'react-icons/hi2';

export default function Form() {
  const {sellResourceForm, setShowOverlay, setSellResourceForm} = useContext(AppContext);
  const calcHeight = sellResourceForm ? "100vh" : "0vh";

  //Get current date
  const currentDate = new Date().toISOString().slice(0, 10);

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
      top:sellResourceForm ? 0: "100vh",
      right: 0,
      opacity:sellResourceForm ? 1: 1,
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
    setSellResourceForm(false);
  }

  return (
    <form style={mainContainer}>
      <div style={buttons}>
        <span style={cancel} onClick={restoration}><HiXCircle/></span>
      </div>
      <img src='aaa' height={120} width={"100%"}/>
      <div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Seller</span>
          <span style={{...values, cursor:"not-allowed"}}>{demoData.seller}</span>
        </div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Date posted</span>
          <span style={{...values, cursor:"not-allowed"}}>{currentDate}</span>
          <input type="text" name='sellerID' defaultValue={demoData.id} style={{display:"none"}}/>
          <input type='date' name='datePosted' defaultValue={currentDate} style={{display:"none"}}/>
        </div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Product name</span>
          <input type={"text"} name='cropName' style={values} placeholder='Eg: Cotton'/>
        </div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Product type</span>
          <select>
            <option value={'instrument'}>instrument</option>
            <option value={'reagent'}>reagent</option>
          </select>
        </div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Unit</span>
          <input style={values} type='text' name='unit'  placeholder='Eg: kg' />
        </div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Quantity</span>
          <input style={values} type="number" name='quantity'  placeholder='Eg: 1'/>
        </div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Price (per each)</span>
          <input style={values} type='text' name='price'  placeholder='1200 Tsh' />
        </div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Description (Optional)</span>
          <input type="text" name='description' style={values} placeholder='This crop is ...' />
        </div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Photo (Optional)</span>
          <input id='photo' style={{display:"none"}} type='file' name='photo' />
          <label htmlFor='photo' style={values}>
            <HiPhoto className='midGreenText h2' style={{cursor:"pointer"}}/>
        </label>
        </div>
      </div>
    </form>
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
  border:"0px solid rgba(0,0,0,0)",
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