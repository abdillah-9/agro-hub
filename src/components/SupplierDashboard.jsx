import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const productSalesData = [
  { product: 'Fertilizer', sales: 340 },
  { product: 'Pesticide', sales: 220 },
  { product: 'Seeds', sales: 170 },
];

const inventoryData = [
  { name: 'Fertilizer', value: 25 },
  { name: 'Pesticide', value: 40 },
  { name: 'Seeds', value: 35 },
];

const COLORS = ['#f4a261', '#2a9d8f', '#e76f51'];

export default function SupplierDashboard() {
  return (
    <div style={styles.container}>
      {/* KPIs */}
      <div style={styles.kpiSection}>
        <div style={styles.kpiCard}><h3 style={styles.kpiTitle}>Products Listed</h3><p style={styles.kpiValue}>8</p></div>
        <div style={styles.kpiCard}><h3 style={styles.kpiTitle}>Orders This Month</h3><p style={styles.kpiValue}>17</p></div>
        <div style={styles.kpiCard}><h3 style={styles.kpiTitle}>Revenue</h3><p style={styles.kpiValue}>ETB 61,000</p></div>
      </div>

      {/* Charts */}
      <div style={styles.chartSection}>
        <div style={styles.chartContainer}>
          <div style={styles.chartTitle}>Top-Selling Products</div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={productSalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#e76f51" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.chartContainer}>
          <div style={styles.chartTitle}>Inventory Status</div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={inventoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                {inventoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Actions */}
      <div style={styles.actionsSection}>
        <button style={styles.actionButton}>Add Product</button>
        <button style={styles.actionButton}>View Orders</button>
        <button style={styles.actionButton}>Respond to Offers</button>
      </div>

      {/* Activity */}
      <div style={styles.activitySection}>
        <h3 style={styles.activityTitle}>Recent Activity</h3>
        <ul style={styles.activityList}>
          <li>🧪 Pesticide order placed by Farmer X</li>
          <li>📦 Seeds low in stock (10 left)</li>
          <li>💬 Received offer on bulk fertilizer</li>
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
