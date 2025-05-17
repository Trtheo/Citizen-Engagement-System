 ## Test All Endpoints (Optional with Postman)
POST http://localhost:5000/api/complaints/submit       – submit complaint

GET http://localhost:5000/api/complaints/              – list all complaints (admin)

GET http://localhost:5000/api/complaints/user/:email   – get citizen-specific

PUT http://localhost:5000/api/complaints/status/:id    – update complaint status

GET http://localhost:5000/api/agencies/                – list agencies

POST http://localhost:5000/api/agencies/               – create new agency



React Components We’ll Create:
swift
Copy
Edit
frontend/src/components/auth/
├── Register.js
├── Login.js
├── ForgotPassword.js
├── ResetPassword.js