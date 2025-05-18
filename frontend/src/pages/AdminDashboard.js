import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import DashboardCards from '../components/DashboardCards';
import ComplaintsTable from '../components/ComplaintsTable';
import Agencies from '../components/Agencies';
import Analytics from '../components/Analytics';
import Profile from '../components/Profile';
import '../styles/adminDashboard.css';

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <DashboardCards />
            <ComplaintsTable />
          </>
        );
      case 'agencies':
        return <Agencies />;
      case 'analytics':
        return <Analytics />;
      case 'profile':
        return <Profile />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar isOpen={sidebarOpen} setActiveTab={setActiveTab} activeTab={activeTab} />
      <div className="main-content">
        <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="dashboard-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
