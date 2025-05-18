import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/admin/Header';
import '../../styles/adminLayout.css';

function AdminLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="admin-layout">
      <Sidebar isCollapsed={isCollapsed} />
      <div className={`main-content ${isCollapsed ? 'collapsed' : ''}`}>
        <Header toggleSidebar={toggleSidebar} />
        <div className="page-body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
