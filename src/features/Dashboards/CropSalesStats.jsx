import { useContext, useEffect, useState } from "react";
import { FaSackDollar } from "react-icons/fa6";
import { GiFireFlower } from "react-icons/gi";
import { AuthContext } from "../../AuthProvider";
import CropSalesCharts from "./graphs/CropSalesCharts";

export default function CropSalesStats(){
    const {userData} = useContext(AuthContext);
    const [farmerData, setFarmerData] = useState([]);
    
    useEffect(()=>{
        async function fetchFarmerDetails(){

            const formedData = new FormData();
            formedData.append('user_id',userData.user_id);
            formedData.append('status', 'onsale');
        try{
            const res = await fetch(' http://localhost:4000/get_dashboard_crops_sales',{
                method:'POST',
                body: formedData
            });

            if(res.ok){
                const farmer_data = await res.json();
                console.log("farmer_data is "+JSON.stringify(farmer_data));
                setFarmerData(farmer_data)
            }
            else{
                alert("Failed to get dashboard crops sales");
            }
        }
        catch(err){

        }
    }fetchFarmerDetails();
    },[]);

    {/** Onslae Crops */}
    const onsaleCrops = farmerData?.onsale_crops || [];
    const crops_items_instock = onsaleCrops.length;
    const estimated_income = onsaleCrops.reduce((acc, crop) => {
        const price = parseFloat(crop.price_per_minimum_sellable_quantity) || 0;
        const quantity = parseFloat(crop.total_quantity) || 0;
        return acc + price * quantity;
    }, 0);

        /** Pending Crops */
    const pendingCrops = farmerData?.pending_crops || [];
    const pending_items = pendingCrops.length;
    const pending_total_cost = pendingCrops.reduce((acc, crop) => {
        const amount = parseFloat(crop.paid_amount) || 0;
        return acc + amount;
    }, 0);

    /** Shipped Crops */
    const shippedCrops = farmerData?.shipped_crops || [];
    const shipped_items = shippedCrops.length;
    const shipped_total_cost = shippedCrops.reduce((acc, crop) => {
        const amount = parseFloat(crop.paid_amount) || 0;
        return acc + amount;
    }, 0);

    /** Completed Crops */
    const completedCrops = farmerData?.completed_crops || [];
    const completed_items = completedCrops.length;
    const completed_total_cost = completedCrops.reduce((acc, crop) => {
        const amount = parseFloat(crop.paid_amount) || 0;
        return acc + amount;
    }, 0);


    return(
        <div style={{display:'flex',flexWrap:'wrap', gap:'15px',}}>

            {/** CROPS TRANSACTIONS */}
            <div className='flex-Column gap10px bRad5 p10px p1 midBlackText pureWhiteBody'
                style={{boxShadow:"1px 2px 17px black", width:"200px", flex:"1 1 250px"}}>
                <div style={{padding:"7px 12px", backgroundColor:"rgba(65, 250, 105, 0.68)", borderRadius:"5px",
                    width:"fit-content"
                }}>
                    <GiFireFlower style={{fontSize:"18px", color:"rgba(15, 73, 0, 0.96)"}}/>
                </div>
                <span style={{color:"rgba(41, 172, 69, 0.68)"}}>Crops available instock</span>
                <span style={{fontSize:"20px", display:'flex', gap:'8px', alignItems:'center'}}><span style={{fontSize:"13px"}}>Items</span>
                    {crops_items_instock}
                </span>
                <span style={{fontSize:"20px", display:'flex', gap:'8px', alignItems:'center'}}><span style={{fontSize:"13px"}}>Estimated Income</span>{estimated_income}</span>
            </div>
            <div className='flex-Column gap10px bRad5 p10px p1 midBlackText pureWhiteBody'
                style={{boxShadow:"1px 2px 17px black", width:"200px", flex:"1 1 250px"}}>
                <div style={{padding:"7px 12px", backgroundColor:"rgba(65, 250, 105, 0.68)", borderRadius:"5px",
                    width:"fit-content"
                }}>
                    <GiFireFlower style={{fontSize:"18px", color:"rgba(15, 73, 0, 0.96)"}}/>
                </div>
                <span style={{color:"rgba(41, 172, 69, 0.68)"}}>Pending crop sales</span>
                <span style={{fontSize:"20px"}}><span style={{fontSize:"13px"}}>Items</span> {pending_items}</span>
                <span style={{fontSize:"20px"}}><span style={{fontSize:"13px"}}>Total Cost</span>  {pending_total_cost}</span>
            </div>
            <div className='flex-Column gap10px bRad5 p10px p1 midBlackText pureWhiteBody'
                style={{boxShadow:"1px 2px 17px black", width:"200px", flex:"1 1 250px"}}>
                <div style={{padding:"7px 12px", backgroundColor:"rgba(65, 250, 105, 0.68)", borderRadius:"5px",
                    width:"fit-content"
                }}>
                    <GiFireFlower style={{fontSize:"18px", color:"rgba(15, 73, 0, 0.96)"}}/>
                </div>
                <span style={{color:"rgba(41, 172, 69, 0.68)"}}>Shipped crop sales</span>
                <span style={{fontSize:"20px"}}><span style={{fontSize:"13px"}}>Items</span> {shipped_items}</span>
                <span style={{fontSize:"20px"}}><span style={{fontSize:"13px"}}>Total Cost</span>  {shipped_total_cost}</span>
            </div>
            <div className='flex-Column gap10px bRad5 p10px p1 midBlackText pureWhiteBody'
                style={{boxShadow:"1px 2px 17px black", width:"200px", flex:"1 1 250px"}}>
                <div style={{padding:"7px 12px", backgroundColor:"rgba(65, 250, 105, 0.68)", borderRadius:"5px",
                    width:"fit-content"
                }}>
                    <GiFireFlower style={{fontSize:"18px", color:"rgba(15, 73, 0, 0.96)"}}/>
                </div>
                <span style={{color:"rgba(41, 172, 69, 0.68)"}}>Completed crop sales</span>
                <span style={{fontSize:"20px"}}><span style={{fontSize:"13px"}}>Items</span> {completed_items} </span>
                <span style={{fontSize:"20px"}}><span style={{fontSize:"13px"}}>Total Cost</span> {completed_total_cost} </span>
            </div>
            <CropSalesCharts stats={{
                pending: { items: pending_items, total: pending_total_cost },
                shipped: { items: shipped_items, total: shipped_total_cost },
                completed: { items: completed_items, total: completed_total_cost }
            }} cropTrendData={[]} />

        </div>
    )
}