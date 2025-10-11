import React from 'react'
import { IoAddCircleOutline} from 'react-icons/io5'
import { LiaUserEditSolid } from 'react-icons/lia'
import { PiMoneyWavyLight } from 'react-icons/pi'
import background from '../../assets/african-man-harvesting-vegetables.jpg';
import { GiFireFlower, GiSquareBottle, } from 'react-icons/gi';
import { CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, 
    ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { FaHandHoldingDollar, FaSackDollar } from 'react-icons/fa6';
import { FaHeartbeat } from 'react-icons/fa';
import { MdWatchLater } from 'react-icons/md';

export default function FarmerDashboard() {
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
    const favourateBuyers=[
        {
            name: "juma Isaya",
            phone:"0678 908 763",
            location:"Kigoma",
            emails:"asdikey231@gmail.com",
            role:"farmer",
        },
        {
            name: "Hassan Kibao",
            phone:"0775 789 080",
            location:"Morogoro",
            emails:"asdikey231@gmail.com",
            role:"supplier",
        },
        {
            name: "juma Isaya",
            phone:"0678 908 763",
            location:"Kigoma",
            emails:"asdikey231@gmail.com",
            role:"seller",
        },
    ];
  return (
    <div style={{overflow:"auto", height:"100%", padding:"15px 15px 0px 15px"}}>

        {/** Quick actions */}
        <div className='flex-Row-Wrap gap20px bRad5 centered midBlackText p3 pureWhiteBody'
        style={{padding:"20px", boxShadow: "1px 2px 10px rgba(19, 18, 18, 0.77)"}}>
            <p className='p1 centered wFull'>Quick actions</p>
            <div className='p10px bRad5 centered gap7px bRad5 flex-Colum link' 
            style={{boxShadow:"1px 2px 17px black",}}>
                <div className='pureGreenText bRad50_parcent centered' 
                style={{backgroundColor:"rgba(92, 245, 54, 0.51)", padding:"7px 10px"}}>
                    <LiaUserEditSolid style={{fontSize:"16px"}}/>
                </div>
                <span>Update User Profile</span>
            </div>
            <div className='p10px bRad5 centered gap7px bRad5 flex-Colum link' 
            style={{boxShadow:"1px 2px 17px black",}}>
                <div className='pureGreenText bRad50_parcent centered' 
                style={{backgroundColor:"rgba(92, 245, 54, 0.51)", padding:"7px 10px"}}>
                    <PiMoneyWavyLight style={{fontSize:"16px"}}/>
                </div>
                <span>Buy Supplies</span>
            </div>
            <div className='p10px bRad5 centered gap7px bRad5 flex-Colum link' 
            style={{boxShadow:"1px 2px 17px black",}}>
                <div className='pureGreenText bRad50_parcent centered' 
                style={{backgroundColor:"rgba(92, 245, 54, 0.51)", padding:"7px 10px"}}>
                <IoAddCircleOutline style={{fontSize:"16px"}}/>
                </div>
                <span>Add Crops to sell</span>
            </div>        
        </div> 

        {/** Quick Stats */}
        <div style={quickStats}>
            <div className='flex-Column gap10px bRad5 p10px p1 midBlackText pureWhiteBody'
             style={{boxShadow:"1px 2px 17px black", width:"200px",}}>
                <div style={{padding:"7px 12px", backgroundColor:"rgba(65, 250, 105, 0.68)", borderRadius:"5px",
                    width:"fit-content"
                }}>
                    <GiFireFlower style={{fontSize:"18px", color:"rgba(15, 73, 0, 0.96)"}}/>
                </div>
                <span>Crops listed onsale</span>
                <span style={{fontSize:"20px"}}>56</span>
            </div>
            <div className='flex-Column gap10px bRad5 p10px p1 midBlackText pureWhiteBody'
             style={{boxShadow:"1px 2px 17px black", width:"200px",}}>
                <div style={{padding:"7px 12px", backgroundColor:"rgba(3, 194, 188, 0.29)", borderRadius:"5px",
                    width:"fit-content"
                }}>
                    <FaSackDollar style={{fontSize:"18px", color:"rgba(0, 73, 70, 0.96)"}}/>
                </div>
                <span>Sold crops amounts</span>
                <span style={{fontSize:"20px"}}>1425000Tsh</span>
            </div>
            <div className='flex-Column gap10px bRad5 p10px p1 midBlackText pureWhiteBody'
             style={{boxShadow:"1px 2px 17px black", width:"200px",}}>
                <div style={{padding:"7px 12px", backgroundColor:"rgba(194, 3, 76, 0.34)", borderRadius:"5px",
                    width:"fit-content"
                }}>
                    <GiSquareBottle style={{fontSize:"18px", color:"rgba(73, 0, 28, 0.96)"}}/>
                </div>
                <span>Supplies bought</span>
                <span style={{fontSize:"20px"}}>27</span>
            </div>
            <div className='flex-Column gap10px bRad5 p10px p1 midBlackText pureWhiteBody'
             style={{boxShadow:"1px 2px 17px black", width:"200px",}}>
                <div style={{padding:"7px 12px", backgroundColor:"rgba(191, 194, 3, 0.54)", borderRadius:"5px",
                    width:"fit-content"
                }}>
                    <FaHandHoldingDollar style={{fontSize:"18px", color:"rgba(73, 72, 0, 0.96)"}}/>
                </div>
                <span>Amount spent in supplies</span>
                <span style={{fontSize:"20px"}}>89000Tsh</span>
            </div>
        </div>

        {/** GRAPHS */}
        <div className='flex-Row-Wrap gap10px' style={{ justifyContent:"space-between"}}>
            <div className='flex-Column-Grow gap10px p3 pureWhiteBody bRad5' 
            style={{width:"45%",minWidth:"200px",padding:"10px 10px 0px 0px",boxShadow:"1px 2px 7px black",}}>
                <div className='p1 centered'>Crops sales</div>
                <ResponsiveContainer width="100%" height={250} className={""}>
                    <LineChart data={cropSalesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="#2a7f62" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className='flex-Column-Grow gap10px p3 pureWhiteBody bRad5' 
            style={{width:"45%",minWidth:"200px",padding:"10px 10px 0px 0px",boxShadow:"1px 2px 7px black"}}>
                <div className='p1 centered'>Crops categories</div>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                    <Pie data={cropDistributionData} dataKey="value" 
                    nameKey="name" cx="50%" cy="50%" outerRadius={70} innerRadius={13}>
                        {cropDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>           
        </div>

        {/** FAVOURATES */}
        <div style={favourates} >
            <div className='gap10px flex-Column-Grow p10px midBlackText midGreenBody p2'>
                <div className='flex-Row centeredH gap4px'>
                    <FaHeartbeat fontSize={21}/>
                    <span  style={strong}>Favourates</span>
                </div>
            {
                favourateBuyers ? favourateBuyers.map((entry, index)=>(
                    <div className='flex-Row-Wrap-Gap gap10px bRad5 p10px centeredH pureWhiteBody' key={index}
                        style={{boxShadow:"1px 2px 17px black"}}>
                        <img src={background} style={imageStyle} width={60} height={50} alt='pic'/>
                        <div className='flex-Row-Grow-Wrap' style={{gap:"30px", justifyContent:"space-between"}}>
                            <div className='flex-Column gap10px'>
                                <span className='p1'  style={strong}>{entry.name}</span>
                                <span className='p3'>{entry.location}</span>
                            </div>
                            <div className='flex-Column gap10px' >
                                <span className='p1'  style={strong}>{entry.phone}</span>
                                <span className='p3'>{entry.emails}</span>
                            </div>
                            <span className='p3 bRad5 centered w100px' 
                            style={
                                entry.role == "farmer" ? {...role,backgroundColor: "rgba(92, 245, 54, 0.51)"} : 
                                entry.role == "seller" ? {...role,backgroundColor: "rgba(3, 194, 188, 0.29)"} :
                                entry.role == "supplier" && {...role,backgroundColor: "rgba(194, 3, 76, 0.34)"}
                            }>
                                {entry.role}
                            </span>
                        </div>
                    </div>
                )) :
                <div></div>
            }
            </div>

            {/* Recent Interactions */}
            <div className='gap10px flex-Column-Grow p10px midBlackText pureWhiteBody p2'>
                <div className='flex-Row centeredH gap4px'>
                    <MdWatchLater fontSize={21}/>
                    <span  style={strong}>Recent interactions</span>
                </div>
           {
                favourateBuyers ? favourateBuyers.map((entry, index)=>(
                    <div className='flex-Row-Wrap-Gap gap10px bRad5 p10px centeredH midGreenBody' key={index}
                    style={{}}
                        >
                        <img src={background} style={imageStyle} width={60} height={50} alt='pic'/>
                        <div className='flex-Row-Grow-Wrap' style={{gap:"30px", justifyContent:"space-between"}}>
                            <div className='flex-Column gap10px'>
                                <span className='p1' style={strong}>{entry.name}</span>
                                <span className='p3'>{entry.location}</span>
                            </div>
                            <div className='flex-Column gap10px' >
                                <span className='p1' style={strong}>{entry.phone}</span>
                                <span className='p3'>{entry.emails}</span>
                            </div>
                            <span className='p3 bRad5 centered w100px' 
                            style={
                                entry.role == "farmer" ? {...role,backgroundColor: "rgba(92, 245, 54, 0.51)"} : 
                                entry.role == "seller" ? {...role,backgroundColor: "rgba(3, 194, 188, 0.29)"} :
                                entry.role == "supplier" && {...role,backgroundColor: "rgba(194, 3, 76, 0.34)"}
                            }>
                                {entry.role}
                            </span>
                        </div>
                    </div>
                )) :
                <div></div>
            }
            </div>
        </div>     
    </div>
  )
}

const quickStats={
    display:"flex",
    justifyContent:"space-between",
    flexWrap:"wrap",
    gap:"20px",
    padding:"15px 0px"
}
const favourates={
    display:"flex",
    flexDirection:"row",
    flexWrap:"wrap",
    marginTop:"20px",
    justifyContent:"space-between",
    boxShadow:"1px 2px 10px rgba(10,10,10,1)",
}
const imageStyle={
    borderRadius:"5px",
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