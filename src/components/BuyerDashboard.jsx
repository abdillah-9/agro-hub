import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, CartesianGrid, Legend
} from 'recharts';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

// ------------ Mock Data ------------
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

const favoriteFarmers = [
  { id: 1, name: 'Farmer K', avatar: '🧑‍🌾', isFavorite: true },
  { id: 2, name: 'Farmer L', avatar: '👩‍🌾', isFavorite: true },
];

const recentContacts = [
  { id: 3, name: 'Farmer Y', avatar: '🧑‍🌾' },
  { id: 4, name: 'Supplier A', avatar: '🚜' },
];

export default function BuyerDashboard() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* KPIs */}
        <section style={styles.section}>
          <div style={styles.kpiCard}><h4 style={styles.kpiTitle}>Crops Bought</h4><p style={styles.kpiValue}>14</p></div>
          <div style={styles.kpiCard}><h4 style={styles.kpiTitle}>Pending Orders</h4><p style={styles.kpiValue}>2</p></div>
          <div style={styles.kpiCard}><h4 style={styles.kpiTitle}>Spending</h4><p style={styles.kpiValue}>ETB 27,500</p></div>
        </section>

        {/* Charts */}
        <section style={styles.section}>
          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>📈 Price Trend (Maize)</h3>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={priceTrendData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#009688" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>🌾 Purchase Volume by Crop</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={purchaseVolumeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="crop" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#607d8b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Favorites */}
        <section style={styles.sectionColumn}>
          <h3 style={styles.sectionTitle}>❤️ Favorite Farmers</h3>
          <div style={styles.userGrid}>
            {favoriteFarmers.map(user => (
              <div key={user.id} style={styles.userCard}>
                <span style={styles.avatar}>{user.avatar}</span>
                <span style={styles.name}>{user.name}</span>
                <FaHeart style={styles.heartIconFilled} />
              </div>
            ))}
          </div>
        </section>

        {/* Recent Interactions */}
        <section style={styles.sectionColumn}>
          <h3 style={styles.sectionTitle}>🕒 Recent Interactions</h3>
          <div style={styles.userGrid}>
            {recentContacts.map(user => (
              <div key={user.id} style={styles.userCard}>
                <span style={styles.avatar}>{user.avatar}</span>
                <span style={styles.name}>{user.name}</span>
                <FaRegHeart style={styles.heartIcon} />
              </div>
            ))}
          </div>
        </section>

        {/* Actions */}
        <section style={styles.actionsSection}>
          <button style={styles.button}>🛒 Buy Crops</button>
          <button style={styles.button}>📋 View Orders</button>
          <button style={styles.button}>✉️ Send Offer</button>
        </section>

        {/* Activity */}
        <section style={styles.activitySection}>
          <h3 style={styles.sectionTitle}>📋 Recent Activity</h3>
          <ul style={styles.activityList}>
            <li>📦 Ordered 100kg Wheat from Farmer Y</li>
            <li>💰 Offer accepted for Teff at 310 ETB</li>
            <li>📝 Order pending delivery from Farmer K</li>
          </ul>
        </section>

      </div>
    </div>
  );
}

// ------------------- Styles -------------------
const styles = {
  page: {
    background: 'linear-gradient(to right, #e0f7fa, #f1f8e9)',
    minHeight: '100vh',
    padding: '30px',
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  },
  section: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'space-between',
  },
  sectionColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  kpiCard: {
    background: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(8px)',
    borderRadius: '15px',
    padding: '20px',
    width: '30%',
    minWidth: '180px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    textAlign: 'center',
  },
  kpiTitle: {
    fontSize: '14px',
    color: '#555',
  },
  kpiValue: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#004d40',
  },
  chartCard: {
    background: '#fff',
    borderRadius: '15px',
    padding: '20px',
    flex: '1',
    minWidth: '300px',
    boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
  },
  chartTitle: {
    fontSize: '16px',
    marginBottom: '10px',
    fontWeight: '600',
    color: '#333',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#004d40',
  },
  userGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
  },
  userCard: {
    display: 'flex',
    alignItems: 'center',
    background: 'white',
    padding: '10px 15px',
    borderRadius: '12px',
    boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
    minWidth: '180px',
    flex: '0 0 auto',
  },
  avatar: {
    fontSize: '24px',
    marginRight: '10px',
  },
  name: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#333',
  },
  heartIcon: {
    marginLeft: 'auto',
    color: '#bbb',
    cursor: 'pointer',
  },
  heartIconFilled: {
    marginLeft: 'auto',
    color: 'crimson',
    cursor: 'pointer',
  },
  actionsSection: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
  },
  button: {
    padding: '12px 25px',
    fontSize: '15px',
    backgroundColor: '#26a69a',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
    transition: '0.3s ease',
  },
  activitySection: {
    background: '#ffffff',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
  },
  activityList: {
    marginTop: '10px',
    listStyle: 'none',
    paddingLeft: '0',
    lineHeight: '1.7em',
    color: '#444',
  },
};
