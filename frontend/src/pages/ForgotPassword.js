import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/form.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      toast.success(res.data.message || 'Reset link sent to your email');
      setEmail('');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to send reset link');
    }
  };

  return (
    <div className="form-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        <a href="/login">Back to Login</a>
      </p>
    </div>
  );
}

export default ForgotPassword;
