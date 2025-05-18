import React from 'react';

function ComplaintsTable() {
  return (
    <div className="table-container">
      <table className="complaints-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Category</th>
            <th>Status</th>
            <th>Agency</th>
          </tr>
        </thead>
        <tbody>
          {/* You can fetch and map complaints here */}
          <tr>
            <td>Jane Doe</td>
            <td>jane@example.com</td>
            <td>Water</td>
            <td>Pending</td>
            <td>Agency A</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ComplaintsTable;
