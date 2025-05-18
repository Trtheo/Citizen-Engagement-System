import React from 'react';
import '../styles/card.css';

function Card({ title, value, color }) {
  return (
    <div className="card-box" style={{ backgroundColor: color }}>
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
}

export default Card;
