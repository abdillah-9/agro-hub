import React, { useState } from 'react'
import background from '../assets/african-man-harvesting-vegetables.jpg';
import logo from '../assets/logo.jpg'
import { FaUsers } from 'react-icons/fa6';
import { FaPersonRunning } from 'react-icons/fa6';
import { FaHandHoldingHeart } from 'react-icons/fa6';
import { FaArrowRight } from 'react-icons/fa6';
import { RiMailCheckFill } from 'react-icons/ri';
import { MdPhoneInTalk } from 'react-icons/md';
import { FaFacebook, FaLinkedin,FaGreaterThan} from 'react-icons/fa';
import { TbBrandWhatsappFilled } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import About from './About';
import SignIn from './SignIn';
import SignUp from './SignUp';


//create MiniHome
function MiniHome(){
  return(
    <section style={contentDesc}>
      <div className='h1 pureWhiteText maxW500'>
        Agro-hub enhance agriculture power
      </div>
      <div className='p2 maxW500 pureWhiteText'>
        This is the system that helps easy distribution of resources to farmers, crops to buyers and 
        AI insights for better farming
      </div>
      <div style={{...details, gap:"20px", flexWrap:"wrap", justifyContent:"center"}}>
        <Link to='/signIn' className='pureWhiteText midGreenBody p1' 
        style={{padding:"15px 70px", borderRadius:"25px"}}>GET STARTED</Link>
        <Link to='/about' className='midGreenText pureWhiteBody p1'
        style={{padding:"15px 70px", borderRadius:"25px"}}>LEARN MORE</Link>
      </div>
       {/*  */}
       <div style={{display:"flex",gap:"20px", flexWrap:"wrap",justifyContent:"center",marginTop:"40px",}}>
        {/* customer card */}
        <div style={cardStyle}>
          <h3 style={{marginBottom:"1rem"}}>Customer</h3>
          <FontAwesomeIcon icon={faUsers}  className='user-icon'/>
          <p>Are you willing to purcahse product from Farmer's 
            <br />
            <strong>Login/ Register a customer</strong>
            <Link to="/Customer" style={buttonStyle}>Click Here</Link>
          </p>

        </div>
        {/* Farmer card */}
        <div style={cardStyle}>
          <h3>Farmer</h3>
          <FontAwesomeIcon icon={faHandHoldingHeart} className='user-icon'/>
          <p>Online Market where you can Sell fruits & vegetables, agri produce, etc...
            <br />
            <strong>Login/ Register as Farmer</strong>
            <Link to="/SignIn" style={buttonStyle}>Click Here</Link>
          </p>

        </div>
        {/* worker card */}
        <div style={cardStyle}>
          <h3>Worker</h3>
          <FontAwesomeIcon icon={faPersonRunning}  className='user-icon'/>
          <p>Find Agriculture Jobs and opportunities.. Farm Worker jobs available here... 
            <br />
            <strong>Login/ Register as Worker</strong>
            <Link to="/SignIn" style={buttonStyle}>Click Here</Link>
          </p>
           
        </div>
    <Footer/>
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
          activeLink == "MiniHome" ? <MiniHome/> : 
          activeLink == "About" ? <About/> : 
          activeLink == "SignIn" ? <SignIn/> : <SignUp/>
        }
      </div>
    </div>
    
  )
}

function Footer() {
  return (
    <>
      <section className="footer-section">
        <footer className="footer-container">
          <article className="footer-article">
            <h2>Agro-hub</h2>
            <RiMailCheckFill />
            <span className='p3'>sabdillah855@gmail.com</span>
          </article>
          <article className="footer-article">
            <h2>Useful Links</h2>
            <ul>
              <li><a href="#"><FaGreaterThan className='icon'/>Blog</a></li>
              <li><a href="#"><FaGreaterThan className='icon'/>News</a></li>
              <li><a href="#"><FaGreaterThan className='icon'/>Farmer's Kit</a></li>
              <li><a href="#"><FaGreaterThan className='icon'/>Our Team</a></li>
            </ul>
          </article>
          <article className="footer-article">
            <h2>Our Services</h2>
            <ul>
              <li><a href="#"><FaGreaterThan className='icon'/>Home</a></li>
              <li><a href=""><FaGreaterThan className='icon'/>About</a></li>
              <li><a href="#"><FaGreaterThan className='icon'/>Hire</a></li>
              <li><a href="#"><FaGreaterThan className='icon'/>Contact</a></li>
            </ul>
          </article>
        </footer>
        <div className="bottom-footer">
          <p>&copy; Copyright 2025 <strong>AGRO-HUB</strong>. All Rights Reserved. <br></br> Designed by Agro-hub</p>
          <div className="social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><TbBrandWhatsappFilled /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
        </div>
      </section>
    </>
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