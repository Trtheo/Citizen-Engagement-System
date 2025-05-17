import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ComplaintForm from '../components/ComplaintForm';
import '../styles/dashboard.css';

function CitizenDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [view, setView] = useState('history');
  const [showModal, setShowModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [loading, setLoading] = useState(false);
  const drawerRef = useRef();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/complaints/my', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComplaints(res.data);
    } catch {
      toast.error('Failed to load complaints');
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
      await axios.put(
        'http://localhost:5000/api/auth/change-password',
        { newPassword: password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Password updated');
      setPassword('');
    } catch {
      toast.error('Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.put(
        'http://localhost:5000/api/auth/update-profile',
        { name, imageBase64 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Profile updated');
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setImageBase64('');
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const confirmSubmit = () => {
    setView('form');
    setShowModal(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setImageBase64(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  useEffect(() => {
    fetchComplaints();
    setName(user?.name || '');
  }, []);

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

  return (
    <div className="container">
      <div className="dashboard-header">
        <h2>Citizen Dashboard</h2>
        <div>
          <button className="btn btn-profile" onClick={() => setShowProfile(!showProfile)}>⚙️ Profile</button>
        </div>
      </div>

      {/* Profile Drawer */}
      <div className={`profile-drawer ${showProfile ? 'open' : ''}`} ref={drawerRef}>
        <h3>My Profile</h3>
        <div className="profile-photo-wrapper">
          <img
            src={user?.profile_image || '/default-avatar.png'}
            alt="Profile"
            className="profile-photo"
          />
        </div>
        <form onSubmit={handleUpdateProfile}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
          <input type="file" className="file-input" accept="image/*" onChange={handleImageChange} />
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Update Profile'}
          </button>
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

      <div className="tab-buttons">
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>Submit Complaint</button>
        <button className="btn btn-secondary" onClick={() => setView('history')}>View Complaint History</button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm</h3>
            <p>Do you want to submit a new complaint?</p>
            <div className="modal-actions">
              <button className="btn btn-primary" onClick={confirmSubmit}>Yes</button>
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {view === 'form' && <ComplaintForm onSuccess={fetchComplaints} />}

      {view === 'history' && (
        <>
          {complaints.length === 0 ? (
            <p>No complaints found.</p>
          ) : (
            complaints.map(c => (
              <div key={c.id} className="card">
                <strong>Category:</strong> {c.category}<br />
                <strong>Status:</strong> <span className="status">{c.status}</span><br />
                <strong>Message:</strong> {c.message}<br />
                <strong>Agency:</strong> {c.agency_name || 'N/A'}<br />
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}

export default CitizenDashboard;
