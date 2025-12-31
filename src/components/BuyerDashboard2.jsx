import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
} from 'recharts';

const priceTrendData = [
  { month: 'June', price: 320 },
  { month: 'July', price: 310 },
  { month: 'Aug', price: 340 },
  { month: 'Sept', price: 330 },
];

const purchaseVolumeData = [
  { crop: 'Maize', amount: 120 },
  { crop: 'Wheat', amount: 80 },
  { crop: 'Teff', amount: 60 },
];

export default function BuyerDashboard2() {
  return (
    <div style={styles.container}>
      {/* ------------------- Option 1: Primary CTA at Top Right ------------------- */}
      <div style={styles.primaryCTAWrapper}>
        <button style={styles.primaryCTA}>🌾 Buy Crops</button>
      </div>

      {/* ------------------- KPIs ------------------- */}
      <div style={styles.kpiSection}>
        <div style={styles.kpiCard}>
          <h3 style={styles.kpiTitle}>Crops Bought</h3>
          <p style={styles.kpiValue}>14</p>
        </div>
        <div style={styles.kpiCard}>
          <h3 style={styles.kpiTitle}>Pending Orders</h3>
          <p style={styles.kpiValue}>2</p>
        </div>
        <div style={styles.kpiCard}>
          <h3 style={styles.kpiTitle}>Spending</h3>
          <p style={styles.kpiValue}>ETB 27,500</p>
        </div>

        {/* ------------------- Option 2: Buy Crops Button inside KPI Card ------------------- */}
        <div style={styles.kpiCard}>
          <h4 style={styles.kpiTitle}>Need More Crops?</h4>
          <button style={styles.kpiActionButton}>🌾 Buy Crops</button>
        </div>
      </div>

      {/* ------------------- Charts ------------------- */}
      <div style={styles.chartSection}>
        <div style={styles.chartContainer}>
          <div style={styles.chartTitle}>Price Trend (Maize)</div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={priceTrendData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#264653"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.chartContainer}>
          <div style={styles.chartTitle}>Purchase Volume by Crop</div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={purchaseVolumeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="crop" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#2a7f62" />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ------------------- Activity ------------------- */}
      <div style={styles.activitySection}>
        <h3 style={styles.activityTitle}>Recent Activity</h3>
        <ul style={styles.activityList}>
          <li>📦 Ordered 100kg Wheat from Farmer Y</li>
          <li>💰 Offer accepted for Teff at 310 ETB</li>
          <li>📝 Order pending delivery from Farmer K</li>
        </ul>
      </div>

      {/* ------------------- Option 3: Floating Buy Button ------------------- */}
      <button
        style={styles.floatingBuyButton}
        title="Buy Crops"
        aria-label="Buy Crops"
      >
        🌾
      </button>
    </div>
  );
}

// ------------------ Styles ------------------
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    position: 'relative',
    minHeight: '100vh',
  },
  // Option 1: Primary CTA at Top Right
  primaryCTAWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '20px',
  },
  primaryCTA: {
    padding: '12px 30px',
    fontSize: '16px',
    backgroundColor: '#2e7d32',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 3px 8px rgba(0,0,0,0.15)',
    transition: 'background-color 0.3s ease',
  },
  // KPIs
  kpiSection: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: '30px',
    gap: '20px',
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
  // Option 2: Buy Crops Button inside KPI Card
  kpiActionButton: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#388e3c',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
    transition: 'background-color 0.3s ease',
  },
  // Charts
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
  // Activity
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
  // Option 3: Floating Buy Button
  floatingBuyButton: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#2e7d32',
    color: 'white',
    fontSize: '28px',
    border: 'none',
    boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
    cursor: 'pointer',
    zIndex: 999,
  },
};
