import React from 'react';
import { Pie } from 'react-chartjs-2';
import '../styles/analytics.css';

function Analytics({ analytics }) {
  const data = {
    labels: ['Pending', 'In Progress', 'Resolved'],
    datasets: [
      {
        label: 'Complaints',
        data: [analytics.pending, analytics.inProgress, analytics.resolved],
        backgroundColor: ['#ffc107', '#17a2b8', '#28a745'],
        borderColor: ['#fff', '#fff', '#fff'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="analytics-section">
      <div className="cards">
        <div className="card">Total: {analytics.total}</div>
        <div className="card">Pending: {analytics.pending}</div>
        <div className="card">In Progress: {analytics.inProgress}</div>
        <div className="card">Resolved: {analytics.resolved}</div>
      </div>
      <div className="pie-chart">
        <Pie data={data} options={{ responsive: true }} />
      </div>
    </div>
  );
}

export default Analytics;
