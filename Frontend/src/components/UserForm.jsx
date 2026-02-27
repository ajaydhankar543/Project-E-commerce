import { useState, useEffect } from 'react';

export default function UserForm() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    age: '',
    address: '',
  });

  // Fetch all users
  const fetchUsers = async () => {
    const res = await fetch('http://localhost:5000/api/users');
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ name: '', email: '', age: '', address: '' }); // reset form
    fetchUsers(); // refresh list
  };

  // Delete user
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/users/${id}`, {
      method: 'DELETE',
    });
    fetchUsers();
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'Arial' }}>
      <h2>User Registration Form</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required />
        <input name="age" placeholder="Age" type="number" value={form.age} onChange={handleChange} required />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
        <button type="submit">Save User</button>
      </form>

      <h3>All Users</h3>
      {users.map(user => (
        <div key={user._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Age:</b> {user.age}</p>
          <p><b>Address:</b> {user.address}</p>
          <button onClick={() => handleDelete(user._id)} style={{ color: 'red' }}>Delete</button>
        </div>
      ))}
    </div>
  );
}