import { useEffect, useState, useContext } from "react";
import { FaSackDollar } from "react-icons/fa6";
import { AuthContext } from "../../AuthProvider";
import ResourceSalesCharts from "./graphs/ResourceSalesCharts";

export default function ResourceSalesStats() {

    const { userData } = useContext(AuthContext);
    const [stats, setStats] = useState({
        instock: { items: 0, total: 0 },
        pending: { items: 0, total: 0 },
        shipped: { items: 0, total: 0 },
        completed: { items: 0, total: 0 }
    });

    useEffect(() => {

        const form = new FormData();
        form.append("user_id", userData.id);

        fetch("http://localhost:4000/get_dashboard_resources_sales", {
            method: "POST",
            body: form
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 200) {
                setStats(data.stats);
            }
        });

    }, []);

    const cardStyle = {
        boxShadow:"1px 2px 17px black",
        width:"200px",
        flex:"1 1 250px"
    };

    const iconWrap = {
        padding:"7px 12px",
        backgroundColor:"rgba(3, 194, 188, 0.29)",
        borderRadius:"5px",
        width:"fit-content"
    };

    return (
        <div style={{ display:'flex', flexWrap:'wrap', gap:'15px' }}>

            {/* INSTOCK */}
            <div className='flex-Column gap10px bRad5 p10px midBlackText pureWhiteBody' style={cardStyle}>
                <div style={iconWrap}>
                    <FaSackDollar style={{ fontSize:"18px", color:"rgba(0,73,70,0.96)" }} />
                </div>

                <span style={{ color:"rgba(1,133,128,0.62)" }}>Resources in stock</span>

                <span style={{ fontSize:"20px" }}>
                    <span style={{ fontSize:"13px" }}>Items </span> {stats.instock.items}
                </span>

                <span style={{ fontSize:"20px" }}>
                    <span style={{ fontSize:"13px" }}>Total Cost </span> {stats.instock.total} Tsh
                </span>
            </div>

            {/* PENDING */}
            <div className='flex-Column gap10px bRad5 p10px midBlackText pureWhiteBody' style={cardStyle}>
                <div style={iconWrap}>
                    <FaSackDollar style={{ fontSize:"18px", color:"rgba(0,73,70,0.96)" }} />
                </div>

                <span style={{ color:"rgba(1,133,128,0.62)" }}>Pending resources sales</span>

                <span style={{ fontSize:"20px" }}>
                    <span style={{ fontSize:"13px" }}>Items </span> {stats.pending.items}
                </span>

                <span style={{ fontSize:"20px" }}>
                    <span style={{ fontSize:"13px" }}>Total Cost </span> {stats.pending.total} Tsh
                </span>
            </div>

            {/* SHIPPED */}
            <div className='flex-Column gap10px bRad5 p10px midBlackText pureWhiteBody' style={cardStyle}>
                <div style={iconWrap}>
                    <FaSackDollar style={{ fontSize:"18px", color:"rgba(0,73,70,0.96)" }} />
                </div>

                <span style={{ color:"rgba(1,133,128,0.62)" }}>Shipped resources sales</span>

                <span style={{ fontSize:"20px" }}>
                    <span style={{ fontSize:"13px" }}>Items </span> {stats.shipped.items}
                </span>

                <span style={{ fontSize:"20px" }}>
                    <span style={{ fontSize:"13px" }}>Total Cost </span> {stats.shipped.total} Tsh
                </span>
            </div>

            {/* COMPLETED */}
            <div className='flex-Column gap10px bRad5 p10px midBlackText pureWhiteBody' style={cardStyle}>
                <div style={iconWrap}>
                    <FaSackDollar style={{ fontSize:"18px", color:"rgba(0,73,70,0.96)" }} />
                </div>

                <span style={{ color:"rgba(1,133,128,0.62)" }}>Completed resources sales</span>

                <span style={{ fontSize:"20px" }}>
                    <span style={{ fontSize:"13px" }}>Items </span> {stats.completed.items}
                </span>

                <span style={{ fontSize:"20px" }}>
                    <span style={{ fontSize:"13px" }}>Total Cost </span> {stats.completed.total} Tsh
                </span>
            </div>
            {stats && (
                <ResourceSalesCharts
                    stats={{
                        pending: { items: stats.pending.items, total: stats.pending.total },
                        shipped: { items: stats.shipped.items, total: stats.shipped.total },
                        completed: { items: stats.completed.items, total: stats.completed.total }
                    }}
                    cropTrendData={[]}
                />
            )}


        </div>
    );
}
