import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../../styles/agencies.css';

function Agencies() {
  const [agencies, setAgencies] = useState([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchAgencies = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/agencies', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAgencies(res.data);
    } catch {
      toast.error('Failed to load agencies');
    }
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/agencies/${editingId}`, { name }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Agency updated');
      } else {
        await axios.post('http://localhost:5000/api/agencies', { name }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Agency added');
      }
      setName('');
      setEditingId(null);
      fetchAgencies();
    } catch {
      toast.error('Operation failed');
    }
  };

  const handleEdit = (agency) => {
    setEditingId(agency.id);
    setName(agency.name);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this agency?');
    if (!confirm) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/agencies/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Agency deleted');
      fetchAgencies();
    } catch {
      toast.error('Delete failed');
    }
  };

  useEffect(() => {
    fetchAgencies();
  }, []);

  return (
    <div className="agency-container">
      <h3>Manage Agencies</h3>

      <form onSubmit={handleAddOrUpdate} className="agency-form">
        <input
          type="text"
          placeholder="Agency name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
      </form>

      <div className="agency-list">
        {agencies.map(agency => (
          <div key={agency.id} className="agency-item">
            <span>{agency.name}</span>
            <div className="actions">
              <button onClick={() => handleEdit(agency)}>Edit</button>
              <button onClick={() => handleDelete(agency.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Agencies;
