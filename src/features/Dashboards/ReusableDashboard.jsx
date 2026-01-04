import React, { useContext, useEffect, useState } from 'react'
import { IoAddCircleOutline} from 'react-icons/io5'
import { LiaUserEditSolid } from 'react-icons/lia'
import { PiFlowerTulipFill, PiHandHeartThin, PiMailboxThin, PiMoneyWavyLight, PiPhoneCallThin, PiSprayBottle, PiSprayBottleFill, PiTimerThin } from 'react-icons/pi'
import background from '../../assets/african-man-harvesting-vegetables.jpg';
import background2 from '../../assets/omary.png';
import { GiCottonFlower, GiFireFlower, GiMoneyStack, GiSquareBottle, } from 'react-icons/gi';
import { CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, 
    ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { FaHandHoldingDollar, FaSackDollar } from 'react-icons/fa6';
import { FaHeartbeat, FaHospitalUser } from 'react-icons/fa';
import { MdOutlineEmail, MdOutlineWatchLater, MdWatchLater } from 'react-icons/md';
import { LuFlower } from 'react-icons/lu';
import { BsFlower2 } from 'react-icons/bs';
import { TbPhoneCall } from 'react-icons/tb';
import { CiMail } from 'react-icons/ci';
import { GoStar, GoStarFill } from 'react-icons/go';
import { GrUserWorker } from 'react-icons/gr';
import { useNavigate} from 'react-router-dom';
import CropSalesStats from './CropSalesStats';
import ResourcesSellerQuickStats from './ResourceSalesStats';
import { AuthContext } from '../../AuthProvider';
import CropPurchasesStats from './CropPurchasesStats';
import ResourcePurchasesStats from './ResourcePurchasesStats';

export default function ReusableDashboard() {
    const {userData} = useContext(AuthContext);
    const [favourateBuyers, setFavourateBuyers] = useState([]);
    //alert(userData.user_role);
    
    
    const [like, setLike] = useState(true);
    //set navigation
    const navigateTo = useNavigate();  
// Sample data for charts
const cropSalesData = [
  { month: 'June', sales: 4000 },
  { month: 'July', sales: 7500 },
  { month: 'Aug', sales: 6200 },
  { month: 'Sept', sales: 9100 },
];

const cropDistributionData = [
  { name: 'Maize', value: 45 },
  { name: 'Wheat', value: 25 },
  { name: 'Teff', value: 15 },
  { name: 'Barley', value: 15 },
];

const COLORS = ['#2a7f62', '#f3bf4f', '#e76f51', '#264653'];
    useEffect(() => {
        const fData = new FormData();
        fData.append('user_id',userData.id);
        fetch("http://localhost:4000/get_recent_interactions", {
            method: "POST",
            credentials: "include",
            body: fData
        })
            .then(res => res.json())
            .then(data => {
                 console.log("recent interactions response:", data);
            if (data.status === 200) {
                setFavourateBuyers(data.interactions);
            }
        });
    }, [userData]);

  return (
    <div style={{overflow:"auto", height:"100%", padding:"15px 15px 0px 15px", gap:'25px',}}
         className='flex-Column'
    >

        {/** Quick actions */}
        <div className='flex-Row-Wrap gap20px bRad5 centered midBlackText p3 pureWhiteBody'
        style={{padding:"20px", boxShadow: "1px 2px 10px rgba(19, 18, 18, 0.77)"}}>
            <p className='p1 centered wFull'>Quick actions</p>
            <div onClick={()=>{navigateTo('/mainApp/user');}} className='p10px bRad5 gap7px bRad5 link' 
         style={{boxShadow:"1px 2px 17px black",flex:'1 1 200px', display:'flex', gap:'5px', flexWrap:'wrap', alignItems:'center'}}>
                <div className='pureGreenText bRad50_parcent centered' 
                style={{width:'fit-content',backgroundColor:"rgba(92, 245, 54, 0.51)", padding:"7px 10px"}}>
                    <LiaUserEditSolid style={{fontSize:"16px"}}/>
                </div>
                <span>Update User Profile</span>
            </div>
            <div onClick={()=>{navigateTo('/mainApp/buy_resources');}} className='p10px bRad5 gap7px bRad5 flex-Colu link' 
            style={{boxShadow:"1px 2px 17px black",flex:'1 1 200px', display:'flex', gap:'5px', flexWrap:'wrap', alignItems:'center'}}>
                <div className='pureGreenText bRad50_parcent centered' 
                style={{width:'fit-content',backgroundColor:"rgba(92, 245, 54, 0.51)", padding:"7px 10px"}}>
                    <PiMoneyWavyLight style={{fontSize:"16px"}}/>
                </div>
                <span>Buy Supplies</span>
            </div>
            <div onClick={()=>{navigateTo('/mainApp/sell_crops');}} className='p10px bRad5 gap7px bRad5 flex-Colu link' 
            style={{boxShadow:"1px 2px 17px black",flex:'1 1 200px', display:'flex', gap:'5px', flexWrap:'wrap', alignItems:'center'}}>
                <div className='pureGreenText bRad50_parcent centered' 
                style={{width:'fit-content',backgroundColor:"rgba(92, 245, 54, 0.51)", padding:"7px 10px"}}>
                <IoAddCircleOutline style={{fontSize:"16px"}}/>
                </div>
                <span>Add Crops to sell</span>
            </div>   
            <div onClick={()=>{navigateTo('/mainApp/buy_crops');}} className='p10px bRad5 gap7px bRad5 flex-Colu link' 
            style={{boxShadow:"1px 2px 17px black",flex:'1 1 200px', display:'flex', gap:'5px', flexWrap:'wrap', alignItems:'center'}}>
                <div className='pureGreenText bRad50_parcent centered' 
                style={{width:'fit-content',backgroundColor:"rgba(92, 245, 54, 0.51)", padding:"7px 10px"}}>
                    <BsFlower2 style={{fontSize:"16px"}}/>
                </div>
                <span>Buy Crops</span>
            </div>
            <div onClick={()=>{navigateTo('/mainApp/sell_resources');}} className='p10px bRad5 gap7px bRad5 flex-Colu link' 
            style={{boxShadow:"1px 2px 17px black",flex:'1 1 200px', display:'flex', gap:'5px', flexWrap:'wrap', alignItems:'center'}}>
                <div className='pureGreenText bRad50_parcent centered' 
                style={{width:'fit-content',backgroundColor:"rgba(92, 245, 54, 0.51)", padding:"7px 10px"}}>
                <IoAddCircleOutline style={{fontSize:"16px"}}/>
                </div>
                <span>Add Resource to sell</span>
            </div>     
        </div> 

        {/** Quick Stats */}
        <div style={quickStats}>
            <CropSalesStats />
            <CropPurchasesStats />
            <ResourcesSellerQuickStats />
            <ResourcePurchasesStats />
        </div>

        {/** RECENT INTERACTIONS */}
        <div style={favourates_interactions} >
            <div className='flex-Row centeredH gap4px midGreenBody' style={{padding:'15px 15px 15px 15px'}}>
                <div style={{padding:'8px 10px', borderRadius:'5px', background:'linear-gradient(45deg, #a5710077,  #e95e02ff)', color:'white',display:'flex',}}>
                    <PiTimerThin fontSize={22}/>
                </div>
                <span  style={{fontWeight:400, fontSize:'15px', color:'#ffffffff'}}>Recent interactions</span>
            </div>

            {/**FAVOURITES */}   
            <Favourites favourateBuyers={favourateBuyers} like={like} setLike={setLike}/>    

        </div>     
    </div>
  )
}

function Favourites({favourateBuyers, like, setLike}){
  return(
            <div className='gap10px flex-Row-Gap midBlackText midGreenBody p2' style={{padding:'20px 15px 70px 15px', flexWrap:'wrap', gap:'15px'}}>
    {
        favourateBuyers ? favourateBuyers.map((entry, index)=>(
            <div className='flex-Row-Wrap-Gap bRad5 p10px centeredH pureWhiteBody' key={index}
                style={{boxShadow:"1px 2px 17px black", gap:'30px', flex:'1 1 250px', justifyContent:'center', textAlign:'center'}}>
                <div style={{width:'100%', display:'flex', justifyContent:'center',position:'relative'}}>
                    <img src={background2} style={{...imageStyle, aspectRatio:1/0.9, borderRadius:'50%', boxShadow:'1px 2px 12px #4e4d4d86'}} width={'150px'} height={'auto'} alt='pic'/>  
                    
                    {/** STAR */}
                    <div onClick={()=>{setLike(!like)}} style={{fontSize:'30px', color:'#f3bf4f', width:'fit-content', cursor:'pointer', position:'absolute', right:'5%'}}>
                    {
                        like ? <GoStar /> : <GoStarFill />
                    }
                </div>                      
                </div>    
                <div style={{display:'flex', flexDirection:'column', gap:'5px'}}>
                    <span style={{fontSize:'18px', fontWeight:600}}>{entry.name}</span>
                    <span style={{fontSize:'14px'}}>{entry.role} found at {entry.location}</span>
                </div>
                <div style={{display:'flex', flexWrap:'wrap',gap:'15px', width:'100%', justifyContent:'center',}}>
                    <a href={`tel:${entry.phone}`} style={{textDecoration: 'none', minWidth:'250px', width:'25%', display:'flex' }}>
                    <div style={{
                        display:'flex',
                        gap:'7px',
                        alignItems:'center',
                        background: 'linear-gradient(45deg, rgba(6, 116, 6, 0.77), rgba(2, 185, 2, 0.73))',
                        padding:'10px',
                        borderRadius:'25px',
                        width:'45%',
                        flex:'1 1 150px',
                        justifyContent:'center',
                        color:'white',
                        cursor: 'pointer'
                    }}>
                        <PiPhoneCallThin style={{fontSize:'18px'}} />
                        <span style={{fontSize:'14px', fontWeight:300}}>Call</span>
                    </div>
                    </a>

                    <a href={`mailto:${entry.email}`} style={{textDecoration: 'none', minWidth:'250px', width:'25%', display:'flex' }}>
                    <div style={{
                        display:'flex',
                        gap:'7px',
                        alignItems:'center',
                        background: 'linear-gradient(45deg, rgba(6, 116, 116, 0.77), rgba(144, 1, 180, 0.73))',
                        padding:'10px',
                        borderRadius:'25px',
                        width:'45%',
                        flex:'1 1 150px',
                        justifyContent:'center',
                        color:'white',
                        cursor: 'pointer'
                    }}>
                        <CiMail style={{fontSize:'18px'}} />
                        <span style={{fontSize:'14px', fontWeight:300}}>Mail</span>
                    </div>
                    </a>

                </div>
            </div>
        )) :
        <div></div>
    }
    </div>

    )
}

const quickStats={
    display:"flex",
    flexDirection:'column',
    gap:'15px',
}
const favourates_interactions={
    display:"flex",
    flexDirection:"column",
    flexWrap:"wrap",
    marginTop:"20px",
    justifyContent:"space-between",
    boxShadow:"1px 2px 10px rgba(10,10,10,1)",
}
const imageStyle={
    borderRadius:"3px",
    // boxShadow:"1px 2px 10px black"
}
const role={
    fontWeight:700,
    padding:"10px 15px",
    height:"fit-content",
    boxShadow:"1px 2px 2px black",
}
const strong={
    fontWeight:700,
}