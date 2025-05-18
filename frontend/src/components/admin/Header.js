import React from 'react';
import { FaBars, FaSearch, FaBell } from 'react-icons/fa';
import '../../styles/header.css';

function Header({ toggleSidebar }) {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <header className="admin-header">
      <div className="left-section">
        <FaBars onClick={toggleSidebar} className="menu-icon" />
        <h1 className="logo">Citizen System</h1>
      </div>

      <div className="right-section">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search..." />
        </div>
        <FaBell className="notification-icon" />
        <img
          src={user?.profile_image || '/default-avatar.png'}
          alt="avatar"
          className="avatar-img"
        />
      </div>
    </header>
  );
}

export default Header;
