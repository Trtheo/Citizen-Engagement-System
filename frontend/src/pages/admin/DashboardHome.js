import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import '../../styles/dashboardHome.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function DashboardHome() {
  const [complaints, setComplaints] = useState([]);

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/complaints', { headers });
        setComplaints(res.data);
      } catch (error) {
        console.error('Failed to fetch complaints');
      }
    };
    fetchData();
  }, []);

  const analytics = {
    total: complaints.length,
    pending: complaints.filter((c) => c.status === 'Pending').length,
    inProgress: complaints.filter((c) => c.status === 'In Progress').length,
    resolved: complaints.filter((c) => c.status === 'Resolved').length,
  };

  const pieData = {
    labels: ['Pending', 'In Progress', 'Resolved'],
    datasets: [
      {
        data: [analytics.pending, analytics.inProgress, analytics.resolved],
        backgroundColor: ['#ffc107', '#17a2b8', '#28a745'],
        borderWidth: 1,
        borderColor: '#fff',
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div className="dashboard-home">
      <h2>Overview</h2>

      <div className="cards-container">
        <div className="card">Total Complaints: {analytics.total}</div>
        <div className="card">Pending: {analytics.pending}</div>
        <div className="card">In Progress: {analytics.inProgress}</div>
        <div className="card">Resolved: {analytics.resolved}</div>
      </div>

      <div className="chart-section">
        <h3>Status Breakdown</h3>
        <Pie data={pieData} options={pieOptions} />
      </div>
    </div>
  );
}

export default DashboardHome;
