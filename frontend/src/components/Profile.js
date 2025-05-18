import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/profile.css';

function Profile({ user, onClose }) {
  const [name, setName] = useState(user?.name || '');
  const [imageBase64, setImageBase64] = useState('');
  const [preview, setPreview] = useState(user?.profile_image || '');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result);
      setPreview(reader.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        'http://localhost:5000/api/auth/profile',
        { name, imageBase64 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.setItem('user', JSON.stringify(res.data.user));
      toast.success('Profile updated');
      onClose();
    } catch {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="profile-panel">
      <h3>Update Profile</h3>
      <img src={preview} alt="Preview" className="profile-avatar" />
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="btn-save" onClick={handleSave}>
        Save Changes
      </button>
      <button className="btn-close" onClick={onClose}>
        Close
      </button>
    </div>
  );
}

export default Profile;
