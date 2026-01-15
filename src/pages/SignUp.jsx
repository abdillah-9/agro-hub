import React, { useState } from 'react';
import { FaCircleXmark, FaXmark } from 'react-icons/fa6';
import { PiImagesThin } from 'react-icons/pi';

export default function SignUp({setActiveLInk, activeLink}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const timezone = new Date().toISOString().slice(10,13);

  function updateSelectedFile(e){
    console.log(e.target.value);
    const file = e.target.value;
    const [firstCut , secondCut] = file.split('fakepath\\');
    console.log(firstCut);
    console.log(secondCut);
    setSelectedFile(secondCut);
  }

  async function submitForm(e){
    e.preventDefault();

    //front-end validation
    const danger_chars = /[<>,'"`/\\&|=]/;
    const password_limit = /^[\d\w]{6,8}$/;
    const user_password = e.target.user_password.value;
    
    if(danger_chars.test(e.target.fname.value) || e.target.fname.value == ""){
      return alert(`First name cant be empty and cannot contain slashes, 
        equal sign or end-operator (<,>,||,&,=,/ and \)`);
    } 
    if(danger_chars.test(e.target.lname.value) || e.target.lname.value == ""){
      return alert(`Last name cant be empty and cannot contain slashes, 
        equal sign or end-operator (<,>,||,&,=,/ and \)`);
    }     
    if(user_password.length > 8 || user_password.length < 6){
      return alert('password must be between 6 and 8');
    }
    if(!/[a-zA-Z]/.test(user_password) || !/[0-9]/.test(user_password) || !/[@!$^*-+?%]/.test(user_password)){
      return alert('Password must contain atlest a letter,number and special character');
    }
    if(/[\s<>'"`\\//]/.test(user_password)){
      return alert("Password should not have slashes, coutes, angle brackets and white spaces");
    }
    if(danger_chars.test(e.target.username_or_email.value) || e.target.username_or_email.value == ""){
      return alert(`Username/Email can't be empty and cannot contain slashes, 
        equal sign or end-operator (<,>,||,&,=,/ and \)`);
    }     
    if(!/^[0-9]{10}$/.test(e.target.phone_number.value)){
      return alert('Phone number should be exactly 10 numbers ie 0788900300');
    }
    if(e.target?.user_photo?.files[0] && !['image/png','image/jpg','image/jpeg'].
      includes(e.target?.user_photo?.files[0]?.type)){
      return alert('Uploaded photo should be of type png,jpeg or jpg');
    }
    if(e.target?.user_photo?.files[0] && e.target?.user_photo?.files[0]?.size > 1024*1024){
      return alert('Size of photo uploaded should not exceed 1MB');
    }

    //generate the formData
    const formData = new FormData();
    formData.append('fname', e.target.fname.value);
    formData.append('lname', e.target.lname.value);
    formData.append('username_or_email', e.target.username_or_email.value);
    formData.append('user_password', e.target.user_password.value);
    formData.append('phone_number', e.target.phone_number.value);
    formData.append('user_role', e.target.user_role.value);
    formData.append('user_photo', e.target.user_photo.files[0]);
    formData.append('is_user_photo', e.target.user_photo.value);
    console.log(formData);
    console.log(e.target.user_photo.files[0]);
    console.log(e.target.user_photo.value);

    try{
      const res = await fetch('https://agrohub-backend.onrender.com/sign_up',{
        body: formData,
        method: 'POST'
      });

      if(res.ok){
        const data = await res.json();
        console.log(data);
        alert(data.message);
        data.status != 200 || setActiveLInk('SignIn');
      }
      else{
        console.log('error response from backend ( status code is not in 200s range )');
        alert(data.message);
      }
    }
    catch(e){
      console.log(e);
    }
  }
  
  return (
    <div className='flex-Row-Grow-Wrap-Gap-Space_Between centered p25px blur'>
      
      {/* Left Panel - Promo Text for Traders, Suppliers, Farmers */}
      <div className='w45vw minW200 maxW500 pureWhiteText flex-Column-Grow-Gap centeredV'>
        <div className='h2 maxW500 pureWhiteText'>Powering Agri-Business Connections</div>
        <div className='h3 maxW500 midWhiteText'>
          Access verified farmers, suppliers, and market-ready buyers in one place
        </div>
        <div className='h4 paleWhiteText'>
          Whether you're selling inputs, trading crops, or managing supply, this is your one-stop platform
        </div>
      </div>

      {/* Right Panel - Sign Up Form */}
      <form className='w45vw minW200 maxW700 pureWhiteText flex-Row-Grow-Wrap-Gap 
      centered paleWhiteBody bRad20 pureWhiteText' style={{padding:"25px 10px"}} onSubmit={submitForm}>
        
        <div className='inputContainer1' style={{width:'50%'}}>
          <label>First Name</label>
          <input type='text' name='fname' placeholder='John Doe' className='input1 midWhiteBody' />
        </div>

        <div className='inputContainer1' style={{width:'50%'}}>
          <label>Last Name</label>
          <input type='text' name='lname' placeholder='John Doe' className='input1 midWhiteBody' />
        </div>

        <div className='inputContainer1' style={{width:'50%'}}>
          <label>Email or Username</label>
          <input type='text' name='username_or_email' placeholder='Enter email or username' 
          className='input1 midWhiteBody' />
        </div>

        <div className='inputContainer1' style={{width:'50%'}}>
          <label>Password</label>
          <input type='password' name='user_password' placeholder='********' className='input1 midWhiteBody' />
        </div>

        <div className='inputContainer1' style={{width:'50%'}}>
          <label>Phone Number</label>
          <input type='number' name='phone_number' placeholder='0718500692' className='input1 midWhiteBody' />
        </div>

        <div className='inputContainer1' style={{width:'50%'}}>
          <label>Select Role</label>
          <select name='user_role' className='input1 midWhiteBody'>
            <option value={'farmer'}> farmer </option>
            <option value={'seller'}> seller </option>
          </select>
        </div>

        <div className='inputContainer1' style={{width:'50%'}}>
          <label>Upload Photo (Optional)</label>
          <input type='file' name='user_photo' id='photo' style={{display:'none'}} onChange={updateSelectedFile}/>
          <label htmlFor='photo' className='input1 p2 centeredH gap10px paleWhiteBody link'>
            <span style={{backgroundColor:'rgba(255,255,255,0.6)', height:'35px', padding:'5px'}}
            className='midGreenText bRad5'>
              <PiImagesThin 
              style={{fontSize:'25px'}} />
            </span>
            <span style={{overflow:'hidden', color:'rgb(55, 55, 55)', fontWeight:'bold'}}>
              {
                selectedFile ? selectedFile : 'no file chosen'
              }
            </span>
          </label>
        </div>

        <div className='inputContainer1' style={{width:'50%'}}>
          <label>Timezone</label>
          <input type='text' defaultValue={timezone} style={{cursor:'not-allowed'}}
          className='input1 midWhiteBody' />
        </div>

        <div style={{width: '100%', padding:'15px 10px', margin:'5px 0px'}}>
          {
            selectedFile ? 
            <div onClick={()=>{setSelectedFile(null)}} className='centered gap10px bRad5 link' 
            style={{backgroundColor:'rgba(250,0,0,0.15)', height:'70px', boxShadow:'1px 1px 25px black'}}>
              <span>Remove selected photo </span> <FaCircleXmark style={{fontSize: '27px', color:'rgb(120,0,0)'}}/>
            </div> :''
          }
        </div>
      
        <div className='inputContainer2 p2' style={{maxWidth:'100%', paddingLeft:'10px'}}>
          <input type='submit' style={{width:'96%', padding:'13px', border:'0px solid rgba(0,0,0,0)'}} 
          className='submit1 midGreenBody pureWhiteText bRad5' value={'SIGN UP'} name='submit' />
            {/* SIGN UP
          </input> */}
          <span>Already have an account?</span> 
          <span className='specLink' onClick={()=>{setActiveLInk('SignIn')}}>Go to login page</span>
        </div>

      </form>
    </div>
  );
}
