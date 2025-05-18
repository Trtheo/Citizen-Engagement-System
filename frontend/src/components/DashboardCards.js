import React from 'react';

function DashboardCards() {
  return (
    <div className="cards-container">
      <div className="card-box purple">Total Complaints: 120</div>
      <div className="card-box blue">Pending: 35</div>
      <div className="card-box green">Resolved: 80</div>
      <div className="card-box orange">In Progress: 5</div>
    </div>
  );
}

export default DashboardCards;
