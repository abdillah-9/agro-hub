import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

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

export default function FarmerDashboard() {
  return (
    <div style={styles.container}>
      {/* KPIs */}
      <div style={styles.kpiSection}>
        <div style={styles.kpiCard}>
          <h3 style={styles.kpiTitle}>Crops Listed</h3>
          <p style={styles.kpiValue}>12</p>
        </div>
        <div style={styles.kpiCard}>
          <h3 style={styles.kpiTitle}>This Season Sales</h3>
          <p style={styles.kpiValue}>ETB 45,000</p>
        </div>
        <div style={styles.kpiCard}>
          <h3 style={styles.kpiTitle}>Resources Bought</h3>
          <p style={styles.kpiValue}>5 items</p>
        </div>
        <div style={styles.kpiCard}>
          <h3 style={styles.kpiTitle}>Pending Offers</h3>
          <p style={styles.kpiValue}>3</p>
        </div>
      </div>

      {/* Charts */}
      <div style={styles.chartSection}>
        <div style={styles.chartContainer}>
          <div style={styles.chartTitle}>Crop Sales Over Time</div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={cropSalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#2a7f62" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.chartContainer}>
          <div style={styles.chartTitle}>Crop Type Distribution</div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={cropDistributionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
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

      {/* Quick Actions */}
      <div style={styles.actionsSection}>
        <button style={styles.actionButton}>+ Add Crop</button>
        <button style={styles.actionButton}>Buy Resources</button>
        <button style={styles.actionButton}>Check Offers</button>
      </div>

      {/* Recent Activity */}
      <div style={styles.activitySection}>
        <h3 style={styles.activityTitle}>Recent Activity</h3>
        <ul style={styles.activityList}>
          <li>🌽 Sold 30kg of Maize to Buyer A</li>
          <li>🧪 Bought 10L of pesticide from Supplier X</li>
          <li>💬 Received offer on Wheat crop</li>
        </ul>
      </div>
    </div>
  );
}

// ------------------ Styles ------------------
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  kpiSection: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: '30px',
  },
  kpiCard: {
    backgroundColor: '#f3f3f3',
    padding: '20px',
    borderRadius: '10px',
    width: '22%',
    minWidth: '200px',
    textAlign: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  kpiTitle: {
    marginBottom: '10px',
    fontSize: '16px',
    color: '#666',
  },
  kpiValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#2a7f62',
  },
  chartSection: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    marginBottom: '30px',
    flexWrap: 'wrap',
  },
  chartContainer: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    width: '48%',
    minWidth: '300px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  chartTitle: {
    fontSize: '18px',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  actionsSection: {
    display: 'flex',
    gap: '15px',
    marginBottom: '30px',
  },
  actionButton: {
    padding: '10px 20px',
    backgroundColor: '#2a7f62',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  activitySection: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  activityTitle: {
    fontSize: '18px',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  activityList: {
    listStyle: 'none',
    paddingLeft: '0',
    lineHeight: '1.8em',
  },
};
