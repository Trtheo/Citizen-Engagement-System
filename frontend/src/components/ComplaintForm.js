import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function ComplaintForm({ onSuccess }) {
  const [form, setForm] = useState({ category: '', message: '', agency_id: '' });
  const [agencies, setAgencies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/agencies')
      .then(res => setAgencies(res.data))
      .catch(() => toast.error('Failed to load agencies'));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await axios.post('http://localhost:5000/api/complaints/submit',
        {
          ...form,
          citizen_name: user.name,
          email: user.email,
          agency_id: parseInt(form.agency_id),
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      toast.success('Complaint submitted');
      onSuccess(); // refresh complaints
      setForm({ category: '', message: '', agency_id: '' });
    } catch (err) {
      toast.error('Submission failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Submit New Complaint</h3>
      <select name="category" value={form.category} onChange={handleChange} required>
        <option value="">Select category</option>
        <option>Water</option>
        <option>Electricity</option>
        <option>Roads</option>
        <option>Sanitation</option>
      </select>
      <textarea
        name="message"
        placeholder="Describe your issue"
        value={form.message}
        onChange={handleChange}
        required
      />
      <select name="agency_id" value={form.agency_id} onChange={handleChange} required>
        <option value="">Select agency</option>
        {agencies.map(a => (
          <option key={a.id} value={a.id}>{a.name}</option>
        ))}
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ComplaintForm;
