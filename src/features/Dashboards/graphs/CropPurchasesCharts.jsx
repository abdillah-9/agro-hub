import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function CropPurchasesCharts({ stats }) {
  if (!stats) return null;

  // Prepare data for bar chart
  const barData = [
    { status: "Pending", items: stats.pending.items, total: stats.pending.total },
    { status: "Shipped", items: stats.shipped.items, total: stats.shipped.total },
    { status: "Completed", items: stats.completed.items, total: stats.completed.total },
  ];

  // Prepare data for pie chart
  const pieData = [
    { name: "Pending", value: stats.pending.items },
    { name: "Shipped", value: stats.shipped.items },
    { name: "Completed", value: stats.completed.items },
  ];

  const COLORS = ["#FFBB28", "#00C49F", "#FF6961"]; // Colors for pie slices

  return (
    <div style={{ width: "100%", marginTop: "20px" }}>
      {/* MAIN HEADING */}
      <div style={{ textAlign: "center", maxWidth: "500px", margin: "0 auto", marginBottom: 30 }}>
        <div style={{ fontSize: 16, fontWeight: 600 }}>Crop Purchases Statistics</div>
        <div style={{ fontSize: 12, color: "#718096" }}>
          Pending, shipped and completed purchases
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
        {/* BAR CHART */}
        <div style={{ width: "100%", maxWidth: "500px", marginBottom: 40 }}>
          <div style={{ fontSize: 14, fontWeight: 600, textAlign: "center", marginBottom: 8 }}>
            Purchases Distribution
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={barData} barCategoryGap={10} barGap={0}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" tick={{ fontSize: "10px" }} />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: "10px" }}
                label={{ value: "Items Purchased", angle: -90, position: "insideLeft", fontSize: "12px" }}
                width={35}
              />
              <YAxis
                yAxisId="right"
                tick={{ fontSize: "10px" }}
                orientation="right"
                label={{ value: "Total Cost (Tsh)", angle: 90, position: "insideRight", fontSize: "12px" }}
                width={50}
              />
              <Tooltip />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: 10 }} />
              <Bar yAxisId="left" dataKey="items" fill="#ffb347" name="Items Purchased" barSize={15} />
              <Bar yAxisId="right" dataKey="total" fill="#ff6961" name="Total Cost (Tsh)" barSize={15} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div style={{ width: "100%", maxWidth: "600px" }}>
          <div style={{ fontSize: 14, fontWeight: 600, textAlign: "center", marginBottom: 8 }}>
            Purchases Overview
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                labelLine={false}
                paddingAngle={1}
                label={({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = innerRadius + (outerRadius - innerRadius) / 2;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);
                  return (
                    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight={700}>
                      {value} purchases
                    </text>
                  );
                }}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: 10 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
