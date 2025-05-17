import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [filters, setFilters] = useState({ category: '', status: '', search: '' });
  const [page, setPage] = useState(1);
  const [password, setPassword] = useState('');
  const [updatedName, setUpdatedName] = useState('');
  const [imageBase64, setImageBase64] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const pageSize = 10;
  const navigate = useNavigate();
  const drawerRef = useRef();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape') setShowProfile(false);
    };
    if (showProfile) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showProfile]);

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/complaints', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComplaints(res.data);
      setFiltered(res.data);
    } catch {
      toast.error('Failed to fetch complaints');
    }
  };

  const fetchAgencies = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/agencies');
      setAgencies(res.data);
    } catch {
      toast.error('Failed to load agencies');
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/complaints/status/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Status updated');
      fetchComplaints();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const updateAgency = async (id, agency_id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/complaints/agency/${id}`, { agency_id }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Agency updated');
      fetchComplaints();
    } catch {
      toast.error('Failed to update agency');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out');
    navigate('/');
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/auth/change-password', {
        newPassword: password
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Password updated');
      setPassword('');
    } catch {
      toast.error('Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImageBase64(reader.result);
    reader.readAsDataURL(file);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put('http://localhost:5000/api/auth/update-profile', {
        name: updatedName,
        imageBase64
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      localStorage.setItem('user', JSON.stringify(res.data.user));
      toast.success('Profile updated');
    } catch {
      toast.error('Failed to update profile');
    }
  };

  useEffect(() => {
    fetchComplaints();
    fetchAgencies();
    setUpdatedName(user?.name || '');
  }, []);

  useEffect(() => {
    let data = [...complaints];
    const { category, status, search } = filters;
    if (category) data = data.filter(c => c.category === category);
    if (status) data = data.filter(c => c.status === status);
    if (search) {
      data = data.filter(c =>
        c.citizen_name.toLowerCase().includes(search.toLowerCase()) ||
        c.message.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFiltered(data);
    setPage(1);
  }, [filters, complaints]);

  const analytics = {
    total: filtered.length,
    pending: filtered.filter(c => c.status === 'Pending').length,
    inProgress: filtered.filter(c => c.status === 'In Progress').length,
    resolved: filtered.filter(c => c.status === 'Resolved').length
  };

  const paginatedData = filtered.slice((page - 1) * pageSize, page * pageSize);
  const pageCount = Math.ceil(filtered.length / pageSize);

  return (
    <div className="container">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <div>
          <button className="btn btn-profile" onClick={() => setShowProfile(!showProfile)}>⚙️ Profile</button>
        </div>
      </div>

      {/* Profile Drawer */}
      <div className={`profile-drawer ${showProfile ? 'open' : ''}`} ref={drawerRef}>
        <h3>Admin Profile</h3>
        <div className="profile-photo-wrapper">
          <img
            src={user?.profile_image || 'https://via.placeholder.com/100'}
            alt="Profile"
            className="profile-photo"
          />
          <input type="file" accept="image/*" onChange={handlePhotoChange} className="file-input" />
        </div>
        <form onSubmit={handleProfileUpdate}>
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            placeholder="Your name"
            required
          />
          <button type="submit" className="btn btn-primary">Update Profile</button>
        </form>

        <form onSubmit={handleChangePassword} className="password-form">
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Change Password'}
          </button>
        </form>

        <button className="btn btn-logout" onClick={handleLogout} style={{ marginTop: '15px' }}>
          Logout
        </button>
      </div>

      {/* Analytics */}
      <div className="analytics">
        <span>Total: {analytics.total}</span>
        <span>Pending: {analytics.pending}</span>
        <span>In Progress: {analytics.inProgress}</span>
        <span>Resolved: {analytics.resolved}</span>
      </div>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name or message"
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <select onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
          <option value="">All Categories</option>
          <option>Water</option>
          <option>Electricity</option>
          <option>Roads</option>
          <option>Sanitation</option>
        </select>
        <select onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
          <option value="">All Status</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Category</th>
              <th>Message</th>
              <th>Status</th>
              <th>Agency</th>
              <th>Update Status</th>
              <th>Assign Agency</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map(c => (
                <tr key={c.id}>
                  <td>{c.citizen_name}</td>
                  <td>{c.email}</td>
                  <td>{c.category}</td>
                  <td>{c.message}</td>
                  <td>{c.status}</td>
                  <td>{c.agency_name || 'Unassigned'}</td>
                  <td>
                    <select value={c.status} onChange={e => updateStatus(c.id, e.target.value)} className="select">
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                    </select>
                  </td>
                  <td>
                    <select
                      value={c.agency_id || ''}
                      onChange={e => updateAgency(c.id, e.target.value)}
                      className="select"
                    >
                      <option value="">Assign...</option>
                      {agencies.map(a => (
                        <option key={a.id} value={a.id}>{a.name}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="8">No matching complaints found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: pageCount }, (_, i) => (
          <button
            key={i}
            className={`btn ${page === i + 1 ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Pie Chart */}
      <div className="pie-chart">
        <Pie
          data={{
            labels: ['Pending', 'In Progress', 'Resolved'],
            datasets: [{
              data: [analytics.pending, analytics.inProgress, analytics.resolved],
              backgroundColor: ['#ffc107', '#17a2b8', '#28a745'],
              borderColor: ['#fff', '#fff', '#fff'],
              borderWidth: 1
            }]
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
                labels: { font: { size: 12 } }
              }
            }
          }}
          height={150}
        />
      </div>
    </div>
  );
}

export default AdminDashboard;
