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
} from "recharts";

export default function CropSalesCharts({ stats, title }) {
  if (!stats) return null;

  // Prepare data for chart
  const barData = [
    {
      status: "Pending",
      items: stats.pending.items,
      total: stats.pending.total,
    },
    {
      status: "Shipped",
      items: stats.shipped.items,
      total: stats.shipped.total,
    },
    {
      status: "Completed",
      items: stats.completed.items,
      total: stats.completed.total,
    },
  ];

  return (
    <div style={{ width: "100%", height: 350, marginTop: "20px" }}>
      {title && <h3 style={{ textAlign: "center" }}>{title}</h3>}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={barData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="status" />
          <YAxis
            yAxisId="left"
            label={{ value: "Items", angle: -90, position: "insideLeft" }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{ value: "Total (Tsh)", angle: 90, position: "insideRight" }}
          />
          <Tooltip />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey="items"
            fill="#82ca9d"
            name="Items"
            barSize={20}
          />
          <Bar
            yAxisId="right"
            dataKey="total"
            fill="#8884d8"
            name="Total Cost"
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
