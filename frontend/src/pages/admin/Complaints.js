import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../../styles/complaints.css';

function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [complaintsRes, agenciesRes] = await Promise.all([
          axios.get('http://localhost:5000/api/complaints', { headers }),
          axios.get('http://localhost:5000/api/agencies', { headers }),
        ]);
        setComplaints(complaintsRes.data);
        setAgencies(agenciesRes.data);
      } catch (error) {
        toast.error('Failed to load data');
      }
    };
    fetchData();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/complaints/status/${id}`,
        { status },
        { headers }
      );
      toast.success('Status updated');
      setComplaints((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status } : c))
      );
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleAgencyAssign = async (id, agency_id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/complaints/agency/${id}`,
        { agency_id },
        { headers }
      );
      toast.success('Agency assigned');
      setComplaints((prev) =>
        prev.map((c) => (c.id === id ? { ...c, agency_id } : c))
      );
    } catch {
      toast.error('Failed to assign agency');
    }
  };

  const filteredComplaints = complaints.filter(
    (c) =>
      c.citizen_name.toLowerCase().includes(search.toLowerCase()) ||
      c.message.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedComplaints = filteredComplaints.slice(
    (page - 1) * pageSize,
    page * pageSize
  );
  const pageCount = Math.ceil(filteredComplaints.length / pageSize);

  return (
    <div className="complaints-container">
      <h2>All Complaints</h2>
      <input
        className="search-input"
        type="text"
        placeholder="Search by name, email, or message"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); // reset page on search
        }}
      />

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Category</th>
              <th>Message</th>
              <th>Status</th>
              <th>Agency</th>
              <th>Assigned</th>
            </tr>
          </thead>
          <tbody>
            {paginatedComplaints.map((c) => (
              <tr key={c.id}>
                <td>{c.citizen_name}</td>
                <td>{c.email}</td>
                <td>{c.category}</td>
                <td>{c.message}</td>
                <td>
                  <select
                    value={c.status}
                    onChange={(e) => handleStatusUpdate(c.id, e.target.value)}
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                  </select>
                </td>
                <td>
                  <select
                    value={c.agency_id || ''}
                    onChange={(e) => handleAgencyAssign(c.id, e.target.value)}
                  >
                    <option value="">Assign...</option>
                    {agencies.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>{c.agency_name || 'Unassigned'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        {Array.from({ length: pageCount }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Complaints;
