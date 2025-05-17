import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as styles from '../styles/common';


function ComplaintTracker() {
  const [email, setEmail] = useState('');
  const [complaints, setComplaints] = useState([]);

  const handleTrack = async () => {
    if (!email) {
      toast.warning("Please enter your email");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5000/api/complaints/user/${email}`);
      if (res.data.length === 0) {
        toast.info("No complaints found for this email");
      }
      setComplaints(res.data);
    } catch (err) {
      toast.error("Failed to fetch complaints");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Track Your Complaint</h2>
      <div style={styles.form}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email"
          style={styles.input}
        />
        <button onClick={handleTrack} style={styles.button}>Track</button>
      </div>
      <ul style={styles.list}>
        {complaints.map(c => (
          <li key={c.id} style={styles.listItem}>
            <strong>{c.category}</strong>: {c.status}
          </li>
        ))}
      </ul>
    </div>
  );


}


export default ComplaintTracker;
