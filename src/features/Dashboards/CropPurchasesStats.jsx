import { useContext, useEffect, useState } from "react";
import { FaSackDollar } from "react-icons/fa6";
import { AuthContext } from "../../AuthProvider";
import CropPurchasesCharts from "./graphs/CropPurchasesCharts";

export default function CropPurchasesStats(){

    const { userData } = useContext(AuthContext);
    const [purchasesData, setPurchasesData] = useState([]);

    useEffect(() => {
        async function fetchPurchasesDetails() {
            const formedData = new FormData();
            formedData.append("user_id", userData.user_id);

            try {
                const res = await fetch("https://agrohub-backend.onrender.com/get_dashboard_crops_purchases", {
                    method: "POST",
                    body: formedData
                });

                if (res.ok) {
                    const data = await res.json();
                    console.log("purchases_data is " + JSON.stringify(data));
                    setPurchasesData(data);
                }
            } catch (err) { }
        }

        fetchPurchasesDetails();
    }, []);

    /** Extract purchased datasets */
    const pendingCrops = purchasesData?.pending_crops || [];
    const shippedCrops = purchasesData?.shipped_crops || [];
    const completedCrops = purchasesData?.completed_crops || [];

    /** Stats */
    const pending_items = pendingCrops.length;
    const pending_total_cost = pendingCrops.reduce((acc, c) => acc + (parseFloat(c.paid_amount) || 0), 0);

    const shipped_items = shippedCrops.length;
    const shipped_total_cost = shippedCrops.reduce((acc, c) => acc + (parseFloat(c.paid_amount) || 0), 0);

    const completed_items = completedCrops.length;
    const completed_total_cost = completedCrops.reduce((acc, c) => acc + (parseFloat(c.paid_amount) || 0), 0);

    return(
        <div style={{display:'flex', flexWrap:'wrap', gap:'15px', marginTop:'50px'}}>

            {/** RESOURCES PENDING */}
            <div className='flex-Column gap10px bRad5 p10px p1 midBlackText pureWhiteBody'
             style={{boxShadow:"1px 2px 17px black", width:"200px", flex:"1 1 250px"}}>
                <div style={{padding:"7px 12px", backgroundColor:"rgba(3, 194, 188, 0.29)", borderRadius:"5px", width:"fit-content"}}>
                    <FaSackDollar style={{fontSize:"18px", color:"rgba(0, 73, 70, 0.96)"}}/>
                </div>

                <span style={{color:"rgba(1, 133, 128, 0.62)"}}>Pending crops purchases</span>
                <span style={{fontSize:"20px"}}>
                    <span style={{fontSize:"13px"}}>Items</span> {pending_items}
                </span>
                <span style={{fontSize:"20px"}}>
                    <span style={{fontSize:"13px"}}>Total Cost</span> {pending_total_cost} Tsh
                </span>
            </div>

            {/** RESOURCES SHIPPED */}
            <div className='flex-Column gap10px bRad5 p10px p1 midBlackText pureWhiteBody'
             style={{boxShadow:"1px 2px 17px black", width:"200px", flex:"1 1 250px"}}>
                <div style={{padding:"7px 12px", backgroundColor:"rgba(3, 194, 188, 0.29)", borderRadius:"5px", width:"fit-content"}}>
                    <FaSackDollar style={{fontSize:"18px", color:"rgba(0, 73, 70, 0.96)"}}/>
                </div>

                <span style={{color:"rgba(1, 133, 128, 0.62)"}}>Shipped crops purchases</span>
                <span style={{fontSize:"20px"}}>
                    <span style={{fontSize:"13px"}}>Items</span> {shipped_items}
                </span>
                <span style={{fontSize:"20px"}}>
                    <span style={{fontSize:"13px"}}>Total Cost</span> {shipped_total_cost} Tsh
                </span>
            </div>

            {/** RESOURCES COMPLETED */}
            <div className='flex-Column gap10px bRad5 p10px p1 midBlackText pureWhiteBody'
             style={{boxShadow:"1px 2px 17px black", width:"200px", flex:"1 1 250px"}}>
                <div style={{padding:"7px 12px", backgroundColor:"rgba(3, 194, 188, 0.29)", borderRadius:"5px", width:"fit-content"}}>
                    <FaSackDollar style={{fontSize:"18px", color:"rgba(0, 73, 70, 0.96)"}}/>
                </div>

                <span style={{color:"rgba(1, 133, 128, 0.62)"}}>Completed crops purchases</span>
                <span style={{fontSize:"20px"}}>
                    <span style={{fontSize:"13px"}}>Items</span> {completed_items}
                </span>
                <span style={{fontSize:"20px"}}>
                    <span style={{fontSize:"13px"}}>Total Cost</span> {completed_total_cost} Tsh
                </span>
            </div>
            <CropPurchasesCharts  stats={{
                pending: { items: pending_items, total: pending_total_cost },
                shipped: { items: shipped_items, total: shipped_total_cost },
                completed: { items: completed_items, total: completed_total_cost }
            }} cropTrendData={[]} />

        </div>
    )
}
