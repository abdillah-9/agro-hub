import React, { useState } from 'react'
import background from '../assets/african-man-harvesting-vegetables.jpg';
import logo from '../assets/logo.jpg'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faPersonRunning } from '@fortawesome/free-solid-svg-icons';
import { faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight} from '@fortawesome/free-solid-svg-icons';
import { RiMailCheckFill } from 'react-icons/ri';
import { MdPhoneInTalk } from 'react-icons/md';
import { FaFacebook, FaLinkedin} from 'react-icons/fa';
import { TbBrandWhatsappFilled } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import About from './About';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Customer from './Customer';


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
      <style>{footerStyles}</style>
      <section className="footer-section">
        <footer className="footer-container">
          <article className="footer-article">
            <h2>Agro-hub</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non doloribus quisquam eius?
            </p>
          </article>
          <article className="footer-article">
            <h2>Useful Links</h2>
            <ul>
              <li>
                <a href="#">
                  <FontAwesomeIcon icon={faArrowRight} className="icon" />
                  Blog
                </a>
              </li>
              <li>
                <a href="#">
                  <FontAwesomeIcon icon={faArrowRight} className="icon" />
                  News
                </a>
              </li>
              <li>
                <a href="#">
                  <FontAwesomeIcon icon={faArrowRight} className="icon" />
                  Farmer's Kit
                </a>
              </li>
              <li>
                <a href="#">
                  <FontAwesomeIcon icon={faArrowRight} className="icon" />
                  Our Team
                </a>
              </li>
            </ul>
          </article>
          <article className="footer-article">
            <h2>Our Services</h2>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Hire</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </article>
          <article className="footer-article">
            <h2>Staff Login</h2>
            <p>
              This feature is Available only for Staff or Administrator
            </p>
            <Link to="/SignIn" className="staff-login-link">
              Click Here to Login
            </Link>
          </article>
          
        </footer>
        {/* <div className="section">
        <div className="bottom-footer">
         <div className="flex-right">
           <p>&copy; 2025 <strong>AGRO-HUB. </strong>All Rights Reserved.
           <span>Design and Developed by Agro-hub TZ.</span>
           </p>
           
         </div>
      </div>
        </div> */}
      
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
const cardStyle = {
  backgroundColor: "white",
  textAlign: "center",
  padding: "20px",
  borderRadius: "0.5rem",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  width: "300px",
  minHeight: "200px",
  flexShrink: 0
};

const buttonStyle = {
  backgroundColor: "#17a2b8",
  color: "white",
  padding: "10px 20px",
  borderRadius: "5px",
  textDecoration: "none",
  display: "inline-block",
  marginTop: "10px"
};


// footer style
const footerStyles = `
  .footer-section {
    background-color: #f1f0f2;
    color: #444444;
    font-size: 20px;
    padding: 3rem 1rem;
  }

  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-article {
    margin-bottom: 1.5rem;
  }

  .footer-article h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .footer-article p {
    font-size: 0.9rem;
    color: #444444;
    line-height: 1.5;
  }

  .footer-article ul {
    list-style: none;
    padding: 0;
  }

  .footer-article ul li {
    margin-bottom: 0.5rem;
  }

  .footer-article ul li a {
    color: #444444;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s;
  }

  .footer-article ul li a:hover {
    color: #009970;
  }

  .icon {
    font-size: 0.8rem;
    margin-right: 0.5rem;
  }

  .staff-login-link {
    display: inline-block;
    padding: 0.5rem 1rem;
    width: 250px;
    background-color: #4CAF50;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    margin-top: 1rem;
    transition: background-color 0.3s;
  }

  .staff-login-link:hover {
    background-color: #45a049;
  }

  @media (min-width: 640px) {
    .footer-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .footer-container {
      grid-template-columns: repeat(4, 1fr);
    }

    .footer-article h2 {
      font-size: 1.25rem;
    }

    .footer-article p, .footer-article ul li a {
      font-size: 0.875rem;
    }
  }
`;
