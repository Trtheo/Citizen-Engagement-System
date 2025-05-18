// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import LoginForm from './pages/LoginForm';
// import RegisterForm from './pages/RegisterForm';
// import ForgotPassword from './pages/ForgotPassword';
// import ResetPassword from './pages/ResetPassword';
// import CitizenDashboard from './pages/CitizenDashboard';
// import AdminDashboard from './pages/AdminDashboard';
// import ProtectedRoute from './components/ProtectedRoute';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LoginForm />} />
//         <Route path="/login" element={<LoginForm />} />
//         <Route path="/register" element={<RegisterForm />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password/:token" element={<ResetPassword />} />

//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute role="citizen">
//               <CitizenDashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute role="admin">
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>

//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop />
//     </Router>
//   );
// }

// export default App;


// APP JS WITH NEW ADMIN DASH

// src/App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './layout/AdminLayout';
import DashboardHome from './pages/admin/DashboardHome';
import Agencies from './pages/admin/Agencies';
import Analytics from './pages/admin/Analytics';
import Profile from './pages/admin/Profile';
import Complaints from './pages/admin/Complaints';
import LoginForm from './pages/LoginForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="agencies" element={<Agencies />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="profile" element={<Profile />} />
          <Route path="complaints" element={<Complaints />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

