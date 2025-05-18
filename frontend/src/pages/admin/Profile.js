// File: frontend/src/pages/admin/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../../styles/profile.css';

function Profile() {
  const [form, setForm] = useState({ name: '', imageBase64: '', preview: '' });
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user')) || {};

  useEffect(() => {
    setForm(prev => ({
      ...prev,
      name: user.name,
      preview: user.profile_image
    }));
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({
        ...prev,
        imageBase64: reader.result,
        preview: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const updateProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put('http://localhost:5000/api/auth/profile', {
        name: form.name,
        imageBase64: form.imageBase64
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      localStorage.setItem('user', JSON.stringify(res.data.user));
      toast.success('Profile updated');
    } catch {
      toast.error('Failed to update profile');
    }
  };

  const updatePassword = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/auth/change-password', {
        newPassword: password
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Password changed');
      setPassword('');
    } catch {
      toast.error('Failed to change password');
    }
  };

  return (
    <div className="profile-container">
      <h2>Admin Profile</h2>
      <div className="profile-form">
        <label>Full Name</label>
        <input
          type="text"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <label>Profile Photo</label>
        <input type="file" onChange={handleImageChange} />
        {form.preview && (
          <img src={form.preview} alt="Preview" className="profile-preview" />
        )}

        <button className="btn-save" onClick={updateProfile}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="password-section">
        <label>New Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={updatePassword}>Change Password</button>
      </div>
    </div>
  );
}

export default Profile;
