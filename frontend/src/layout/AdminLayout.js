import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/admin/Header';
import '../styles/adminLayout.css';

const AdminLayout = () => {
const [isCollapsed, setIsCollapsed] = useState(false);

return (
<div className="admin-layout">
<Sidebar isCollapsed={isCollapsed} />
<div className="main-content">
<Header toggleSidebar={() => setIsCollapsed(!isCollapsed)} />
<div className="page-content">
<Outlet />
</div>
</div>
</div>
);
};

export default AdminLayout;