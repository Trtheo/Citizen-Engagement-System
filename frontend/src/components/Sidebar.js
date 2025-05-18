import React, { useState } from 'react';
import { FaHome, FaUsers, FaChartPie, FaTable, FaUserCircle, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import '../styles/sidebar.css';

function Sidebar({ collapsed, toggleSidebar }) {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
    toggleSidebar?.(); // optionally sync with parent
  };

  const navItems = [
    { path: '/admin', icon: <FaHome />, label: 'Dashboard' },
    { path: '/admin/agencies', icon: <FaUsers />, label: 'Agencies' },
    { path: '/admin/complaints', icon: <FaTable />, label: 'Complaints' },
    { path: '/admin/analytics', icon: <FaChartPie />, label: 'Analytics' },
    { path: '/admin/profile', icon: <FaUserCircle />, label: 'Profile' },
  ];

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-top">
        <button className="toggle-btn" onClick={handleToggle}>
          <FaBars />
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(item => (
          <NavLink key={item.path} to={item.path} className="nav-item">
            {item.icon}
            {!isCollapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <NavLink to="/" className="nav-item">
          <FaSignOutAlt />
          {!isCollapsed && <span>Logout</span>}
        </NavLink>
      </div>
    </div>
  );
}
export default Sidebar;




