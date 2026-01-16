import React from 'react'
import aboutPic1 from '../assets/countryside-workers-out-field.jpg';
import { FaPeopleGroup } from 'react-icons/fa6';
import { PiPlantFill } from 'react-icons/pi';
import { FaTractor } from 'react-icons/fa';
import Test from '../components/test';

export default function About(){

  return(
    <div style={{display:"flex", flexGrow:1, flexWrap:"wrap", gap:"35px",
      justifyContent:"space-between", padding:"10px 25px"}} 
      className='whiteSmokeBody'>
      <section style={{display:"flex",flexDirection:"column",gap:"15px",justifyContent:"center",
         width:"45%"}} className='minW200'>
        <div className='h4 midGreenText'>
          Who we are
        </div>
        <div className='h2 pureBlackText'>
          We are tech savy who made your life easy on agriculture.
        </div>
        <div className='p3 midBlackText'>
          This tech industry made your life easy on agriculture, we serve the farmers, sellers of crops, and 
          sellers of resources ie pests to farmers, this system joins them all.
          This tech industry made your life easy on agriculture, we serve the farmers, sellers of crops, and 
          sellers of resources ie pests to farmers, this system joins them all.
        </div>
      </section>
      <section className='greenYellowBody' 
      style={{borderRadius:"15px",width:"45%", padding:"20px",display:"flex", flexGrow:1}} >
        <img alt={"about_photo"} width={"100%"} height={"auto"} src={aboutPic1} style={{borderRadius:"15px"}}/>
      </section>
      <section style={{width:"100%", display:"flex",justifyContent:"space-between", flexWrap:'wrap', gap:"15px"}}>
        <div style={{display:"flex",flexDirection:"column",gap:"10px",alignItems:"center",borderRadius:"10px",
         width:"30%",boxShadow:"2px 2px 13px rgb(10,10,10)", padding:"20px",textAlign:"center", flexGrow:1}}
         className='minW200 pureWhiteBody'>
          <div style={{padding:"20px", borderRadius:"50%"}} className='midGreenBody'>
            <FaPeopleGroup className='h1 pureWhiteText' />
          </div>
          <div className='h3 midGreenText maxW200'>Sell your crops to valuable customers</div>
          <div className='p1 midBlackText maxW200'>
            Farmers are can buy viable resources from trusted stores any moment with ease
          </div>
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:"10px",alignItems:"center",borderRadius:"10px",
         width:"30%",boxShadow:"2px 2px 13px rgb(10,10,10)", padding:"20px",textAlign:"center", flexGrow:1}}
         className='minW200 pureWhiteBody'>
          <div style={{padding:"20px", borderRadius:"50%"}} className='midGreenBody'>
            <FaPeopleGroup className='h1 pureWhiteText' />
          </div>
          <div className='h3 midGreenText maxW200'>Buy crops from trustworthy farmers</div>
          <div className='p1 midBlackText maxW200'>
            Farmers are can buy viable resources from trusted stores any moment with ease
          </div>
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:"10px",alignItems:"center",borderRadius:"10px",
         width:"30%",boxShadow:"2px 2px 13px rgb(10,10,10)", padding:"20px",textAlign:"center", flexGrow:1}}
         className='minW200 pureWhiteBody'>
          <div style={{padding:"20px", borderRadius:"50%"}} className='midGreenBody'>
            <FaPeopleGroup className='h1 pureWhiteText' />
          </div>
          <div className='h3 midGreenText maxW200'>Buy farming inputs/resources from best sellers</div>
          <div className='p1 midBlackText maxW200'>
            Farmers are can buy viable resources from trusted stores any moment with ease
          </div>
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:"10px",alignItems:"center",borderRadius:"10px",
         width:"30%",boxShadow:"2px 2px 13px rgb(10,10,10)", padding:"20px",textAlign:"center", flexGrow:1}}
         className='minW200 pureWhiteBody'>
          <div style={{padding:"20px", borderRadius:"50%"}} className='midGreenBody'>
            <PiPlantFill className='h1 pureWhiteText' />
          </div>
          <div className='h3 midGreenText maxW200'>Sell agriculure resources/inputs to farmers</div>
          <div className='p1 midBlackText maxW200'>
            Farmers are can buy viable resources from trusted stores any moment with ease
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"10px",alignItems:"center",borderRadius:"10px",
         width:"30%",boxShadow:"2px 2px 13px rgb(10,10,10)", padding:"20px",textAlign:"center", flexGrow:1}}
         className='minW200 pureWhiteBody'>
          <div style={{padding:"20px", borderRadius:"50%"}} className='midGreenBody'>
            <FaTractor className='h1 pureWhiteText' />
          </div>
          <div className='h3 midGreenText maxW200'>Reach great pool of workers</div>
          <div className='p1 midBlackText maxW200'>
            Farmers are can buy viable resources from trusted stores any moment with ease
            Farmers are can buy viable resources from trusted stores any moment with ease
          </div>
        </div>
      </section>

      {/** Learning some staffs */}
      <Learning/>
    </div>
  )
}

function Learning(){

  return(
    <div style={{width:"100%"}}>
      <Test/>
    </div>
  )
}