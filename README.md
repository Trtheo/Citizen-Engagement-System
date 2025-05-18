 ## Test All Endpoints (Optional with Postman)
 ## Backend Testing the endpints APIs
POST http://localhost:5000/api/complaints/submit       – submit complaint

GET http://localhost:5000/api/complaints/              – list all complaints (admin)

GET http://localhost:5000/api/complaints/user/:email   – get citizen-specific

PUT http://localhost:5000/api/complaints/status/:id    – update complaint status

GET http://localhost:5000/api/agencies/                – list agencies

POST http://localhost:5000/api/agencies/               – create new agency


<!-- DESCRIPTION OF ROLES -->
🧍‍♂️ Citizen
Purpose: Raise complaints or service requests to the government.

Key Capabilities:

Submit complaints with category, message, and optional agency selection.

View personal complaint history with status tracking.

Receive updates/responses from agency/admin.

Edit profile (name, photo, password).

rate or give feedback on resolution

🏢 Agency
Purpose: Respond to and manage assigned complaints from citizens.

Key Capabilities:

View complaints assigned to them.

Update complaint status (e.g. "In Progress", "Resolved").

Add responses or feedback to complaints.

View statistics of handled complaints.

Communicate back to admin or citizen

Edit profile (name, photo, password).

👑 Admin (Superuser)
Purpose: Manage users (citizens and agencies), oversee complaints, assign work, and analyze performance.

Key Capabilities:

Full access to all complaints.

Assign/unassign agencies to complaints.

Update status or feedback on any complaint.

Manage user accounts (create/edit/delete agency or citizen).

View analytics (total complaints, resolution rate, activity) IN CARDS.

Contact agency or citizen if needed.

Change personal profile settings (name, image, password).

Add/disable categories or system settings.



