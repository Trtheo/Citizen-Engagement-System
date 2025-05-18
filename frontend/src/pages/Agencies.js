import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/section.css';

function Agencies() {
const [agencies, setAgencies] = useState([]);
const [newAgency, setNewAgency] = useState('');

const fetchAgencies = async () => {
try {
const res = await axios.get('http://localhost:5000/api/agencies');
setAgencies(res.data);
} catch {
toast.error('Failed to fetch agencies');
}
};

const handleAddAgency = async () => {
if (!newAgency.trim()) return;
try {
await axios.post('http://localhost:5000/api/agencies', { name: newAgency });
toast.success('Agency added');
setNewAgency('');
fetchAgencies();
} catch {
toast.error('Failed to add agency');
}
};

useEffect(() => {
fetchAgencies();
}, []);

return (
<div className="section-container">
<h2>Manage Agencies</h2>
<div className="add-agency">
<input
type="text"
placeholder="New agency name"
value={newAgency}
onChange={(e) => setNewAgency(e.target.value)}
/>
<button onClick={handleAddAgency}>Add</button>
</div>
<ul className="agency-list">
{agencies.map((a) => (
<li key={a.id}>{a.name}</li>
))}
</ul>
</div>
);
}

export default Agencies;