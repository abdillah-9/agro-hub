import React, { useState } from 'react'
import background from '../assets/african-man-harvesting-vegetables.jpg';
import logo from '../assets/logo.jpg'
import { RiMailCheckFill } from 'react-icons/ri';
import { MdPhoneInTalk } from 'react-icons/md';
import { FaFacebook, FaLinkedin} from 'react-icons/fa';
import { TbBrandWhatsappFilled } from 'react-icons/tb';
import About from './About';
import SignIn from './SignIn';
import SignUp from './SignUp';


//create MiniHome
function MiniHome({setActiveLInk, activeLink}){
  return(
    <section style={contentDesc}>
      <div className='h1 pureWhiteText maxW500'>
        Agro-hub enhance agriculture power
      </div>
      <div className='maxW500 midWhiteText' style={{fontSize:"23px", maxWidth:"700px"}}>
        It's your home where you can trade
        <strong className='darkGreenText'> farming resources, </strong> trade 
        <strong className='darkGreenText'> crops, </strong>  
        <strong className='darkGreenText'> connect with professional agricultural workers </strong>
        and <strong className='darkGreenText'> explore employment opportunities in agriculture.</strong>
      </div>
      <div style={{...details, gap:"20px", flexWrap:"wrap", justifyContent:"center"}}>
        <div className='pureWhiteText midGreenBody p1' onClick={()=>{setActiveLInk('signIn')}}
        style={{padding:"15px 70px", borderRadius:"25px"}}>GET STARTED</div>
        <div className='midGreenText pureWhiteBody p1' onClick={()=>{setActiveLInk('About')}}
        style={{padding:"15px 70px", borderRadius:"25px"}}>LEARN MORE</div>
      </div>
    </section>
    
  )
 } 
export default function Home() {
  const [activeLink, setActiveLInk] = useState("MiniHome");

  return (
    <div style={main}>
      <div style={overlay}>
        <section style={contacts} className='midGreenBody pureWhiteText p2'>
          <div style={{display:"flex", gap:"10px", flexWrap:"wrap"}} >
            <div style={details}>
              <RiMailCheckFill />
              <span className='p3'>sabdillah855@gmail.com</span>
            </div>
            <div style={details}>
              <MdPhoneInTalk />
              <span className='p3'>+255 718-500-692</span>
            </div>
          </div>
          <div style={details}>
            <FaFacebook />
            <TbBrandWhatsappFilled />
            <FaLinkedin />
          </div>
        </section>
        <nav style={navBar} className='pureWhiteBody'>
          <div style={details}>
            <img src={logo} style={logoStyle} alt='logo'/>
            <span className='h3 midBlackText'>Agro-Hub</span>
          </div>
          <div style={{...details, flexWrap:"wrap", gap:"15px"}} >
            <span className='pureBlackText p2 link' 
            style={activeLink == "MiniHome" ? activeLinkStyle : {}} 
            onClick={()=>{setActiveLInk("MiniHome")}}>Home</span>
            <span className='pureBlackText p2 link' 
            style={activeLink == "About" ? activeLinkStyle : {}}
            onClick={()=>{setActiveLInk("About")}}>About</span>
            <span className='pureBlackText p2 link' 
            style={activeLink == "SignIn" ? activeLinkStyle : {}}
            onClick={()=>{setActiveLInk("SignIn")}}>SignIn</span>
            <span
            style={activeLink == "SignUp" ? {...activeLinkStyle} : {}} 
            onClick={()=>{setActiveLInk("SignUp")}}
             className='pureWhiteText midGreenBody p1 link p10px bRad20'>
              Create new account
            </span>
          </div>
        </nav>
        
        {
          activeLink == "MiniHome" ? <MiniHome activeLink={activeLink} setActiveLInk={setActiveLInk}/> : 
          activeLink == "About" ? <About activeLink={activeLink} setActiveLInk={setActiveLInk}/> : 
          activeLink == "SignIn" ? <SignIn activeLink={activeLink} setActiveLInk={setActiveLInk}/> : 
          <SignUp activeLink={activeLink} setActiveLInk={setActiveLInk}/>
        }
      </div>
    </div>
    
  )
}

function Footer() {
  return (
    <></>
  );
}

const main={
  width:"100vw",
  minHeight:"100vh",
  backgroundImage:`url(${background})`,
  backgroundSize:"cover",
}
const overlay={
  display:"flex",
  flexDirection:"column",
  width:"100%",
  height:"100%",
  minHeight:"100vh",
  backgroundColor:"rgba(73, 73, 73, 0.62)",
}
const contacts={
  display:"flex",
  flexWrap:"wrap",
  gap:"10px",
  justifyContent:"space-between",
  padding:"10px 25px",
}
const details={
  display:"flex",
  gap:"5px",
  alignItems:"center",
}
const navBar={
  display:"flex",
  justifyContent:"space-between",
  flexWrap:"wrap",
  padding:"10px 25px",
  gap:"10px",
}
const logoStyle={
  width:"40px",
  height:"40px"
}
const link={
  padding:"3px 10px 5px 10px",
}
const activeLinkStyle={
  color:"rgba(3, 94, 3, 0.822)",
  fontWeight:"bold",
  borderBottom:"2px solid rgba(3, 94, 3, 0.822)",
}
const contentDesc={
  display:"flex",
  flexDirection: "column", 
  flexGrow:1,
  alignItems:"center",
  justifyContent:"center",
  gap:"20px", 
  textAlign:"center", 
  padding:"10px 25px",
}
const cardStyle={
  
}
const buttonStyle={

}