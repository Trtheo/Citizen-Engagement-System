import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/auth.css';
import { Link, useNavigate } from 'react-router-dom';

function RegisterForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const uploadToCloudinary = async () => {
    if (!imageFile) return null;
    const data = new FormData();
    data.append('file', imageFile);
    data.append('upload_preset', 'citizen_system'); // replace with your actual preset
    const res = await axios.post('https://api.cloudinary.com/v1_1/trtheo/image/upload', data);
    return res.data.secure_url;
  };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     let imageUrl = null;
//     if (imageFile) {
//       const data = new FormData();
//       data.append('file', imageFile);
//       data.append('upload_preset', 'citizen_system'); // your Cloudinary preset

//       const uploadRes = await axios.post('https://api.cloudinary.com/v1_1/trtheo/image/upload', data);
//       imageUrl = uploadRes.data.secure_url;
//     }

//     // ✅ Send JSON payload instead of FormData
//     const payload = {
//       name: form.name,
//       email: form.email,
//       password: form.password,
//       profile_image: imageUrl || null
//     };

//     await axios.post('http://localhost:5000/api/auth/register', payload, {
//       headers: { 'Content-Type': 'application/json' }
//     });

//     toast.success('Registered successfully');
//     navigate('/login');
//   } catch (err) {
//     toast.error(err.response?.data?.error || 'Registration failed');
//   }
// };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    console.log('Uploading image...');
    let imageUrl = null;
    if (imageFile) {
      const data = new FormData();
      data.append('file', imageFile);
      data.append('upload_preset', 'citizen_system');

      const uploadRes = await axios.post('https://api.cloudinary.com/v1_1/trtheo/image/upload', data);
      imageUrl = uploadRes.data.secure_url;
    }

    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      profile_image: imageUrl || null
    };

    console.log('Sending payload:', payload);

    const response = await axios.post('http://localhost:5000/api/auth/register', payload, {
      headers: { 'Content-Type': 'application/json' }
    });

    console.log('Registration successful:', response.data);
    toast.success('Registered successfully');
    navigate('/login');
  } catch (err) {
    console.error('Registration error:', err.response || err.message);
    toast.error(err.response?.data?.error || 'Registration failed');
  }
};


  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Register</h2>
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />

        <label className="file-label">
          Choose Profile Photo
          <input type="file" accept="image/*" onChange={handleImage} hidden />
        </label>

        {preview && <img src={preview} alt="Preview" className="profile-preview" />}

        <button type="submit">Register</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}

export default RegisterForm;
