const express = require('express');
const cors = require('cors');
const complaintsRoutes = require('./routes/complaints');
const agencyRoutes = require('./routes/agencies');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

const app = express();

//  middleware comes first
app.use(cors());
app.use(express.json());

// then routes
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintsRoutes);
app.use('/api/agencies', agencyRoutes);
app.use('/api/admin', adminRoutes);


module.exports = app;
