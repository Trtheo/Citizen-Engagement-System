import React from 'react';
import { FaBars, FaBell } from 'react-icons/fa';
import '../styles/adminDashboard.css';

function Topbar({ toggleSidebar }) {
  const user = JSON.parse(localStorage.getItem('user')) || {};

  return (
    <div className="topbar">
      <FaBars className="menu-icon" onClick={toggleSidebar} />
      <input type="text" className="search-input" placeholder="Search..." />
      <FaBell className="notif-icon" />
      <img
        src={user.profile_image || '/default-avatar.png'}
        alt="Profile"
        className="topbar-avatar"
      />
    </div>
  );
}

export default Topbar;
