import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Analytics = ({ complaints = [] }) => {
  const total = complaints.length;
  const pending = complaints.filter(c => c.status === 'Pending').length;
  const inProgress = complaints.filter(c => c.status === 'In Progress').length;
  const resolved = complaints.filter(c => c.status === 'Resolved').length;

  const data = {
    labels: ['Pending', 'In Progress', 'Resolved'],
    datasets: [
      {
        data: [pending, inProgress, resolved],
        backgroundColor: ['#f0ad4e', '#5bc0de', '#5cb85c'],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { font: { size: 12 } }
      }
    }
  };

  return (
    <div className="page-content">
      <h2>Complaint Analytics</h2>

      <div className="analytics-cards">
        <div className="card">Total: {total}</div>
        <div className="card">Pending: {pending}</div>
        <div className="card">In Progress: {inProgress}</div>
        <div className="card">Resolved: {resolved}</div>
      </div>

      <div className="pie-chart">
        <Pie data={data} options={options} height={200} />
      </div>
    </div>
  );
};

export default Analytics;
