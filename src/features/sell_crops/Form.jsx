import React, { useContext} from 'react'
import { AppContext } from '../../pages/MainApp';
import { HiPhoto, HiXCircle, HiXMark } from 'react-icons/hi2';
import { TbLibraryPhoto } from 'react-icons/tb';
import { PiImagesLight } from 'react-icons/pi';
import { AuthContext } from '../../AuthProvider';

export default function Form({formData, setFormData, activateRefresh, setActivateRefresh}) {
  const {sellCropsForm, setShowOverlay, setSellCropsForm, setSelectedFile, selectedFile} = useContext(AppContext);
  const {userData} = useContext(AuthContext);
  const {user_id, user_role, user_fname, user_lname, user_photo} = userData;

  console.log("formData :"+JSON.stringify(formData));
  console.log('activateRefresh '+activateRefresh)
  
  function setFile(event){
    const file = event?.target?.files[0];
    if(file){
      setSelectedFile(file?.name);
    }
    else{
      setSelectedFile(false);
      console.log("NO file")
    }
  }

  function restoreFormAndOverlay(){
    setShowOverlay(false);
    setSellCropsForm(false);
    setFormData(null);
  }
  const calcHeight = sellCropsForm ? "100vh" : "0vh";

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
    setFormData(null);
  }

  async function onFormSubmit(e){
    e.preventDefault();
    //validate Inputs
    if(!/^[\w\s]+$/.test(e.target.crop_name.value)){
      return alert(`Crop name must include filled with 
      letters, underscore or white-spaces only`);
    }
    if(!/^[\w\s\.]+$/.test(e.target.unit.value)){
      return alert(`Unit must be filled`);
    }
    if(!/^[\w\s\.]+$/.test(e.target.minimum_sellable_quantity.value)){
      return alert(`minimum sellable quantity is compulsory must be filled`);
    }
    if(!/^[\d\.]+$/.test(e.target.total_quantity.value)){
      return alert(`Total quantity can be either
      integer or float`);
    }
    if(!/^[\d\.]+$/.test(e.target.price_per_minimum_sellable_quantity.value)){
      return alert(`Price should be either float 
      or integer`);
    }
    if(/^[<>/\\*&]+$/.test(e.target.description.value)){
     return alert(`You cannot use tags (< or >), 
      slashes( / or \), star (*) and & special characters`) 
    }
    if(e.target.crop_photo.files[0] && 
      !['image/jpeg', 'image/jpg', 'image/png'].includes(e.target.crop_photo.files[0].type)){
      return alert("Only jpeg, jpg and png image formats are allowed");
    }
    if(e.target.crop_photo.files[0] && e.target.crop_photo.files[0].size > 1024*1024){
       return alert("Image must be less or equal to 1MB");
    }

    const form = e.target;
    const formDataBody = new FormData(form);
    if(formData){
      formDataBody.append('edit_mode',true);
    }
    else{
      formDataBody.append('edit_mode',false);
    }

    // send data to backend using fetch() API
    try{
      const res = await fetch("http://localhost:4000/upload_crop_for_sale",{
        body: formDataBody,
        method: "POST",
      });
      //check res.ok
      if(!res.ok){
        setFormData(null);
        setActivateRefresh((prev)=>{return !prev});
        console.log(activateRefresh+" activate Refresh");
        alert(res.status);
      }
      if(res.ok){
        const data = await res.json();
        restoreFormAndOverlay();
        setActivateRefresh((prev)=>{return !prev});
        console.log(activateRefresh+" activate Refresh");
        alert(data.message);
      }
    }
    catch(e){
      console.log("catched err is :"+e);
    }
  }

  return (
    <form style={mainContainer} onSubmit={onFormSubmit} >
      <div style={buttons}>
        <span style={cancelCircle} onClick={restoration}><HiXCircle/></span>
      </div>
      {/* <img src='aaa' height={120} width={"100%"}/> */}
      <div key={formData == false && Date.now()}>
        <div className='flex-Row-Wrap'>
          <span style={props}>Seller is</span>
          <span style={{...values, cursor:"not-allowed"}}>
            {formData?.fname || user_fname} {formData?.lname || user_lname}
          </span>
          <input type={"text"} name='row_id' style={{display:"none"}} defaultValue={formData?.row_id}/>
          <input type={"text"} name='seller_id' style={{...values,display:"none"}} 
            defaultValue={user_id}/>
        </div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Date posted</span>
          <span style={{...values, cursor:"not-allowed"}}>
            {
              formData?.created_at ?
              new Date(formData?.created_at || "").toLocaleDateString('en-Us',
              {weekday:'long',day:'numeric', month:'short', year:'numeric'}) 
              : new Date().toLocaleDateString('en-Us',{
                weekday:'long',day:'numeric', month:'short', year:'numeric'
              })      
            }
          </span>
        </div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Product name</span>
          <input type={"text"} name='crop_name' style={values} placeholder='Eg: Cotton'
            defaultValue={formData?.crop_name}
          />
        </div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Unit</span>
          <select name='unit' style={{...values, border:"1px solid white"}} >
            <option value={formData?.unit}>
              {
                formData?.unit == 'g' ? "gram" : formData?.unit == 'kg' ? "killogram" :
                formData?.unit == 'tone' ? "tone" : ""
              }
            </option>
            <option value={'kg'}> killogram </option>
            <option value={'g'}> gram </option>
            <option value={'tone'}>tone</option>
          </select>
        </div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Total quantity</span>
          <input style={values} type="number" name='total_quantity'  placeholder='Eg: 12'
            defaultValue={formData?.total_quantity}
          />
        </div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Minimum sellable quantity</span>
          <select name='minimum_sellable_quantity' style={{...values, border:"1px solid white"}}
            defaultValue={formData?.minimum_sellable_quantity}>
            <option value={formData?.minimum_sellable_quantity}>
              {
                formData?.minimum_sellable_quantity == 0.5 ?  formData?.minimum_sellable_quantity + (" (Half)") :
                formData?.minimum_sellable_quantity == 0.25 ?  formData?.minimum_sellable_quantity + (" (Quatre) ") :
                formData?.minimum_sellable_quantity 
              }
            </option>
            <option value={0.25}> quatre (1/4) </option>
            <option value={0.5}> half (1/2) </option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Price (per minimum sellable quantity)</span>
          <input style={values} type='number' name='price_per_minimum_sellable_quantity'  placeholder='1200 Tsh' 
            defaultValue={formData?.price_per_minimum_sellable_quantity}/>
        </div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Description (Optional)</span>
          <input type="text" name='description' style={values} placeholder='This crop is ...' 
            defaultValue={formData?.description}
          />
        </div>
        <div className='flex-Row-Wrap'>
          <span style={props}>Photo (Optional)</span>
          <input id='photo' style={{display:"none"}} type='file' name='crop_photo' onInput={setFile}/>
          <label htmlFor='photo' style={{...values, flexDirection:"row"}}  className='centeredH'>
            {
              selectedFile ? 
              <HiXCircle color='rgb(177, 10, 10)' fontSize={'30px'} className='link' 
                onMouseDown={(e)=>{e.preventDefault(); setSelectedFile(false);
                  e.target.crop_photo.files[0] = null}}/> :
              <PiImagesLight className='midGreenText' style={{cursor:"pointer", fontSize:"27px"}}/>
            }
            <span className='p2' style={{width:"100%", overflow:'hidden'}}>
              { !selectedFile ? "No file chosen" : selectedFile}
            </span>
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