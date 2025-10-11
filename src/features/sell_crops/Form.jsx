import React, { useContext, useState } from 'react'
import { AppContext } from '../../pages/MainApp';
import { HiPhoto, HiXCircle } from 'react-icons/hi2';
import { TbLibraryPhoto } from 'react-icons/tb';
import { PiImagesLight } from 'react-icons/pi';

export default function Form() {
  const {sellCropsForm, setShowOverlay, setSellCropsForm} = useContext(AppContext);
  const [selectedFile, setSelectedFile] = useState();

  function setFile(event){
    const file = event.target.files[0];
    if(file){
      setSelectedFile(file.name);
    }
    else{
      setSelectedFile(false);
    }
  }

  function restoreFormAndOverlay(){
    setShowOverlay(false);
    setSellCropsForm(false);
  }
  const calcHeight = sellCropsForm ? "100vh" : "0vh";

  //Get user
  // const {userData} = UseGetUser();
  const userData= { id:1, fname:"Jumbo", lname:"Mwalutenge", }

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
        "location":"Singida",
        "receipt":"",
        "status":"onsale",
    }

  const mainContainer={
      zIndex:3,
      fontSize:"14px",
      overflow:"auto",
      position:"fixed",
      top:sellCropsForm ? 0: "100vh",
      right: 0,
      opacity:sellCropsForm ? 1: 1,
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
    setSellCropsForm(false);
  }

  async function onFormSubmit(e){
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
   
    // send data to backend using fetch() API
    try{
      const res = await fetch("http://localhost:4000/upload_crop/",{
        body: formData,
        method: "POST",
      });
      //check res.ok
      if(!res.ok){
        alert(res.status);
      }
      if(res.ok){
        const data = await res.json();
        console.log(data.message);
      }
    }
    catch(e){
      alert(JSON.stringify(e));
    }
  }

  return (
    <form style={mainContainer} onSubmit={onFormSubmit}>
      <div style={buttons}>
        <span style={cancelCircle} onClick={restoration}><HiXCircle/></span>
      </div>
      <img src='aaa' height={120} width={"100%"}/>
      <div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Seller</span>
          <span style={{...values, cursor:"not-allowed"}}>{userData.fname} {userData.lname}</span>
          <input type={"text"} name='sellerID' style={{...values,display:"none"}} defaultValue={userData.id}/>
        </div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Date posted</span>
          <span style={{...values, cursor:"not-allowed"}}>{currentDate}</span>
          <input type='date' name='datePosted' defaultValue={currentDate} style={{display:"none"}}/>
        </div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Product name</span>
          <input type={"text"} name='cropName' style={values} placeholder='Eg: Cotton'/>
        </div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Unit</span>
          <select name='unit'style={values}>
            <option value={'kg'}> killogram </option>
            <option value={'g'}> gram </option>
            <option value={'tone'}>tone</option>
          </select>
        </div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Total quantity</span>
          <input style={values} type="number" name='quantity'  placeholder='Eg: 12'/>
        </div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Minimum sellable quantity</span>
          <select name='minimumSellableQuantity' style={{...values, border:"0px solid white"}}>
            <option value={0.25}> quatre (1/4) </option>
            <option value={0.5}> half (1/2) </option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Price (per minimum sellable quantity)</span>
          <input style={values} type='text' name='price'  placeholder='1200 Tsh' />
        </div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Description (Optional)</span>
          <input type="text" name='description' style={values} placeholder='This crop is ...' />
        </div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Photo (Optional)</span>
          <input id='photo' style={{display:"none"}} type='file' name='photo' onInput={setFile}/>
          <label htmlFor='photo' style={{...values, flexDirection:"row"}}  className='centeredH'>
            <PiImagesLight className='midGreenText' style={{cursor:"pointer", fontSize:"27px"}}/>
            <span className='p2'>{ !selectedFile ? "No file chosen" : selectedFile.file_name}</span>
          </label>
        </div>
        <div className='flex-Row-Wrap gap10px pV10px'>
          <span style={cancel} onClick={restoreFormAndOverlay}>Cancel</span>
          <button type='submit' style={submitForm}  className='pureGreenBody pureWhiteText'>Submit</button>
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
const cancelCircle={
  color:"rgb(177, 10, 10)",
  backgroundColor:"white",
  cursor:"pointer",
  fontSize:"40px",
}
const buttons={
  gap:"20px",
  borderBottom: "1px solid rgb(180,180,180)",
}
const submitButton={
  border:"0px black",
  backgroundColor:"rgba(21, 172, 1, 0.62)",
  color:"rgb(6, 43, 1)",
  padding:"10px",
  marginTop:"15px",
  borderRadius:"5px",
  fontWeight:500,
  cursor:"pointer",
}
const cancel={
  backgroundColor:"rgb(177, 10, 10)",
  color:"white",
  padding:"10px",
  borderRadius:"5px",
  cursor:"pointer",
  fontWeight:500,
}
const submitForm={
  border:"0px solid black",
  borderRadius:"5px",
  cursor:"pointer",
  fontWeight:500,
  padding:"10px",
}