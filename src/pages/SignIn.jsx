import React from 'react'

export default function SignIn() {
  return (
    <div className='flex-Row-Grow-Wrap-Gap-Space_Between centered p25px blur'>
      <div className='w45vw minW200 maxW700 pureWhiteText flex-Column-Grow-Gap  centeredV'>
        <div className='h2 maxW500 pureWhiteText'>ACHIEVE YOUR GREATNESS WITH US</div>
        <div className='h3 maxW500 midWhiteText'>Where your dream destination becomes reality</div>
        <div className='h4 paleWhiteText'>
          Embark your farming journey where every inch of its pros is within the palm of your hand
        </div>
      </div>
      <form className='w45vw minW200 maxW500 pureWhiteText flex-Column-Grow-Gap centered paleWhiteBody p25px bRad20
      pureWhiteText'>
        <div className='inputContainer1'>
          <label>Email/Username</label>
          <input type='text' name='email_username' placeholder='Enter Email or username' 
          className='input1 midWhiteBody'/>
        </div>
        <div className='inputContainer1'>
          <label>Password</label>
          <input type='password' name='pword' placeholder='********' className='input1 midWhiteBody'/>
        </div>
        <div className='inputContainer1 p2'>
          <span className='specLink '>Forgot password</span>
        </div>
        <div className='inputContainer1'>
          <button type='submit' className='input1 submit1 midGreenBody pureWhiteText'>SIGN IN</button>
        </div>
        <div className='inputContainer2 p2'>
          <span className=''>Are you new?</span> 
          <span className='specLink'>create an account</span>
        </div>
      </form>     
    </div>
  )
}
